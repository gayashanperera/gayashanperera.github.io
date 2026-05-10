# Gayashan Perera — IDE Portfolio

A code-editor-themed portfolio built with Angular 21 (zoneless, standalone, signals-first).
Hosted on GitHub Pages at <https://gayashanperera.github.io/>.

## Stack

- Angular 21 — standalone components, zoneless change detection, new control flow
- Signals + computed + effects (no NgRx, no Zone.js)
- TypeScript strict mode, OnPush everywhere
- SCSS with design tokens
- Single SPA, no router, no third-party UI

## Develop

```bash
npm install
npm start         # http://localhost:4200
```

## Build

```bash
npm run build     # outputs dist/ide-portfolio/browser
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes
to GitHub Pages. No manual step needed once the repo is configured (Settings → Pages →
Source: GitHub Actions).
