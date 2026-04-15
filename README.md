# cms-react-editorial

React 17 + TypeScript microfrontend for the CMS Ultra platform. Handles editorial content creation, management, and publishing.

## Features

- 📋 Article list with status tracking (Published / Review / Draft)
- ✏️ Full article editor with title, body and status controls
- 📊 Stats dashboard (total articles, published, drafts)

## Live Demo

🌐 **Standalone:** https://AaqibhafeezKhan.github.io/cms-react-editorial  
🌐 **In Shell:** https://AaqibhafeezKhan.github.io/cms-root-orchestration/editorial

## Local Development

```bash
npm install
npm start   # → http://localhost:8081
```

## Build

```bash
npm run build   # outputs dist/main.js as SystemJS module
```

## Single-SPA Integration

Exports `{ bootstrap, mount, unmount }` as a SystemJS module consumed by the root shell.
