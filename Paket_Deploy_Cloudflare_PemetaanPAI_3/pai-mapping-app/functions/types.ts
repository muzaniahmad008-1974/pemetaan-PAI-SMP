export interface Env {
  DB: D1Database;
}

export interface BarisSekolah {
  id: number;
  nama_sekolah: string;
  kecamatan: string;
  status: string;
  jumlah_guru: number;
  data: string;
  created_at: string;
  updated_at: string;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export function errJson(pesan: string, status = 400): Response {
  return json({ error: pesan }, status);
}
