import { useEffect, useRef, useState } from 'react';
import type { SekolahData } from './types';
import { sekolahKosong } from './types';
import { api } from './api';
import type { DaftarSekolahItem } from './api';
import { SectionIdentitas } from './sections/Identitas';
import { SectionGuru } from './sections/Guru';
import { SectionRombel, SectionAgama, SectionSarana } from './sections/RombelAgamaSarana';
import { SectionKegiatanKeagamaan, SectionKegiatanEkstra } from './sections/Kegiatan';
import { SectionKompetensi } from './sections/Kompetensi';
import { SectionPengesahan } from './sections/Pengesahan';
import { Rekap } from './Rekap';
import { PrimaryButton, GhostButton, Field, TextInput, Modal } from './components/ui';

// Kode untuk membuka Mode Admin (fitur Tambah Sekolah). Ganti kode ini
// sebelum membagikan tautan aplikasi ke guru PAI.
const KODE_ADMIN = 'pengawaspai2026';

type Layar = { jenis: 'daftar' } | { jenis: 'rekap' } | { jenis: 'formulir'; id: number };

export default function App() {
  const [layar, setLayar] = useState<Layar>({ jenis: 'daftar' });
  const [daftar, setDaftar] = useState<DaftarSekolahItem[] | null>(null);
  const [errorDaftar, setErrorDaftar] = useState<string | null>(null);
  const [namaBaru, setNamaBaru] = useState('');
  const [membuat, setMembuat] = useState(false);
  const [errorTambah, setErrorTambah] = useState('');
  const [modeAdmin, setModeAdmin] = useState(false);
  const [tampilLoginAdmin, setTampilLoginAdmin] = useState(false);
  const [kodeInput, setKodeInput] = useState('');
  const [errorAdmin, setErrorAdmin] = useState('');

  async function muatDaftar() {
    try {
      const hasil = await api.daftarSekolah();
      setDaftar(hasil);
      setErrorDaftar(null);
    } catch (e) {
      setErrorDaftar(e instanceof Error ? e.message : 'Gagal memuat daftar sekolah');
    }
  }

  useEffect(() => {
    muatDaftar();
  }, []);

  function bukaLoginAdmin() {
    setKodeInput('');
    setErrorAdmin('');
    setTampilLoginAdmin(true);
  }

  function submitLoginAdmin() {
    if (kodeInput === KODE_ADMIN) {
      setModeAdmin(true);
      setTampilLoginAdmin(false);
    } else {
      setErrorAdmin('Kode admin salah. Coba lagi.');
    }
  }

  async function buatSekolahBaru() {
    if (!namaBaru.trim() || membuat) return;
    setMembuat(true);
    setErrorTambah('');
    try {
      const { id } = await api.buatSekolah(sekolahKosong(namaBaru.trim()));
      setNamaBaru('');
      await muatDaftar();
      setLayar({ jenis: 'formulir', id });
    } catch (e) {
      setErrorTambah(e instanceof Error ? e.message : 'Gagal membuat sekolah baru');
    } finally {
      setMembuat(false);
    }
  }

  if (layar.jenis === 'rekap') {
    return <Rekap daftar={daftar ?? []} onKembali={() => setLayar({ jenis: 'daftar' })} />;
  }

  if (layar.jenis === 'formulir') {
    return (
      <FormulirSekolah
        id={layar.id}
        onKembali={() => {
          setLayar({ jenis: 'daftar' });
          muatDaftar();
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold-dark)]">
          Kabupaten Tanah Laut · Kalimantan Selatan
        </p>
        <h1 className="mt-2 font-display text-3xl text-[var(--primary)] sm:text-4xl">
          Pemetaan Pendidikan Agama Islam
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--ink-soft)]">
          Pilih sekolah untuk mengisi atau melengkapi data. Setiap guru PAI pastikan untuk mengisi
          datanya sendiri sesuai sekolahnya masing-masing.
        </p>
      </header>

      <div className="mb-6 flex flex-col items-center gap-2">
        <GhostButton onClick={() => setLayar({ jenis: 'rekap' })}>Lihat Rekap Semua Sekolah</GhostButton>
        {modeAdmin ? (
          <span className="text-xs text-[var(--primary)]">Mode Admin aktif</span>
        ) : (
          <button
            type="button"
            onClick={bukaLoginAdmin}
            className="text-xs text-[var(--ink-soft)] underline decoration-dotted"
          >
            Masuk sebagai Admin
          </button>
        )}
      </div>

      {errorDaftar && (
        <p className="mb-4 rounded-md border border-[var(--danger)] bg-[var(--danger-tint)] p-3 text-sm text-[var(--danger)]">
          {errorDaftar}
        </p>
      )}

      {!daftar ? (
        <p className="text-center text-sm text-[var(--ink-soft)]">Memuat daftar sekolah…</p>
      ) : (
        <div className="paper-card divide-y divide-[var(--rule)] rounded-lg">
          {daftar.map((s) => (
            <button
              key={s.id}
              onClick={() => setLayar({ jenis: 'formulir', id: s.id })}
              className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-[var(--primary-tint)]"
            >
              <div>
                <div className="font-medium">{s.namaSekolah}</div>
                <div className="text-xs text-[var(--ink-soft)]">
                  {s.kecamatan || '—'} · {s.status} · {s.jumlahGuru} guru tercatat
                </div>
              </div>
              <span className="font-display text-[var(--gold-dark)]">→</span>
            </button>
          ))}
        </div>
      )}

      {modeAdmin && (
        <div className="paper-card mt-6 rounded-lg p-4">
          <Field label="Tambah Sekolah (khusus Admin/Pengawas PAI)">
            <div className="flex gap-2">
              <TextInput
                value={namaBaru}
                onChange={(e) => setNamaBaru(e.target.value)}
                placeholder="Nama sekolah"
                onKeyDown={(e) => e.key === 'Enter' && buatSekolahBaru()}
              />
              <PrimaryButton onClick={buatSekolahBaru} disabled={membuat || !namaBaru.trim()}>
                Tambah
              </PrimaryButton>
            </div>
          </Field>
          {errorTambah && <p className="mt-2 text-xs text-[var(--danger)]">{errorTambah}</p>}
        </div>
      )}

      {tampilLoginAdmin && (
        <Modal title="Masuk sebagai Admin" onClose={() => setTampilLoginAdmin(false)}>
          <Field label="Kode Admin">
            <TextInput
              type="password"
              value={kodeInput}
              onChange={(e) => setKodeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitLoginAdmin()}
              autoFocus
            />
          </Field>
          {errorAdmin && <p className="mt-2 text-xs text-[var(--danger)]">{errorAdmin}</p>}
          <div className="mt-4 flex justify-end gap-2">
            <GhostButton onClick={() => setTampilLoginAdmin(false)}>Batal</GhostButton>
            <PrimaryButton onClick={submitLoginAdmin}>Masuk</PrimaryButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

function FormulirSekolah(props: { id: number; onKembali: () => void }) {
  const [data, setData] = useState<SekolahData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'menyimpan' | 'tersimpan' | 'gagal'>('idle');
  const [tampilHapus, setTampilHapus] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dataRef = useRef<SekolahData | null>(null);

  useEffect(() => {
    let batal = false;
    api
      .ambilSekolah(props.id)
      .then((d) => {
        if (!batal) {
          setData(d);
          dataRef.current = d;
        }
      })
      .catch((e) => !batal && setError(e instanceof Error ? e.message : 'Gagal memuat data sekolah'));
    return () => {
      batal = true;
    };
  }, [props.id]);

  function set(patch: Partial<SekolahData>) {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      dataRef.current = next;
      simpanDebounced();
      return next;
    });
  }

  function simpanDebounced() {
    if (timer.current) clearTimeout(timer.current);
    setStatus('menyimpan');
    timer.current = setTimeout(async () => {
      const d = dataRef.current;
      if (!d) return;
      try {
        await api.simpanSekolah(props.id, d);
        setStatus('tersimpan');
      } catch {
        setStatus('gagal');
      }
    }, 800);
  }

  async function hapus() {
    if (!data) return;
    setTampilHapus(false);
    await api.hapusSekolah(props.id);
    props.onKembali();
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="mb-4 text-[var(--danger)]">{error}</p>
        <GhostButton onClick={props.onKembali}>← Kembali ke daftar sekolah</GhostButton>
      </div>
    );
  }

  if (!data) {
    return <p className="p-10 text-center text-sm text-[var(--ink-soft)]">Memuat formulir…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={props.onKembali}
          className="rounded-md border border-[var(--rule)] px-3 py-1.5 text-sm text-[var(--ink-soft)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          ← Daftar Sekolah
        </button>
        <StatusSimpan status={status} />
      </div>

      <div className="space-y-6">
        <SectionIdentitas data={data} set={set} />
        <SectionGuru data={data} set={set} />
        <SectionRombel data={data} set={set} />
        <SectionAgama data={data} set={set} />
        <SectionSarana data={data} set={set} />
        <SectionKegiatanKeagamaan data={data} set={set} />
        <SectionKegiatanEkstra data={data} set={set} />
        <SectionKompetensi data={data} set={set} />
        <SectionPengesahan data={data} set={set} />
      </div>

      <div className="mt-8 flex justify-between">
        <GhostButton danger onClick={() => setTampilHapus(true)}>
          Hapus Data Sekolah Ini
        </GhostButton>
        <StatusSimpan status={status} />
      </div>

      {tampilHapus && (
        <Modal title="Hapus Data Sekolah" onClose={() => setTampilHapus(false)}>
          <p className="text-sm text-[var(--ink-soft)]">
            Yakin ingin menghapus data <span className="font-medium text-[var(--ink)]">{data.namaSekolah}</span>?
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <GhostButton onClick={() => setTampilHapus(false)}>Batal</GhostButton>
            <GhostButton danger onClick={hapus}>
              Ya, Hapus
            </GhostButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatusSimpan(props: { status: 'idle' | 'menyimpan' | 'tersimpan' | 'gagal' }) {
  const peta = {
    idle: { teks: '', warna: '' },
    menyimpan: { teks: 'Menyimpan…', warna: 'text-[var(--gold-dark)]' },
    tersimpan: { teks: '✓ Tersimpan', warna: 'text-[var(--primary)]' },
    gagal: { teks: '⚠ Gagal menyimpan, periksa koneksi', warna: 'text-[var(--danger)]' },
  } as const;
  const s = peta[props.status];
  if (!s.teks) return <span />;
  return <span className={`font-mono text-xs ${s.warna}`}>{s.teks}</span>;
}
