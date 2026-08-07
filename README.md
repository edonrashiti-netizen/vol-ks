# VOL-KS Service

Landing page for **VOL-KS Service** — specialized Volvo workshop in Fushë Kosovë, Uglarë.

- Public site: Albanian default (`/`), English (`/en`)
- Sections: Ballina, Rreth nesh, Shërbimet, Galeria, Kontakti
- Admin (`/admin`): edit services and gallery (password protected)

## Local development

```bash
npm install
cp .env.example .env.local
# set ADMIN_PASSWORD and SESSION_SECRET
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

Without `BLOB_READ_WRITE_TOKEN`, content is stored in `data/content.json` and uploads go to `public/uploads/` (local only).

## SEO

Built-in for Google:

- Metadata, Open Graph, Twitter cards, hreflang (`sq` / `en`)
- `robots.txt` + `sitemap.xml`
- JSON-LD LocalBusiness / AutoRepair schema (address, hours, geo, social)
- Admin routes are noindex

After deploy:

1. Set `NEXT_PUBLIC_SITE_URL=https://vol-ks.com` on Vercel
2. Submit `https://vol-ks.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console)
3. Claim the Google Business Profile for VOL-KS Service (maps listing already exists)

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `SESSION_SECRET` | Yes (prod) | Signs the admin session cookie |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical site URL for SEO (`https://vol-ks.com`) |
| `BLOB_READ_WRITE_TOKEN` | Yes on Vercel | Persists services/gallery via [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |

## Deploy on Vercel + Cloudflare (`vol-ks.com`)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. In the Vercel project:
   - Add `ADMIN_PASSWORD` and `SESSION_SECRET`
   - Create a **Blob** store and connect it (sets `BLOB_READ_WRITE_TOKEN`)
4. Deploy.
5. In Cloudflare DNS for `vol-ks.com`:
   - Add a **CNAME** for `@` (or use Vercel nameservers / Cloudflare CNAME flattening) pointing to `cname.vercel-dns.com`
   - Add **CNAME** `www` → `cname.vercel-dns.com`
6. In Vercel → Project → Domains, add `vol-ks.com` and `www.vol-ks.com`.

Proxy/SSL on Cloudflare can stay on **Full (strict)** once certificates are issued.

## Brand assets

Source files live in `Brand/`. Runtime copies are in `public/brand`, `public/gallery`, and `public/fonts`.

## Contact (fixed on the site)

- Phone: +383 44 288 158
- Hours: Monday–Saturday, 08:00–17:00
- Location: Fushë Kosovë, Uglarë
- Facebook / Instagram linked in Contact
