import type { SekolahData } from '../types';
import { SectionCard, Field, NumberInput } from '../components/ui';

export function SectionKompetensi(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  const k = data.kompetensi;
  function ubah(patch: Partial<typeof k>) {
    set({ kompetensi: { ...k, ...patch } });
  }
  return (
    <SectionCard angka="VII" judul="Kompetensi Keagamaan Siswa" deskripsi="Isikan jumlah siswa pada tiap kategori.">
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 font-display text-sm text-[var(--primary)]">Kemampuan Membaca Al-Qur'an</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Belum bisa membaca">
              <NumberInput value={k.bacaQuranBelumBisa} onChange={(e) => ubah({ bacaQuranBelumBisa: e.target.value === '' ? '' : Number(e.target.value) })} />
            </Field>
            <Field label="Bisa, belum lancar">
              <NumberInput value={k.bacaQuranBelumLancar} onChange={(e) => ubah({ bacaQuranBelumLancar: e.target.value === '' ? '' : Number(e.target.value) })} />
            </Field>
            <Field label="Bisa dan lancar">
              <NumberInput value={k.bacaQuranLancar} onChange={(e) => ubah({ bacaQuranLancar: e.target.value === '' ? '' : Number(e.target.value) })} />
            </Field>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-display text-sm text-[var(--primary)]">Praktik Wudhu</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Belum terampil">
              <NumberInput value={k.wudhuBelumTerampil} onChange={(e) => ubah({ wudhuBelumTerampil: e.target.value === '' ? '' : Number(e.target.value) })} />
            </Field>
            <Field label="Sudah terampil">
              <NumberInput value={k.wudhuSudahTerampil} onChange={(e) => ubah({ wudhuSudahTerampil: e.target.value === '' ? '' : Number(e.target.value) })} />
            </Field>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-display text-sm text-[var(--primary)]">Praktik Shalat Fardhu</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Belum terampil">
              <NumberInput value={k.shalatBelumTerampil} onChange={(e) => ubah({ shalatBelumTerampil: e.target.value === '' ? '' : Number(e.target.value) })} />
            </Field>
            <Field label="Sudah terampil">
              <NumberInput value={k.shalatSudahTerampil} onChange={(e) => ubah({ shalatSudahTerampil: e.target.value === '' ? '' : Number(e.target.value) })} />
            </Field>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
