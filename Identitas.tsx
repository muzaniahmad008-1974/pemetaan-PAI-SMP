import type { SekolahData } from '../types';
import { HeaderCard, Field, TextInput, ChoiceGroup } from '../components/ui';

export function SectionIdentitas(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  return (
    <HeaderCard judul="Instrumen Pemetaan Pendidikan Agama Islam" deskripsi={`Tahun Pelajaran ${data.tahunPelajaran}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nama Sekolah" className="sm:col-span-2">
          <TextInput value={data.namaSekolah} onChange={(e) => set({ namaSekolah: e.target.value })} />
        </Field>
        <ChoiceGroup
          label="Status"
          options={['Negeri', 'Swasta'] as const}
          value={data.status}
          onChange={(v) => set({ status: v })}
        />
        <ChoiceGroup
          label="Akreditasi"
          options={['A', 'B', 'C', 'Belum terakreditasi'] as const}
          value={data.akreditasi}
          onChange={(v) => set({ akreditasi: v })}
        />
        <Field label="Alamat" className="sm:col-span-2">
          <TextInput value={data.alamat} onChange={(e) => set({ alamat: e.target.value })} />
        </Field>
        <Field label="No. Telp/HP">
          <TextInput value={data.noTelp} onChange={(e) => set({ noTelp: e.target.value })} />
        </Field>
        <Field label="Kecamatan">
          <TextInput value={data.kecamatan} onChange={(e) => set({ kecamatan: e.target.value })} />
        </Field>
        <Field label="Kabupaten">
          <TextInput value={data.kabupaten} onChange={(e) => set({ kabupaten: e.target.value })} />
        </Field>
        <Field label="Tahun Pelajaran">
          <TextInput value={data.tahunPelajaran} onChange={(e) => set({ tahunPelajaran: e.target.value })} />
        </Field>
      </div>
    </HeaderCard>
  );
}
