import type { Env, BarisSekolah } from '../../types';
import { json, errJson } from '../../types';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { results } = await context.env.DB.prepare(
    `SELECT id, nama_sekolah, kecamatan, status, jumlah_guru, updated_at
     FROM schools ORDER BY nama_sekolah ASC`,
  ).all<BarisSekolah>();

  const ringkas = (results ?? []).map((r) => ({
    id: r.id,
    namaSekolah: r.nama_sekolah,
    kecamatan: r.kecamatan,
    status: r.status,
    jumlahGuru: r.jumlah_guru,
    updatedAt: r.updated_at,
  }));
  return json(ringkas);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
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
    `INSERT INTO schools (nama_sekolah, kecamatan, status, jumlah_guru, data, created_at, updated_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)`,
  )
    .bind(namaSekolah, kecamatan, status, guru.length, JSON.stringify(body), now)
    .run();

  const id = hasil.meta.last_row_id;
  return json({ id }, 201);
};
