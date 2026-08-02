# Aplikasi Pemetaan Pendidikan Agama Islam — Kabupaten Tanah Laut

Aplikasi input data untuk **Instrumen Pemetaan Pendidikan Agama Islam pada Sekolah**.
Setiap guru PAI/BTA dapat membuka aplikasi ini, memilih sekolahnya, dan mengisi
datanya sendiri — tanpa perlu akun/login. Data tersimpan terpusat di database
Cloudflare (D1) sehingga Bapak bisa melihat rekap dari 10 sekolah binaan kapan saja.

10 sekolah binaan sudah otomatis tersedia begitu aplikasi selesai di-deploy:
SMPN 1 Jorong, SMPN 1 Kintap, SMPN 3 Panyipatan, SMPN 1 Tambang Ulang, SMPN 4 Bajuin,
SMPN 4 Pelaihari, SMPN 5 Pelaihari, SMPS IT Sirajul Huda, SMPS Muhammadiyah, dan
SMP Tahfizh Bilingual Daarul Qur'an Istiqomah. Sekolah lain bisa ditambahkan sendiri
dari layar utama aplikasi.

---

## Deploy Otomatis Setiap Push ke GitHub (GitHub Actions)

Folder `.github/workflows/deploy.yml` sudah disiapkan agar setiap kali Bapak
mengunggah perubahan ke branch `main` di GitHub, aplikasi otomatis di-build dan
di-deploy ke Cloudflare Pages — **tanpa bergantung pada fitur "Workers Builds"
bawaan Cloudflare** (fitur itu diketahui bermasalah pada sebagian akun).

Yang perlu disiapkan sekali saja di GitHub:

1. Buka repository Bapak di github.com → **Settings** → **Secrets and variables**
   → **Actions**.
2. Klik **New repository secret**, buat dua secret berikut:
   - Nama: `CLOUDFLARE_API_TOKEN` — isi dengan token API yang sudah Bapak buat
     sebelumnya (izin Cloudflare Pages: Edit, D1: Edit).
   - Nama: `CLOUDFLARE_ACCOUNT_ID` — isi dengan ID akun Cloudflare Bapak
     (terlihat di dashboard Cloudflare, atau di log build sebelumnya).
3. Setelah kedua secret tersimpan, commit/push apa saja ke branch `main` —
   proses deploy akan berjalan otomatis. Progresnya bisa dipantau di tab
   **Actions** pada repository GitHub Bapak.

Kalau ada notifikasi build gagal dari Cloudflare sendiri (bukan dari tab
Actions GitHub), itu berasal dari fitur "Workers Builds" lama yang bisa
diabaikan — deployment yang sesungguhnya kini dijalankan lewat GitHub Actions.
Bapak juga bisa mematikan fitur lama itu di Cloudflare Dashboard → proyek →
Settings → Builds, supaya tidak lagi mengirim notifikasi gagal.

---

## Yang Bapak Perlukan

1. Akun Cloudflare (gratis) — daftar di https://dash.cloudflare.com/sign-up bila belum punya.
2. Node.js terpasang di komputer (versi 18 ke atas). Cek dengan membuka Command
   Prompt/Terminal lalu ketik `node -v`. Bila belum ada, unduh di https://nodejs.org
   (pilih versi **LTS**).
3. Folder proyek ini (`pai-mapping-app`) yang sudah Bapak unduh dan ekstrak.

Tidak perlu keahlian pemrograman — cukup ikuti perintah di bawah ini persis seperti
tertulis, satu per satu, di **Command Prompt** (Windows) atau **Terminal** (Mac).

---

## Langkah 1 — Buka folder proyek di terminal

Ekstrak file zip yang Bapak unduh, lalu buka Command Prompt/Terminal dan masuk ke
folder tersebut, misalnya:

```
cd Downloads/pai-mapping-app
```

## Langkah 2 — Pasang dependensi

```
npm install
```

Tunggu sampai selesai (biasanya 1–2 menit).

## Langkah 3 — Masuk (login) ke akun Cloudflare

```
npx wrangler login
```

