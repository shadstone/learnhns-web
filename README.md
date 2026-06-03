# LearnHNS Web

Astro website for [learnhns.com](https://learnhns.com), the public education and documentation surface for the LearnHNS ecosystem.

## What Lives Here

- Public pages, guides, and docs for Handshake/HNS users.
- Static assets needed by the website at runtime.
- Public agent-facing files such as `public/llms.txt` and `/skill.md`.
- The optional WebDesignDaddy CMS integration used by the blog.

Internal plans, deployment handoffs, raw specs, large source archives, and cross-repo coordination notes should live in the adjacent hub workspace:

```text
../hub-learnhns/temp-specs/
```

## Setup

```sh
npm install
npm run dev
```

The local dev server defaults to `http://localhost:4321`.

## Build

```sh
npm run build
npm run preview
```

The production build is written to `dist/`, which is intentionally ignored by git.

## Environment

The site can build without local environment variables. Blog content is fetched only when a public CMS site key is configured:

```sh
cp .env.example .env
```

Set `PUBLIC_CMS_SITE_KEY` in `.env` when developing the WDD-powered blog locally. Do not commit `.env` or other local secret files.

## Public-Repo Hygiene

Before publishing or cutting a release:

- Keep `node_modules/`, `.astro/`, `dist/`, `.DS_Store`, logs, and local `.env` files out of git.
- Keep only runtime assets in `public/`; move source archives and working media exports to the hub `temp-specs` folder.
- Keep private roadmap notes, deployment runbooks, account notes, and raw agent handoffs out of this repo.
- Run `npm run build` before shipping changes.
