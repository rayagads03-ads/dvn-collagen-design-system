# DVN Collagen — Design System Export

Ekstraksi dari repo `diviniaskin-space` (branch `main`, per 2026-10-03).
Isi folder ini HANYA aset yang benar-benar di-*reference* oleh kode
(diverifikasi lewat `grep` ke seluruh `src/components`, `src/layouts`,
`src/pages`, `src/data`) — bukan seluruh isi `public/`.

Tujuan: jadi basis desain siap-pakai untuk website lain (struktur, komponen,
styling, font, animasi), yang nanti di-adaptasi (teks, warna brand, gambar
produk, link) oleh instance Claude Code/Codex lain di project baru.

## Manifest isi folder

```
design-system-export/
├── config/
│   ├── astro.config.mjs     # Astro 5 + adapter Cloudflare (output: static)
│   ├── package.json          # dependency + versi persis
│   ├── wrangler.jsonc         # config Cloudflare Pages/Workers
│   └── launch.json            # profil dev-server (untuk .claude/launch.json)
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML shell + SEO/OG meta + font loading
│   ├── components/
│   │   ├── DVNClaudeHero.astro            (446 baris)
│   │   ├── DVNReferenceLandingPage.astro  (1886 baris — komponen utama landing page)
│   │   ├── DVNAuthenticitySection.astro   (441 baris)
│   │   ├── DVNVideoTestimonials.astro     (591 baris)
│   │   └── SiteFooterLinks.astro          (44 baris)
│   ├── lib/
│   │   └── is-bot.ts
│   └── pages/dvn/collagen/dvncollagen/index.astro   # contoh komposisi lengkap
├── public/
│   ├── fonts/            # 4 file woff2 (variable font subset)
│   ├── images/
│   │   ├── dvn/hero2/...        # icon svg, model webp, product-stage webp
│   │   ├── dvn/reference2/...   # badge, consultant, decor, ingredients, trust
│   │   └── og-dvn-collagen-2026-09.jpg
│   └── videos/cod-testimoni/    # 7× mp4 + poster webp + preview webp (~34MB)
```

Total 89 file, ~39MB.

## Dependency & versi (dari package.json asli)

- `astro`: ^5.0.0
- `@astrojs/cloudflare`: ^12.0.0
- `@astrojs/sitemap`: ^3.7.2
- devDependencies: `terser` ^5.36.0, `wrangler` ^4.136.3
- **Tidak memakai Tailwind atau CSS framework apapun** — semua styling
  pakai Astro scoped `<style>` per komponen (vanilla CSS). Jangan asumsikan
  ada `tailwind.config` — tidak ada.

## Font

Self-hosted variable font, bukan Google Fonts CDN (sengaja, untuk performa):
- **Cormorant Garamond** (serif, dipakai untuk brand mark "D·V·N" & heading dekoratif) — weight 400/600/700 + italic 500/600, semuanya di-serve dari 2 file woff2 via `unicode-range` trick.
- **Plus Jakarta Sans** (sans-serif, body text) — weight 400/500/600/700/800, dari 2 file woff2.

`@font-face` declarations ada di `BaseLayout.astro` baris ~113-131. 4 file
fisiknya ada di `public/fonts/`.

## ⚠️ WAJIB diadaptasi sebelum dipakai di project/domain lain

Bagian-bagian ini BUKAN bagian "desain" — ini konfigurasi tracking/bisnis
yang terikat ke domain & akun DVN Collagen saat ini. Kalau tidak diganti,
data akan nyasar ke akun Ads/analytics yang salah:

1. **Google Ads gtag** (`BaseLayout.astro` baris ~60-70) — hardcoded
   `AW-18467553912`. Ganti dengan Conversion ID milik project baru, atau
   hapus seluruh blok `<script>` gtag kalau project baru belum pasang Google
   Ads.
2. **Cloudflare Zaraz consent integration** (`BaseLayout.astro` baris
   ~237-261) — mengasumsikan Zaraz sudah di-setup di Cloudflare Pages
   project baru dengan cookie `zaraz-consent` dan tujuan konsen "Analitik".
   Kalau project baru tidak pakai Zaraz, hapus blok ini (jangan dibiarkan
   nyoba panggil `window.zaraz` yang tidak ada — aman karena ada `try/catch`,
   tapi tetap dead code).
3. **GCLID capture & tombol WhatsApp dengan atribusi** — kemungkinan ada di
   dalam `DVNReferenceLandingPage.astro` / `DVNClaudeHero.astro` (cek
   `sessionStorage`/`localStorage` keys dan parameter URL yang di-attach ke
   link WA). Ini terikat ke nomor WA & skema atribusi DVN — **cek dulu
   sebelum reuse**, jangan kirim lead salah brand ke WA DVN.
4. **BPOM/Halal/sertifikasi klaim** (teks di `DVNAuthenticitySection.astro`,
   `og:description`, dll) — spesifik regulasi produk suplemen Indonesia untuk
   DVN Collagen. Kalau produk baru beda kategori (bukan suplemen BPOM), klaim
   ini harus dihapus total, jangan cuma diganti teks — ini masalah compliance,
   bukan copywriting.
5. **Domain hardcoded**: `astro.config.mjs` (`site: 'https://wellnesbeauty.com'`),
   `BaseLayout.astro` (`ogImage` default ke `wellnesbeauty.com`), meta
   `author`/`og:site_name` = "DVN X RAYA". Semua harus diganti ke domain &
   nama brand baru.
6. **Link di `SiteFooterLinks.astro`** — mengarah ke halaman legal DVN
   (`/privacy-policy/`, `/terms/`, dll) yang TIDAK ikut di-export folder ini
   (itu halaman konten, bukan design system). Project baru harus punya
   halaman-halaman itu sendiri atau link-nya diubah.

## Cara pakai (ringkas)

Lihat `PROMPT.md` di folder ini — itu teks siap-paste untuk dikasih ke
instance Claude Code/Codex lain di project baru, sudah mencakup instruksi
clone, mapping file, dan checklist adaptasi di atas.
