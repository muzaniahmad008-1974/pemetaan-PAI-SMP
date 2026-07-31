-- Skema awal: satu baris per sekolah, data lengkap instrumen disimpan
-- sebagai JSON pada kolom `data`. Kolom lain didenormalisasi untuk
-- mempercepat daftar & pencarian tanpa mem-parsing JSON tiap kali.

CREATE TABLE IF NOT EXISTS schools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_sekolah TEXT NOT NULL,
  kecamatan TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Negeri',
  jumlah_guru INTEGER NOT NULL DEFAULT 0,
  data TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_schools_nama ON schools (nama_sekolah);
