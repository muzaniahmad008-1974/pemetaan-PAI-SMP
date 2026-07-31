// Model data mengikuti struktur
// "INSTRUMEN PEMETAAN PENDIDIKAN AGAMA ISLAM PADA SEKOLAH" (jenjang SMP).
// Satu record = satu sekolah; guru PAI/BTA mengisi datanya sendiri sebagai
// baris di dalam bagian II pada record sekolah tempat ia bertugas.

export type StatusSekolah = 'Negeri' | 'Swasta';
export type Akreditasi = 'A' | 'B' | 'C' | 'Belum terakreditasi';
export type StatusKepegawaian = 'PNS' | 'P3K' | 'Honorer';
export type InstansiPengangkat = 'Kemenag' | 'Bupati' | 'Sekolah' | 'Yayasan';
export type StatusSertifikasi = 'Sudah' | 'Belum' | 'Dalam Proses';
export type TigaStatus = 'Ada' | 'Tidak ada';
export type StatusAktif = 'Aktif' | 'Tidak aktif' | 'Tidak ada';
export type Frekuensi = 'Setiap hari' | 'Kadang-kadang' | 'Tidak ada';

// ---------- II. Data Guru PAI & Guru BTA ----------
export interface GuruPAI {
  id: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  statusKepegawaian: StatusKepegawaian;
  instansiPengangkat: InstansiPengangkat;
  sertifikasi: StatusSertifikasi;
  mapelPokok: string;
  jamPAI: number | '';
  jamBTA: number | '';
  tugasTambahan: string;
}

export function guruKosong(): GuruPAI {
  return {
    id: crypto.randomUUID(),
    nama: '',
    jenisKelamin: 'L',
    statusKepegawaian: 'PNS',
    instansiPengangkat: 'Kemenag',
    sertifikasi: 'Belum',
    mapelPokok: 'Pendidikan Agama Islam dan Budi Pekerti',
    jamPAI: '',
    jamBTA: '',
    tugasTambahan: '',
  };
}

// ---------- III. Data Rombongan Belajar & Siswa ----------
export interface RombelKelas {
  kelas: 'VII' | 'VIII' | 'IX';
  jumlahRombel: number | '';
  jumlahSiswa: number | '';
}

export function rombelDefault(): RombelKelas[] {
  return [
    { kelas: 'VII', jumlahRombel: '', jumlahSiswa: '' },
    { kelas: 'VIII', jumlahRombel: '', jumlahSiswa: '' },
    { kelas: 'IX', jumlahRombel: '', jumlahSiswa: '' },
  ];
}

// ---------- IV. Data Agama Siswa ----------
export interface AgamaSiswa {
  agama: 'Islam' | 'Protestan' | 'Katolik' | 'Hindu' | 'Budha' | 'Konghucu';
  lakiLaki: number | '';
  perempuan: number | '';
}

export function agamaDefault(): AgamaSiswa[] {
  return (['Islam', 'Protestan', 'Katolik', 'Hindu', 'Budha', 'Konghucu'] as const).map((agama) => ({
    agama,
    lakiLaki: '',
    perempuan: '',
  }));
}

// ---------- V. Sarana Tempat Ibadah ----------
export interface SaranaIbadah {
  adaMushalla: TigaStatus;
  statusKepemilikan: 'Sekolah' | 'Masyarakat';
  peralatanIbadah: 'Tersedia' | 'Tidak tersedia';
  bukuIqraQuran: 'Tersedia' | 'Tidak tersedia';
}

export function saranaDefault(): SaranaIbadah {
  return {
    adaMushalla: 'Tidak ada',
    statusKepemilikan: 'Sekolah',
    peralatanIbadah: 'Tidak tersedia',
    bukuIqraQuran: 'Tidak tersedia',
  };
}

// ---------- VI & VII. Kegiatan tambahan bebas ----------
export interface KegiatanKustom {
  id: string;
  nama: string;
  keterangan: string;
}

export function kegiatanKustomKosong(): KegiatanKustom {
  return { id: crypto.randomUUID(), nama: '', keterangan: '' };
}

// ---------- VI. Kegiatan Keagamaan ----------
export interface KegiatanKeagamaan {
  shalatBerjamaah: Frekuensi;
  pelaksanaanShalat: 'Semua kelas' | 'Bergiliran' | 'Tidak ada';
  tadarusQuran: 'Setiap hari' | 'Hari tertentu' | 'Tidak ada';
  phbi: 'Rutin' | 'Tidak rutin' | 'Tidak dilaksanakan';
  ceramahAgama: 'Rutin' | 'Tidak rutin' | 'Tidak dilaksanakan';
  lainnya: KegiatanKustom[];
}

export function kegiatanKeagamaanDefault(): KegiatanKeagamaan {
  return {
    shalatBerjamaah: 'Tidak ada',
    pelaksanaanShalat: 'Tidak ada',
    tadarusQuran: 'Tidak ada',
    phbi: 'Tidak dilaksanakan',
    ceramahAgama: 'Tidak dilaksanakan',
    lainnya: [],
  };
}

