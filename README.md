# Paul Gibson II Portfolio

Personal marketing portfolio for Paul Gibson II. Built with Next.js, Tailwind CSS, and editable MDX content. Configured as a **static site** for Hostinger (or any shared hosting).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to update content

All marketing copy lives in `/content`. No CMS required.

| File | Purpose |
| --- | --- |
| `content/site.ts` | Name, email, LinkedIn URL, site title/description, nav |
| `content/introduction.mdx` | Homepage introduction headline, body, stats, closing line |
| `content/creative-leadership.mdx` | Leadership page copy |
| `content/case-studies/*.mdx` | Case study stories (Miracle Truss, Veritas, Schneitter) |

Images live in `public/images/`:

- `public/images/paul-gibson.png` — headshot
- `public/images/case-studies/` — case study photography

Update contact details in `content/site.ts`:

```ts
email: "p.gibson2@me.com",
linkedin: "https://www.linkedin.com/in/gibsgibson/",
```

## Scripts

- `npm run dev` — local development
- `npm run build` — produce static site in `out/`
- `npm run start` — preview the static `out/` folder locally
- `npm run pack` — build + zip `out/` into `gibs-web-static.zip` for Hostinger upload
- `npm run lint` — ESLint

## Deploy to Hostinger (gibbypaul.com)

### 1. Build the static site

```bash
npm run build
```

This creates an `out/` folder with plain HTML, CSS, JS, and images.

Optional: create a zip for easy upload:

```bash
npm run pack
```

### 2. Point the domain (if not already)

In Hostinger hPanel:

1. **Domains** → make sure **gibbypaul.com** is added
2. If the domain lives on this hosting account, assign it to the website that uses `public_html` (or note the folder Hostinger shows for that domain)
3. DNS should use Hostinger nameservers, or an A record to the Hostinger server IP

### 3. Upload the site

1. Log in to **hPanel** → **Files** → **File Manager** (or use FTP/SFTP)
2. Open the document root for **gibbypaul.com** (usually `public_html`, or a subdomain/addon folder Hostinger lists)
3. Delete or back up any old site files you no longer need
4. Upload **everything inside** `out/` (not the `out` folder itself)
   - Or upload `gibs-web-static.zip` and extract it inside that folder
5. Confirm `index.html` and `.htaccess` are in the domain root

### 4. Check the live site

Visit [https://gibbypaul.com](https://gibbypaul.com). You should see:

- `https://gibbypaul.com/` — home
- `https://gibbypaul.com/creative-leadership/` — leadership
- `https://gibbypaul.com/work/miracle-truss/` — case study
- `https://gibbypaul.com/work/veritas/` — case study
- `https://gibbypaul.com/work/schneitter/` — case study

**Note:** Trailing slashes are intentional (`/work/veritas/`) so Apache/Hostinger can serve each page as a folder with `index.html`.

Also turn on **SSL** in hPanel (Let's Encrypt) if HTTPS is not already active.

### GitHub Actions deploy (automatic)

Pushes to `main` build the site and upload `out/` over FTP. The repo currently has **no** Actions secrets configured — set these under **Settings → Secrets and variables → Actions** (or via CLI):

| Secret | Example / notes |
| --- | --- |
| `FTP_SERVER` | Hostinger FTP hostname (e.g. `ftp.gibbypaul.com` or the IP from hPanel → FTP Accounts) |
| `FTP_USERNAME` | FTP username from hPanel |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | Optional. Defaults to `/domains/gibbypaul.com/public_html/`. Use `./public_html/` if the FTP user is already scoped to that domain. |

```bash
gh secret set FTP_SERVER -b 'your.ftp.host'
gh secret set FTP_USERNAME -b 'your-ftp-user'
gh secret set FTP_PASSWORD -b 'your-ftp-password'
# optional:
# gh secret set FTP_SERVER_DIR -b './public_html/'
```

Then re-run the failed workflow, or push any commit to `main`.

### Updating later

1. Edit content/images locally
2. Run `npm run build` (or `npm run pack`)
3. Re-upload the new files from `out/` to Hostinger — or push to `main` once the FTP secrets above are set

## Pages

- `/` — Introduction + brand hero
- `/work/miracle-truss/` — Case study
- `/work/veritas/` — Case study
- `/work/schneitter/` — Case study
- `/creative-leadership/` — WHY, strengths, role fit
