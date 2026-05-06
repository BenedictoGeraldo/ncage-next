# NCAGE Frontend (Next.js)

Frontend untuk proyek pendaftaran **NCAGE**. Project ini memakai **Next.js App Router**, **TypeScript**, dan **Tailwind CSS**.

## Prasyarat

- **Node.js**: minimal **v18** (disarankan **v20 LTS** atau terbaru yang stabil)
- **npm**: mengikuti Node (project ini pakai `package-lock.json`)
- **Git**: untuk clone repository

Cek versi:

```bash
node -v
npm -v
git --version
```

## Cara menjalankan (lokal)

### 1) Clone & masuk folder

```bash
git clone <url-repo-kalian>
cd ncage-fe
```

### 2) Install dependency

Pakai:

```bash
npm install
```

### 4) Jalankan dev server

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Struktur project

Project ini menggunakan struktur “`src/`-based” (kode utama ada di `src/`).

### `src/app` (Next.js App Router)

Folder `src/app` adalah pusat routing dan layout (App Router).

- **`src/app/layout.tsx`**: _Root layout_ untuk seluruh halaman (biasanya tempat:
  - import global CSS (`globals.css`)
  - set `metadata`
  - wrapper `<html>` / `<body>` / provider global)
- **`src/app/page.tsx`**: halaman untuk route `/`
- **`src/app/globals.css`**: styling global (Tailwind v4 di-import lewat `@import "tailwindcss";`)
- **`src/app/favicon.ico`**: favicon

### Folder lain di `src/`

- **`src/components/`**: komponen UI reusable (disarankan per-feature atau per-domain jika sudah besar)
- **`src/hooks/`**: custom hooks React
- **`src/lib/`**: util/helper umum (formatting, constants, client setup, dsb.)
- **`src/services/`**: layer komunikasi ke API (fetcher, client, wrapper endpoint)
- **`src/stores/`**: state management (kalau nanti pakai Zustand/Redux/dll)
- **`src/types/`**: tipe TypeScript (DTO, interface domain, dsb.)
- **`src/features/`**: Features. berisi component khusus untuk halaman tertentu
