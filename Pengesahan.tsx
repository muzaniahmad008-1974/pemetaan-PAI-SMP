import type { SekolahData } from '../types';
import { HeaderCard, Field, TextInput } from '../components/ui';

export function SectionPengesahan(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  return (
    <HeaderCard judul="Lembar Pengesahan">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tanggal Pengisian">
          <input
            type="date"
            className="field-line"
            value={data.tanggalPengisian}
            onChange={(e) => set({ tanggalPengisian: e.target.value })}
          />
        </Field>
        <Field label="Nama Kepala Sekolah">
          <TextInput value={data.kepalaSekolah} onChange={(e) => set({ kepalaSekolah: e.target.value })} />
        </Field>
        <Field label="NIP Kepala Sekolah" className="sm:col-span-2">
          <TextInput
            value={data.nipKepalaSekolah}
            onChange={(e) => set({ nipKepalaSekolah: e.target.value })}
            placeholder="Kosongkan bila non-PNS"
          />
        </Field>
      </div>
      <p className="mt-4 text-sm text-[var(--ink-soft)]">
        {data.kecamatan || '…………………'}, {data.tanggalPengisian}
        <br />
        Kepala Sekolah,
        <br />
        <br />
        <br />
        <span className="font-medium text-[var(--ink)] underline">
          {data.kepalaSekolah || '……………………………'}
        </span>
        <br />
        NIP. {data.nipKepalaSekolah || '……………………………'}
      </p>
    </HeaderCard>
  );
}
