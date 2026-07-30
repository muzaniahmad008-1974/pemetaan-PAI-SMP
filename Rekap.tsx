import { useEffect, useState } from 'react';
import type { SekolahData } from './types';
import { api } from './api';
import type { DaftarSekolahItem } from './api';

interface Baris {
  sekolah: DaftarSekolahItem;
  data: SekolahData | null;
  error?: string;
}

export function Rekap(props: { daftar: DaftarSekolahItem[]; onKembali: () => void }) {
  const [baris, setBaris] = useState<Baris[]>(props.daftar.map((sekolah) => ({ sekolah, data: null })));
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    let batal = false;
    (async () => {
      const hasil = await Promise.all(
        props.daftar.map(async (sekolah) => {
          try {
            const data = await api.ambilSekolah(sekolah.id);
            return { sekolah, data };
          } catch (e) {
            return { sekolah, data: null, error: e instanceof Error ? e.message : 'Gagal memuat' };
          }
        }),
      );
      if (!batal) {
        setBaris(hasil);
        setMemuat(false);
      }
    })();
    return () => {
      batal = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valid = baris.filter((b) => b.data);
  const totalGuru = valid.reduce((a, b) => a + (b.data?.guru.length ?? 0), 0);
  const totalPNS = valid.reduce((a, b) => a + (b.data?.guru.filter((g) => g.statusKepegawaian === 'PNS').length ?? 0), 0);
  const totalP3K = valid.reduce((a, b) => a + (b.data?.guru.filter((g) => g.statusKepegawaian === 'P3K').length ?? 0), 0);
  const totalHonorer = valid.reduce((a, b) => a + (b.data?.guru.filter((g) => g.statusKepegawaian === 'Honorer').length ?? 0), 0);
  const totalBelumSertifikasi = valid.reduce(
    (a, b) => a + (b.data?.guru.filter((g) => g.sertifikasi !== 'Sudah').length ?? 0),
    0,
  );
  const totalSiswa = valid.reduce(
    (a, b) => a + (b.data?.rombel.reduce((x, r) => x + (Number(r.jumlahSiswa) || 0), 0) ?? 0),
    0,
  );
  const totalMushalla = valid.filter((b) => b.data?.sarana.adaMushalla === 'Ada').length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-[var(--primary)]">Rekap Antarsekolah</h1>
          <p className="text-sm text-[var(--ink-soft)]">Ringkasan pemetaan PAI seluruh sekolah binaan.</p>
        </div>
        <button
          onClick={props.onKembali}
          className="rounded-md border border-[var(--rule)] px-3 py-1.5 text-sm text-[var(--ink-soft)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          ← Kembali
        </button>
      </div>

      {memuat ? (
        <p className="text-sm text-[var(--ink-soft)]">Memuat data seluruh sekolah…</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Total Guru PAI/BTA', totalGuru],
              ['PNS / P3K / Honorer', `${totalPNS} / ${totalP3K} / ${totalHonorer}`],
              ['Belum Sertifikasi', totalBelumSertifikasi],
              ['Total Siswa', totalSiswa],
              ['Sekolah Ber-mushalla', `${totalMushalla} / ${valid.length}`],
            ].map(([label, val]) => (
              <div key={label as string} className="paper-card rounded-lg p-4">
                <div className="font-display text-2xl text-[var(--primary)]">{val}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-[var(--ink-soft)]">{label}</div>
              </div>
            ))}
          </div>

          <div className="paper-card overflow-x-auto rounded-lg">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-[var(--rule)] text-left text-xs uppercase tracking-wide text-[var(--ink-soft)]">
                  <th className="p-3">Sekolah</th>
                  <th className="p-3">Guru PAI/BTA</th>
                  <th className="p-3">Siswa</th>
                  <th className="p-3">Mushalla</th>
                  <th className="p-3">Terakhir Diperbarui</th>
                </tr>
              </thead>
              <tbody>
                {baris.map(({ sekolah, data, error }) => (
                  <tr key={sekolah.id} className="border-b border-[var(--rule)] last:border-0">
                    <td className="p-3 font-medium">{sekolah.namaSekolah}</td>
                    <td className="p-3">{data ? data.guru.length : error ? '—' : '…'}</td>
                    <td className="p-3">
                      {data ? data.rombel.reduce((x, r) => x + (Number(r.jumlahSiswa) || 0), 0) : '—'}
                    </td>
                    <td className="p-3">{data ? data.sarana.adaMushalla : '—'}</td>
                    <td className="p-3 text-[var(--ink-soft)]">
                      {sekolah.updatedAt ? new Date(sekolah.updatedAt).toLocaleString('id-ID') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
