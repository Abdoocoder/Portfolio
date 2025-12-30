# GitHub Pages Redirect Setup

This directory contains a simple redirect page for GitHub Pages that automatically redirects visitors to the main Vercel deployment.

## How it works

1. The `index.html` file uses multiple redirect methods:
   - Meta refresh tag (instant redirect)
   - JavaScript `window.location.replace()`
   - Manual link as fallback

2. Visitors to `https://abdoocoder.github.io/Portfolio/` will be automatically redirected to `https://abdoocoder-portfolio.vercel.app/`

## Setup Instructions

### Option 1: Using GitHub Pages with gh-pages branch

1. Create a new branch called `gh-pages`:
   ```bash
   git checkout -b gh-pages
   ```

2. Remove all files except the redirect page:
   ```bash
   git rm -rf .
   git checkout HEAD -- public/index.html
   mv public/index.html index.html
   ```

3. Commit and push:
   ```bash
   git add index.html
   git commit -m "Add GitHub Pages redirect"
   git push origin gh-pages
   ```

4. Go to your GitHub repository settings → Pages
5. Set source to `gh-pages` branch
6. Save

### Option 2: Using GitHub Actions (Recommended)

1. Keep your main branch as is
2. Create `.github/workflows/deploy-redirect.yml` (already created)
3. Push to main branch
4. GitHub Actions will automatically deploy the redirect page

### Option 3: Manual Setup

1. Copy `public/index.html` to the root of a new `gh-pages` branch
2. Push the branch
3. Enable GitHub Pages in repository settings

## Verification

After setup, visit `https://abdoocoder.github.io/Portfolio/` and you should be automatically redirected to your Vercel deployment.

## Notes

- The redirect happens instantly (0 seconds delay)
- SEO-friendly with canonical link
- Fallback manual link for browsers with JavaScript disabled
- Beautiful loading animation while redirecting
