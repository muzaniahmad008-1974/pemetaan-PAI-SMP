import type { SekolahData } from '../types';
import { SectionCard, Field, NumberInput, ChoiceGroup } from '../components/ui';

export function SectionRombel(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  const totalSiswa = data.rombel.reduce((a, r) => a + (Number(r.jumlahSiswa) || 0), 0);
  const totalRombel = data.rombel.reduce((a, r) => a + (Number(r.jumlahRombel) || 0), 0);

  function ubah(kelas: string, patch: Partial<(typeof data.rombel)[number]>) {
    set({ rombel: data.rombel.map((r) => (r.kelas === kelas ? { ...r, ...patch } : r)) });
  }

  return (
    <SectionCard
      angka="II"
      judul="Data Rombongan Belajar & Siswa"
      deskripsi={`Total: ${totalRombel} rombel, ${totalSiswa} siswa.`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-[var(--ink-soft)]">
              <th className="pb-2">Kelas</th>
              <th className="pb-2">Jumlah Rombel</th>
              <th className="pb-2">Jumlah Siswa</th>
            </tr>
          </thead>
          <tbody>
            {data.rombel.map((r) => (
              <tr key={r.kelas} className="border-t border-[var(--rule)]">
                <td className="py-2 pr-4 font-medium">{r.kelas}</td>
                <td className="py-2 pr-4">
                  <NumberInput
                    value={r.jumlahRombel}
                    onChange={(e) => ubah(r.kelas, { jumlahRombel: e.target.value === '' ? '' : Number(e.target.value) })}
                  />
                </td>
                <td className="py-2">
                  <NumberInput
                    value={r.jumlahSiswa}
                    onChange={(e) => ubah(r.kelas, { jumlahSiswa: e.target.value === '' ? '' : Number(e.target.value) })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

export function SectionAgama(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  const totalSiswa = data.agama.reduce((a, r) => a + (Number(r.lakiLaki) || 0) + (Number(r.perempuan) || 0), 0);

  function ubah(agama: string, patch: Partial<(typeof data.agama)[number]>) {
    set({ agama: data.agama.map((r) => (r.agama === agama ? { ...r, ...patch } : r)) });
  }

  return (
    <SectionCard angka="III" judul="Data Agama Siswa" deskripsi={`Total seluruh siswa: ${totalSiswa}.`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-[var(--ink-soft)]">
              <th className="pb-2">Agama</th>
              <th className="pb-2">Laki-laki</th>
              <th className="pb-2">Perempuan</th>
            </tr>
          </thead>
          <tbody>
            {data.agama.map((r) => (
              <tr key={r.agama} className="border-t border-[var(--rule)]">
                <td className="py-2 pr-4 font-medium">{r.agama}</td>
                <td className="py-2 pr-4">
                  <NumberInput
                    value={r.lakiLaki}
                    onChange={(e) => ubah(r.agama, { lakiLaki: e.target.value === '' ? '' : Number(e.target.value) })}
                  />
                </td>
                <td className="py-2">
                  <NumberInput
                    value={r.perempuan}
                    onChange={(e) => ubah(r.agama, { perempuan: e.target.value === '' ? '' : Number(e.target.value) })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

export function SectionSarana(props: { data: SekolahData; set: (patch: Partial<SekolahData>) => void }) {
  const { data, set } = props;
  const sarana = data.sarana;
  function ubah(patch: Partial<typeof sarana>) {
    set({ sarana: { ...sarana, ...patch } });
  }
  return (
    <SectionCard angka="IV" judul="Sarana Tempat Ibadah">
      <div className="grid gap-5 sm:grid-cols-2">
        <ChoiceGroup
          label="Mushalla / Mesjid"
          options={['Ada', 'Tidak ada'] as const}
          value={sarana.adaMushalla}
          onChange={(v) => ubah({ adaMushalla: v })}
        />
        <ChoiceGroup
          label="Status Kepemilikan"
          options={['Sekolah', 'Masyarakat'] as const}
          value={sarana.statusKepemilikan}
          onChange={(v) => ubah({ statusKepemilikan: v })}
        />
        <ChoiceGroup
          label="Peralatan Ibadah"
          options={['Tersedia', 'Tidak tersedia'] as const}
          value={sarana.peralatanIbadah}
          onChange={(v) => ubah({ peralatanIbadah: v })}
        />
        <ChoiceGroup
          label="Buku Iqra/Al-Qur'an"
          options={['Tersedia', 'Tidak tersedia'] as const}
          value={sarana.bukuIqraQuran}
          onChange={(v) => ubah({ bukuIqraQuran: v })}
        />
      </div>
    </SectionCard>
  );
}
