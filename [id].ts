import type { Env, BarisSekolah } from '../../types';
import { json, errJson } from '../../types';

function ambilId(context: { params: Record<string, string | string[]> }): number | null {
  const raw = context.params.id;
  const id = Number(Array.isArray(raw) ? raw[0] : raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = ambilId(context);
  if (id === null) return errJson('ID sekolah tidak valid.');

  const row = await context.env.DB.prepare(
    `SELECT id, nama_sekolah, kecamatan, status, jumlah_guru, data, created_at, updated_at
     FROM schools WHERE id = ?1`,
  )
    .bind(id)
    .first<BarisSekolah>();

  if (!row) return errJson('Sekolah tidak ditemukan.', 404);

  const parsed = JSON.parse(row.data) as Record<string, unknown>;
  return json({ ...parsed, id: row.id, updatedAt: row.updated_at });
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const id = ambilId(context);
  if (id === null) return errJson('ID sekolah tidak valid.');

  let body: Record<string, unknown>;
  try {
    body = await context.request.json();
  } catch {
    return errJson('Data yang dikirim bukan JSON yang valid.');
  }

  const namaSekolah = String(body.namaSekolah ?? '').trim();
  if (!namaSekolah) return errJson('Nama sekolah wajib diisi.');

  const kecamatan = String(body.kecamatan ?? '');
  const status = String(body.status ?? 'Negeri');
  const guru = Array.isArray(body.guru) ? body.guru : [];
  const now = new Date().toISOString();

  const hasil = await context.env.DB.prepare(
    `UPDATE schools SET nama_sekolah = ?1, kecamatan = ?2, status = ?3, jumlah_guru = ?4,
     data = ?5, updated_at = ?6 WHERE id = ?7`,
  )
    .bind(namaSekolah, kecamatan, status, guru.length, JSON.stringify(body), now, id)
    .run();

  if (hasil.meta.changes === 0) return errJson('Sekolah tidak ditemukan.', 404);
  return json({ ok: true });
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const id = ambilId(context);
  if (id === null) return errJson('ID sekolah tidak valid.');

  const hasil = await context.env.DB.prepare(`DELETE FROM schools WHERE id = ?1`).bind(id).run();
  if (hasil.meta.changes === 0) return errJson('Sekolah tidak ditemukan.', 404);
  return json({ ok: true });
};
