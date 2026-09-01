# NDS-JMU Website — Editing & Deployment Guide

This is the website for the National Defense Society at JMU. It is plain
HTML, CSS, and JavaScript — no frameworks, no build step. You can edit
it with any text editor (VS Code is free and recommended).

---

## Contents

- [The files](#the-files)
- [Editing the site](#editing-the-site)
  - [Add or remove a speaker](#add-or-remove-a-speaker)
  - [Update meeting info and dates](#update-meeting-info-and-dates)
  - [Add a project team domain](#add-a-project-team-domain)
  - [Update officer information](#update-officer-information)
  - [Update the Google Form link](#update-the-google-form-link)
  - [Speaker and officer photos](#speaker-and-officer-photos)
  - [Change colors, fonts, or spacing](#change-colors-fonts-or-spacing)
- [Deployment — first-time setup](#deployment--first-time-setup)
- [Deployment — pushing changes](#deployment--pushing-changes)
- [Security](#security)
- [Custom domain setup](#custom-domain-setup)
- [Rules of thumb](#rules-of-thumb)

---

## The files

| File | Purpose |
|---|---|
| `index.html` | All the content on the page. **This is the file you will edit most.** |
| `style.css` | All the styling (colors, fonts, spacing). |
| `script.js` | A tiny bit of JavaScript for the mobile menu and nav shadow. You will rarely touch this. |
| `vercel.json` | **Security configuration.** Do not modify without understanding what each header does. |
| `robots.txt` | Tells search engines what to index. |
| `sitemap.xml` | Helps search engines find pages. Update the date when you make major changes. |
| `.gitignore` | Tells Git which files to ignore. |
| `images/speakers/` | Speaker headshots. |
| `images/officers/` | Officer headshots. |
| `images/logo.png` | The eagle shield logo. |
| `images/og-image.png` | The preview image shown when the site is shared on LinkedIn (1200×630 px). |
| `favicon.png` | Small icon shown in browser tabs. |

Every section of `index.html` has a big comment banner above it saying
what it is and how to edit it. Search the file (Ctrl+F) for the section
name, e.g. `SPEAKERS SECTION`.

---

## Editing the site

### Add or remove a speaker

1. Open `index.html` and find the comment banner `5. SPEAKERS SECTION`.
2. Copy one whole speaker block — everything from
   `<article class="speaker-card">` down to its closing `</article>`.
3. Paste it right before the comment that says
   `ADD A NEW SPEAKER CARD HERE`.
4. In your new block, change:
   - the `src` of the `<img>` (see "Speaker photos" below)
   - the `alt` text (the person's name + "headshot")
   - the date line (`// SEPTEMBER 8, 2026` format)
   - the name, title, and one-line description
5. Also add the talk to the key-dates table in the MEETINGS section
   (copy a `<tr>` row).

To remove a speaker, delete their whole `<article>...</article>` block.

### Update meeting info and dates

Find `6. MEETINGS SECTION` in `index.html`. The day, time, and room are
in the `meeting-bar` block near the top of that section. The semester
key dates are in the table below it — copy a `<tr>` row to add a date.

### Add a project team domain

Find `7. PROJECT TEAMS SECTION` in `index.html`. Copy one `<li>` line in
the `domain-list` and change the text. When applications open, change the
button text and point its `href` at the application form.

### Update officer information

Find `8. LEADERSHIP SECTION` in `index.html`. Each officer is one
`<article class="officer-card">` block — copy one to add an officer,
delete one to remove. The faculty advisor is in the `advisor` block at
the bottom of the section.

### Update the Google Form link

The join/mailing-list form link appears **four times** in `index.html`.
Each spot is marked with the comment `REPLACE the href below with the
real Google Form link`. Search the file for `REPLACE-WITH-FORM-LINK`
and replace every occurrence with the real URL.

### Speaker and officer photos

- Put speaker photos in `images/speakers/` and officer photos in
  `images/officers/`.
- Name them like `firstname-lastname.jpg` (lowercase, hyphens).
- Portrait orientation, at least **600×720 px**, under ~300 KB
  (use tinypng.com to compress).
- Use a normal color photo — the blue tint from the posters is applied
  automatically by the CSS.
- The current `.svg` files are placeholders. To swap one in: drop the
  real photo into the folder, then change the `src` in `index.html`
  from e.g. `images/speakers/mike-driscoll.svg` to
  `images/speakers/mike-driscoll.jpg`.

### Change colors, fonts, or spacing

Open `style.css`. Everything is defined once at the top under
`1. VARIABLES`. Change `--accent` there, for example, and every button
and label updates at once.

---

## Deployment — first-time setup

You will do this once. After that, all changes deploy automatically.

### Step 1: Create a GitHub account and repository

1. Go to **github.com** and create an account **using a chapter email
   address**, not a personal email. Future officers need to inherit this.
   Suggested email: `nds.jmu@[chapter domain]` or similar.
2. Create a new organization at github.com/organizations/new (also
   under the chapter email). Name it something like `nds-jmu`.
3. Create a new repository under that organization named `ndsjmu-website`
   (or whatever your domain will be). Choose **public** so GitHub Pages
   and Vercel work on the free tier.
4. Do NOT initialize with a README or .gitignore — this folder already
   has them.

### Step 2: Push this folder to GitHub

Install Git if you do not have it (git-scm.com), then in a terminal:

```bash
cd path/to/this/folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/nds-jmu/ndsjmu-website.git
git push -u origin main
```

Replace `nds-jmu/ndsjmu-website` with your actual organization and
repository names.

### Step 3: Deploy to Vercel

1. Go to **vercel.com** and sign up **using the chapter email**.
2. Click "Add New Project" and import the repository you just created.
   You will need to grant Vercel access to your GitHub organization.
3. Framework Preset: **Other**
4. Build Command: leave empty
5. Output Directory: leave empty
6. Click **Deploy**.

Within about a minute the site will be live at a URL like
`ndsjmu-website.vercel.app`. That URL is Vercel's default — you will
attach your custom domain in the next section.

---

## Deployment — pushing changes

Once the initial setup is done, updating the site is easy:

**Option A — Edit on GitHub directly (easiest for small changes):**

1. Go to your repository on github.com.
2. Click any file (like `index.html`), then click the pencil icon
   ("Edit this file").
3. Make your changes.
4. Scroll to the bottom, write a brief commit message, and click
   "Commit changes."
5. Vercel notices the commit and redeploys automatically. The live site
   updates in about a minute.

**Option B — Edit locally, push with Git (better for big changes):**

1. Edit the files in your local copy of the folder.
2. Open your browser and double-click `index.html` to preview.
3. When ready, in a terminal:
   ```bash
   git add .
   git commit -m "Describe what you changed"
   git push
   ```
4. Vercel deploys automatically.

---

## Security

This site takes security seriously despite being a simple static site.
The `vercel.json` file configures a set of HTTP security headers that
protect against common web attacks. Do not modify this file without
understanding what each header does.

### Headers configured

| Header | Purpose |
|---|---|
| **Content-Security-Policy** | Prevents cross-site scripting (XSS) attacks by controlling what resources can load on the page. Currently allows scripts and styles only from our own domain, and fonts from Google Fonts. |
| **Strict-Transport-Security** | Forces browsers to always use HTTPS for this site. Prevents downgrade attacks. |
| **X-Content-Type-Options: nosniff** | Prevents browsers from guessing file types, which blocks a class of upload-based attacks. |
| **X-Frame-Options: DENY** | Prevents the site from being embedded in an iframe on another site. Protects against clickjacking attacks. |
| **Referrer-Policy** | Controls how much information about the site is shared when visitors click outbound links. |
| **Permissions-Policy** | Explicitly disables browser features the site does not use (camera, mic, geolocation, etc.) so they cannot be abused. |
| **Cross-Origin-Opener-Policy** | Isolates the site from other browser windows for additional security. |

### Other security practices in place

- **External links** (LinkedIn, Instagram, Google Forms) use
  `rel="noopener noreferrer"` and `target="_blank"`, which prevents
  tab-hijacking attacks where a linked page could manipulate the
  original tab.
- **HTTPS** is enforced automatically by Vercel — the site is only
  accessible over encrypted connections.
- **No inline scripts or styles** — all JavaScript and CSS are in
  separate files, which is a defense-in-depth practice against XSS.
- **No third-party trackers or analytics** — if you add analytics
  later (like Google Analytics or Plausible), you will need to update
  the Content-Security-Policy in `vercel.json` to allow them.

### Testing security headers

After deploying, test your security headers at:
- **https://securityheaders.com** — grades your headers, should show A+
- **https://observatory.mozilla.org** — Mozilla's security observatory

Aim for an A grade or higher on both.

### If you need to update the Content Security Policy

If you add new external resources (analytics, embedded videos, etc.),
you will need to update the `Content-Security-Policy` in `vercel.json`.
The syntax is strict — a broken CSP can prevent the site from loading.
Test in a preview deployment before merging to production.

### Handling security reports

If someone reports a security issue with the site, take it seriously.
Respond within 24 hours acknowledging the report. Consider adding a
`security.txt` file at `/.well-known/security.txt` with your security
contact info in the future.

---

## Custom domain setup

Once the site is live on the default Vercel URL, attach your custom
domain (e.g., `ndsjmu.org`):

1. **Buy the domain** through Namecheap, Porkbun, or Google Domains
   (~$10-15/year). Use the chapter email account.
2. In Vercel, go to your project → **Settings** → **Domains**.
3. Add your custom domain (e.g., `ndsjmu.org`).
4. Vercel will show you DNS records to add at your registrar.
   Typically two records: an `A` record and a `CNAME`.
5. In your registrar's DNS panel, add the records Vercel gave you.
6. Wait 5-60 minutes for DNS to propagate. Vercel will automatically
   provision an SSL certificate.
7. Once active, update the following files to reference the new domain:
   - `sitemap.xml` — change `https://ndsjmu.org/` to your domain
   - `robots.txt` — change the sitemap URL
   - `index.html` — change the `og:url` and `canonical` tags

---

## Rules of thumb

- Always copy an existing block rather than writing HTML from scratch —
  the patterns are consistent on purpose.
- After editing, open `index.html` in your browser (double-click the
  file) to check it looks right before committing.
- Don't rename the CSS class names (`speaker-card`, `officer-card`,
  etc.) — the styling depends on them.
- Don't modify `vercel.json` without understanding what each setting
  does. A broken CSP can silently break the site.
- Keep the site simple. If you feel the urge to add a JavaScript
  framework, animations, or dark mode, resist it. Simple sites are
  faster, more secure, and easier for the next officer to maintain.
- The site should always work with JavaScript disabled. If you add
  new features, make sure they degrade gracefully.

---

## Officer handoff checklist

When transitioning to the next officer team:

- [ ] Transfer GitHub organization ownership to next officer's chapter email
- [ ] Transfer Vercel account ownership
- [ ] Transfer domain registrar account ownership
- [ ] Walk the incoming officer through this README in person
- [ ] Show them how to make an edit and deploy it
- [ ] Confirm they can access all accounts before you graduate
- [ ] Update the officer photos and information on the site
