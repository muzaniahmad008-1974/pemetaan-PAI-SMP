import type { SekolahData } from './types';

export interface DaftarSekolahItem {
  id: number;
  namaSekolah: string;
  kecamatan: string;
  status: string;
  jumlahGuru: number;
  updatedAt: string;
}

async function req<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { 'content-type': 'application/json', ...(options?.headers ?? {}) },
  });
  if (!res.ok) {
    let pesan = `Permintaan gagal (${res.status})`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) pesan = body.error;
    } catch {
      /* abaikan */
    }
    throw new Error(pesan);
  }
  return res.json() as Promise<T>;
}

export const api = {
  daftarSekolah: () => req<DaftarSekolahItem[]>('/api/schools'),
  buatSekolah: (data: SekolahData) =>
    req<{ id: number }>('/api/schools', { method: 'POST', body: JSON.stringify(data) }),
  ambilSekolah: (id: number) => req<SekolahData>(`/api/schools/${id}`),
  simpanSekolah: (id: number, data: SekolahData) =>
    req<{ ok: true }>(`/api/schools/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  hapusSekolah: (id: number) => req<{ ok: true }>(`/api/schools/${id}`, { method: 'DELETE' }),
};
