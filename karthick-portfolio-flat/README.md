# Karthick M — Portfolio

A single-page developer portfolio built with plain HTML, CSS and JavaScript
(no framework, no backend/server required). All files sit in one flat folder
— no subfolders — so it uploads cleanly through GitHub's web "Upload files"
tool with no path issues.

## Files
- `index.html` — page content
- `styles.css` — all styling (dark theme, amber accent)
- `main.js` — nav menu, scroll effects, hero terminal animation, contact form
- `Karthick-Resume.pdf` — downloadable resume (linked from the "Download CV" button)
- `profile.png` — profile photo
- `blob.svg` — decorative background shape

## Run it
Just open `index.html` in a browser, or serve the folder with any static server:

```
python3 -m http.server 8000
```

## Deploy with GitHub Pages
1. Push/upload all these files to the root of your repo.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set Source to **Deploy from a branch**,
   branch to `main` (or `master`), folder to `/ (root)`, then Save.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Notes
- The contact form has no backend, so on submit it opens the visitor's email
  app with the message pre-filled (via a `mailto:` link). To make it actually
  send messages without opening an email app, you'd need a small backend or
  a form service (e.g. Formspree, EmailJS).
- Update the GitHub/LinkedIn links in `index.html` (currently placeholders)
  to your real profile URLs.
