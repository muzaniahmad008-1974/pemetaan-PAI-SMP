import type { SekolahData } from '../types';
import { guruKosong } from '../types';
import { SectionCard, Field, TextInput, NumberInput, ChoiceGroup, GhostButton, PrimaryButton } from '../components/ui';

export function SectionGuru(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  const laki = data.guru.filter((g) => g.jenisKelamin === 'L').length;
  const wanita = data.guru.filter((g) => g.jenisKelamin === 'P').length;

  function ubahGuru(id: string, patch: Partial<(typeof data.guru)[number]>) {
    set({ guru: data.guru.map((g) => (g.id === id ? { ...g, ...patch } : g)) });
  }
  function tambahGuru() {
    set({ guru: [...data.guru, guruKosong()] });
  }
  function hapusGuru(id: string) {
    set({ guru: data.guru.filter((g) => g.id !== id) });
  }

  return (
    <SectionCard
      angka="I"
      judul="Data Guru PAI & Guru BTA"
      deskripsi={`Total tercatat: ${data.guru.length} guru (Laki-laki: ${laki}, Wanita: ${wanita}). Setiap guru mengisi barisnya sendiri.`}
    >
      <div className="space-y-6">
        {data.guru.map((g, idx) => (
          <div key={g.id} className="rounded-md border border-[var(--rule)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--ink-soft)]">GURU {idx + 1}</span>
              {data.guru.length > 1 && (
                <GhostButton danger onClick={() => hapusGuru(g.id)}>
                  Hapus
                </GhostButton>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nama" className="sm:col-span-2">
                <TextInput value={g.nama} onChange={(e) => ubahGuru(g.id, { nama: e.target.value })} />
              </Field>
              <ChoiceGroup
                label="Jenis Kelamin"
                options={['L', 'P'] as const}
                value={g.jenisKelamin}
                onChange={(v) => ubahGuru(g.id, { jenisKelamin: v })}
              />
              <ChoiceGroup
                label="Status Kepegawaian"
                options={['PNS', 'P3K', 'Honorer'] as const}
                value={g.statusKepegawaian}
                onChange={(v) => ubahGuru(g.id, { statusKepegawaian: v })}
              />
              <ChoiceGroup
                label="Instansi yang Mengangkat"
                options={['Kemenag', 'Bupati', 'Sekolah', 'Yayasan'] as const}
                value={g.instansiPengangkat}
                onChange={(v) => ubahGuru(g.id, { instansiPengangkat: v })}
              />
              <ChoiceGroup
                label="Sertifikasi"
                options={['Sudah', 'Belum', 'Dalam Proses'] as const}
                value={g.sertifikasi}
                onChange={(v) => ubahGuru(g.id, { sertifikasi: v })}
              />
              <Field label="Mata Pelajaran Pokok" className="sm:col-span-2">
                <TextInput value={g.mapelPokok} onChange={(e) => ubahGuru(g.id, { mapelPokok: e.target.value })} />
              </Field>
              <Field label="Jam Tatap Muka — PAI (JP)">
                <NumberInput
                  value={g.jamPAI}
                  onChange={(e) => ubahGuru(g.id, { jamPAI: e.target.value === '' ? '' : Number(e.target.value) })}
                />
              </Field>
              <Field label="Jam Tatap Muka — BTA (JP)">
                <NumberInput
                  value={g.jamBTA}
                  onChange={(e) => ubahGuru(g.id, { jamBTA: e.target.value === '' ? '' : Number(e.target.value) })}
                />
              </Field>
              <Field label="Tugas Tambahan" className="sm:col-span-2">
                <TextInput
                  placeholder="mis. Wali kelas, Pembina ekstrakurikuler"
                  value={g.tugasTambahan}
                  onChange={(e) => ubahGuru(g.id, { tugasTambahan: e.target.value })}
                />
              </Field>
            </div>
          </div>
        ))}
        <PrimaryButton onClick={tambahGuru}>+ Tambah Guru</PrimaryButton>
      </div>
    </SectionCard>
  );
}