// ---------- VII. Kegiatan Ekstra Keagamaan ----------
export interface KegiatanEkstra {
  maulidHabsyi: StatusAktif;
  latihanPidato: StatusAktif;
  seniTilawah: StatusAktif;
  seniKaligrafi: StatusAktif;
  bimbinganKeagamaan: StatusAktif;
  tahsinQuran: StatusAktif;
  lainnya: KegiatanKustom[];
}

export function kegiatanEkstraDefault(): KegiatanEkstra {
  return {
    maulidHabsyi: 'Tidak ada',
    latihanPidato: 'Tidak ada',
    seniTilawah: 'Tidak ada',
    seniKaligrafi: 'Tidak ada',
    bimbinganKeagamaan: 'Tidak ada',
    tahsinQuran: 'Tidak ada',
    lainnya: [],
  };
}

// ---------- VIII. Kompetensi Keagamaan Siswa ----------
export interface KompetensiSiswa {
  bacaQuranBelumBisa: number | '';
  bacaQuranBelumLancar: number | '';
  bacaQuranLancar: number | '';
  wudhuBelumTerampil: number | '';
  wudhuSudahTerampil: number | '';
  shalatBelumTerampil: number | '';
  shalatSudahTerampil: number | '';
}

export function kompetensiDefault(): KompetensiSiswa {
  return {
    bacaQuranBelumBisa: '',
    bacaQuranBelumLancar: '',
    bacaQuranLancar: '',
    wudhuBelumTerampil: '',
    wudhuSudahTerampil: '',
    shalatBelumTerampil: '',
    shalatSudahTerampil: '',
  };
}

// ---------- Record sekolah lengkap ----------
export interface SekolahData {
  id?: number;
  namaSekolah: string;
  status: StatusSekolah;
  akreditasi: Akreditasi;
  alamat: string;
  noTelp: string;
  kecamatan: string;
  kabupaten: string;
  tahunPelajaran: string;
  kepalaSekolah: string;
  nipKepalaSekolah: string;
  tanggalPengisian: string;
  guru: GuruPAI[];
  rombel: RombelKelas[];
  agama: AgamaSiswa[];
  sarana: SaranaIbadah;
  kegiatanKeagamaan: KegiatanKeagamaan;
  kegiatanEkstra: KegiatanEkstra;
  kompetensi: KompetensiSiswa;
  updatedAt?: string;
}

export function sekolahKosong(namaSekolah = ''): SekolahData {
  const now = new Date();
  const tahun = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
  return {
    namaSekolah,
    status: namaSekolah.toUpperCase().includes('NEGERI') || /^SMPN/i.test(namaSekolah) ? 'Negeri' : 'Swasta',
    akreditasi: 'Belum terakreditasi',
    alamat: '',
    noTelp: '',
    kecamatan: '',
    kabupaten: 'Tanah Laut',
    tahunPelajaran: `${tahun}/${tahun + 1}`,
    kepalaSekolah: '',
    nipKepalaSekolah: '',
    tanggalPengisian: now.toISOString().slice(0, 10),
    guru: [guruKosong()],
    rombel: rombelDefault(),
    agama: agamaDefault(),
    sarana: saranaDefault(),
    kegiatanKeagamaan: kegiatanKeagamaanDefault(),
    kegiatanEkstra: kegiatanEkstraDefault(),
    kompetensi: kompetensiDefault(),
  };
}

// ---------- Daftar 10 sekolah binaan (pra-isi identitas + kecamatan) ----------
export const SEKOLAH_BINAAN: { nama: string; kecamatan: string; status: StatusSekolah }[] = [
  { nama: 'SMPN 1 Jorong', kecamatan: 'Jorong', status: 'Negeri' },
  { nama: 'SMPN 1 Kintap', kecamatan: 'Kintap', status: 'Negeri' },
  { nama: 'SMPN 3 Panyipatan', kecamatan: 'Panyipatan', status: 'Negeri' },
  { nama: 'SMPN 1 Tambang Ulang', kecamatan: 'Tambang Ulang', status: 'Negeri' },
  { nama: 'SMPN 4 Bajuin', kecamatan: 'Bajuin', status: 'Negeri' },
  { nama: 'SMPN 4 Pelaihari', kecamatan: 'Pelaihari', status: 'Negeri' },
  { nama: 'SMPN 5 Pelaihari', kecamatan: 'Pelaihari', status: 'Negeri' },
  { nama: 'SMPS IT Sirajul Huda', kecamatan: 'Pelaihari', status: 'Swasta' },
  { nama: 'SMPS Muhammadiyah', kecamatan: 'Pelaihari', status: 'Swasta' },
  { nama: 'SMP Tahfizh Bilingual Daarul Qur\u2019an Istiqomah', kecamatan: 'Pelaihari', status: 'Swasta' },
];
