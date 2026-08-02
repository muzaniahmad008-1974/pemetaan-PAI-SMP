import type { SekolahData, KegiatanKustom } from '../types';
import { kegiatanKustomKosong } from '../types';
import { SectionCard, Field, TextInput, ChoiceGroup, GhostButton, PrimaryButton } from '../components/ui';

function DaftarKustom(props: {
  daftar: KegiatanKustom[];
  onUbah: (daftar: KegiatanKustom[]) => void;
}) {
  const { daftar, onUbah } = props;
  return (
    <div className="mt-5 border-t border-[var(--rule)] pt-4">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]">
        Kegiatan Lainnya
      </span>
      <div className="space-y-3">
        {daftar.map((k) => (
          <div key={k.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <Field label="Nama Kegiatan" className="flex-1">
              <TextInput
                value={k.nama}
                onChange={(e) => onUbah(daftar.map((x) => (x.id === k.id ? { ...x, nama: e.target.value } : x)))}
              />
            </Field>
            <Field label="Keterangan" className="flex-1">
              <TextInput
                value={k.keterangan}
                onChange={(e) =>
                  onUbah(daftar.map((x) => (x.id === k.id ? { ...x, keterangan: e.target.value } : x)))
                }
              />
            </Field>
            <GhostButton danger onClick={() => onUbah(daftar.filter((x) => x.id !== k.id))}>
              Hapus
            </GhostButton>
          </div>
        ))}
      </div>
      <GhostButton className="mt-3" onClick={() => onUbah([...daftar, kegiatanKustomKosong()])}>
        + Tambah Kegiatan Lain
      </GhostButton>
    </div>
  );
}

export function SectionKegiatanKeagamaan(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  const k = data.kegiatanKeagamaan;
  function ubah(patch: Partial<typeof k>) {
    set({ kegiatanKeagamaan: { ...k, ...patch } });
  }
  return (
    <SectionCard angka="V" judul="Kegiatan Keagamaan">
      <div className="grid gap-5 sm:grid-cols-2">
        <ChoiceGroup
          label="Shalat Berjamaah"
          options={['Setiap hari', 'Kadang-kadang', 'Tidak ada'] as const}
          value={k.shalatBerjamaah}
          onChange={(v) => ubah({ shalatBerjamaah: v })}
        />
        <ChoiceGroup
          label="Pelaksanaan Shalat"
          options={['Semua kelas', 'Bergiliran', 'Tidak ada'] as const}
          value={k.pelaksanaanShalat}
          onChange={(v) => ubah({ pelaksanaanShalat: v })}
        />
        <ChoiceGroup
          label="Tadarus Al-Qur'an"
          options={['Setiap hari', 'Hari tertentu', 'Tidak ada'] as const}
          value={k.tadarusQuran}
          onChange={(v) => ubah({ tadarusQuran: v })}
        />
        <ChoiceGroup
          label="Peringatan Hari Besar Islam (PHBI)"
          options={['Rutin', 'Tidak rutin', 'Tidak dilaksanakan'] as const}
          value={k.phbi}
          onChange={(v) => ubah({ phbi: v })}
        />
        <ChoiceGroup
          label="Ceramah Agama"
          options={['Rutin', 'Tidak rutin', 'Tidak dilaksanakan'] as const}
          value={k.ceramahAgama}
          onChange={(v) => ubah({ ceramahAgama: v })}
        />
      </div>
      <DaftarKustom daftar={k.lainnya} onUbah={(lainnya) => ubah({ lainnya })} />
    </SectionCard>
  );
}

export function SectionKegiatanEkstra(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  const k = data.kegiatanEkstra;
  function ubah(patch: Partial<typeof k>) {
    set({ kegiatanEkstra: { ...k, ...patch } });
  }
  const opsi = ['Aktif', 'Tidak aktif', 'Tidak ada'] as const;
  return (
    <SectionCard angka="VI" judul="Kegiatan Ekstra Keagamaan">
      <div className="grid gap-5 sm:grid-cols-2">
        <ChoiceGroup label="Maulid Habsyi" options={opsi} value={k.maulidHabsyi} onChange={(v) => ubah({ maulidHabsyi: v })} />
        <ChoiceGroup label="Latihan Pidato / Muhadharah" options={opsi} value={k.latihanPidato} onChange={(v) => ubah({ latihanPidato: v })} />
        <ChoiceGroup label="Bimbingan Seni Tilawah Qur'an" options={opsi} value={k.seniTilawah} onChange={(v) => ubah({ seniTilawah: v })} />
        <ChoiceGroup label="Bimbingan Seni Kaligrafi" options={opsi} value={k.seniKaligrafi} onChange={(v) => ubah({ seniKaligrafi: v })} />
        <ChoiceGroup label="Bimbingan Keagamaan" options={opsi} value={k.bimbinganKeagamaan} onChange={(v) => ubah({ bimbinganKeagamaan: v })} />
        <ChoiceGroup label="Bimbingan Dasar & Tahsin Qur'an" options={opsi} value={k.tahsinQuran} onChange={(v) => ubah({ tahsinQuran: v })} />
      </div>
      <DaftarKustom daftar={k.lainnya} onUbah={(lainnya) => ubah({ lainnya })} />
    </SectionCard>
  );
}
