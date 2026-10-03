# Prompt: Replikasi Design System ke Project Baru

Paste seluruh blok di bawah ini (antara `=== PROMPT MULAI ===` dan
`=== PROMPT SELESAI ===`) ke Claude Code atau Codex yang sedang berjalan
di **root folder project baru kamu**. Ganti nilai di dalam `<...>` sebelum
mengirim.

---

=== PROMPT MULAI ===

Saya ingin kamu mereplikasi desain UI/UX (layout, komponen, styling,
font, animasi) dari sebuah project Astro lain ke project saya saat ini,
**persis sama secara struktur dan visual**, tanpa ada bagian atau aset
yang hilang. Konten teks/brand boleh tetap seperti aslinya dulu (saya akan
minta kamu ganti belakangan) — fokus sekarang adalah memindahkan desainnya
utuh dan project bisa jalan (`npm run dev`) tanpa error.

## Sumber

Repo ini public, cukup clone biasa ke folder sementara:

```bash
git clone https://github.com/rayagads03-ads/dvn-collagen-design-system.git /tmp/design-source
```

Semua instruksi di bawah mengasumsikan sumbernya ada di
`/tmp/design-source/`. Baca dulu `README.md` di root repo itu — berisi
manifest lengkap isinya dan daftar bagian yang WAJIB diadaptasi (tracking
Google Ads, Zaraz consent, atribusi WA, klaim BPOM/Halal, domain
hardcoded). JANGAN skip bagian itu.

## Yang harus kamu lakukan, urut

1. **Baca `/tmp/design-source/README.md` lebih dulu**
   sebelum menyalin apapun. Pahami struktur dan daftar "WAJIB diadaptasi".

2. **Cek stack project saya saat ini** — apakah sudah ada Astro ter-install,
   package.json apa isinya, apakah ada konflik nama file/komponen. Laporkan
   ke saya kalau ada konflik sebelum menimpa apapun.

3. **Salin struktur berikut ke project saya** (sesuaikan path tujuan ke
   konvensi project saya kalau beda, tapi jangan ubah isi filenya dulu):
   - `src/layouts/BaseLayout.astro` → `src/layouts/`
   - Semua file di `src/components/*.astro` → `src/components/`
   - `src/lib/is-bot.ts` → `src/lib/`
   - `src/pages/dvn/collagen/dvncollagen/index.astro` → simpan sebagai
     referensi di `src/pages/_reference-landing-page.astro` (JANGAN jadi
     route aktif dulu — ini cuma contoh cara komponen-komponen di atas
     dikomposisi bersama)
   - Semua isi `public/fonts/` → `public/fonts/`
   - Semua isi `public/images/dvn/` → `public/images/dvn/`
   - `public/images/og-dvn-collagen-2026-09.jpg` → `public/images/`
   - Semua isi `public/videos/cod-testimoni/` → `public/videos/cod-testimoni/`

4. **Install dependency yang sama** (lihat `config/package.json` untuk versi
   persis): `astro@^5.0.0`, `@astrojs/cloudflare@^12.0.0`,
   `@astrojs/sitemap@^3.7.2`, dev: `terser@^5.36.0`. Kalau project saya
   sudah punya versi Astro lain, JANGAN downgrade paksa — beri tahu saya
   dulu kalau ada incompatibility.

5. **Bandingkan `config/astro.config.mjs`** dengan `astro.config.mjs` milik
   saya. Jangan di-overwrite mentah-mentah — merge setting yang relevan:
   `output: 'static'`, `build.inlineStylesheets: 'always'`,
   `compressHTML: true`, `vite.build.minify: 'terser'`. Adapter Cloudflare
   hanya di-pasang kalau project saya memang deploy ke Cloudflare Pages —
   tanya saya dulu kalau tidak jelas.

6. **Jalankan `npm run dev` (atau setara)** dan laporkan semua error.
   Error yang paling mungkin: path import komponen yang beda konvensi,
   atau komponen yang saling bergantung satu sama lain (cek dulu apakah
   `DVNReferenceLandingPage.astro` mengimpor komponen lain di dalam folder
   ini — kalau iya, pastikan ikut tersalin).

7. **Lakukan checklist "WAJIB diadaptasi" dari README** satu per satu,
   dan untuk SETIAP item, tanyakan ke saya dulu apa nilai penggantinya
   SEBELUM kamu ubah kode — jangan menebak Conversion ID, nomor WA, atau
   domain. Khusus soal klaim BPOM/Halal/regulasi: jangan hapus atau ubah
   sendiri, cukup tandai dengan komentar `<!-- TODO: cek compliance -->` dan
   laporkan ke saya daftar lokasinya.

8. **Jangan commit dulu.** Setelah semua jalan di `npm run dev` dan
   checklist adaptasi sudah saya isi, tunjukkan ringkasan: file apa yang
   disalin, apa yang diubah, dan apa yang masih perlu saya putuskan.

## Yang TIDAK perlu kamu lakukan

- Jangan menyalin halaman konten (about/privacy/terms/kontak/dll) dari
  sumber — itu di luar scope `design-system-export`, tidak ada di sana.
- Jangan asumsikan ada Tailwind — sumbernya pakai vanilla CSS scoped Astro.
- Jangan push ke remote manapun tanpa saya minta.

=== PROMPT SELESAI ===