Perintah ini akan membuka jendela browser — klik **Allow** untuk mengizinkan
Wrangler (alat baris perintah Cloudflare) mengakses akun Bapak.

## Langkah 4 — Buat database D1

```
npx wrangler d1 create pemetaan_pai_db
```

Perintah ini akan menampilkan hasil seperti berikut:

```
[[d1_databases]]
binding = "DB"
database_name = "pemetaan_pai_db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Salin nilai `database_id` tersebut**, lalu buka file `wrangler.toml` di folder
proyek dengan Notepad/TextEdit, dan ganti tulisan `GANTI_DENGAN_ID_DATABASE_ANDA`
dengan `database_id` yang Bapak salin tadi. Simpan file.

## Langkah 5 — Terapkan skema & isi data 10 sekolah binaan ke database

```
npm run db:migrate:remote
```

Perintah ini akan menyiapkan struktur tabel **dan** langsung mengisi 10 sekolah
binaan secara otomatis. Ketik `y` bila diminta konfirmasi.

## Langkah 6 — Build dan deploy

```
npm run deploy
```

Wrangler akan bertanya beberapa hal saat pertama kali deploy:

- **"Create a new project?"** → jawab **y** (Yes)
- **Nama proyek** → tekan Enter saja untuk memakai nama default, atau ketik nama
  sendiri (huruf kecil, tanpa spasi), misalnya `pemetaan-pai-tanahlaut`
- **Production branch** → tekan Enter saja (biarkan default)

Setelah selesai, Wrangler akan menampilkan alamat aplikasi Bapak, contoh:

```
https://pemetaan-pai-tanahlaut.pages.dev
```

**Alamat inilah yang Bapak bagikan ke 46 guru PAI** — cukup dibuka lewat HP atau
laptop, tanpa perlu instal apa pun.

## Langkah 7 — Hubungkan database ke aplikasi yang sudah online

Database D1 baru benar-benar tersambung ke situs setelah dihubungkan lewat Dashboard:

1. Buka https://dash.cloudflare.com → **Workers & Pages** → klik nama proyek Bapak.
2. Buka tab **Settings** → **Functions** → bagian **D1 database bindings**.
3. Klik **Add binding**: Variable name = `DB`, D1 database = `pemetaan_pai_db`.
4. Klik **Save**.
5. Kembali ke tab **Deployments**, klik titik tiga (⋯) pada deployment paling atas,
   pilih **Retry deployment** agar binding baru berlaku.

Setelah itu, buka kembali alamat aplikasi Bapak — 10 sekolah binaan akan langsung
terlihat di halaman utama.

---

## Pembaruan di Kemudian Hari

Bila nanti Bapak ingin mengubah tampilan atau menambah fitur, setelah mengedit
kodenya, deploy ulang cukup dengan mengulang **Langkah 6** (`npm run deploy`) —
langkah 1–5 tidak perlu diulang.

## Mencoba di Komputer Sendiri Dulu (opsional, sebelum deploy)

Bila ingin melihat tampilannya dulu sebelum online, bisa dijalankan lokal:

```
npm run db:migrate:local
npm run pages:dev
```

Lalu buka `http://localhost:8788` di browser.

## Menghapus Data / Cadangan

Karena data disimpan di D1, Bapak bisa mengunduh cadangannya kapan saja:

```
npx wrangler d1 export pemetaan_pai_db --remote --output cadangan.sql
```

File `cadangan.sql` berisi seluruh data yang bisa disimpan sebagai arsip.

---

## Bila Ada Kendala

- **"wrangler: command not found"** → pastikan sudah menjalankan `npm install`
  di Langkah 2, lalu jalankan lagi dengan awalan `npx wrangler ...`
- **Sekolah binaan tidak muncul setelah deploy** → pastikan Langkah 7 (hubungkan
  D1 binding + Retry deployment) sudah dilakukan.
- **Perubahan data guru tidak tersimpan** → periksa koneksi internet; aplikasi
  menampilkan status "Menyimpan…" / "✓ Tersimpan" / "⚠ Gagal menyimpan" di pojok
  kanan atas setiap formulir sekolah.
