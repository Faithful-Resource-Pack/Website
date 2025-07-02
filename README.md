<a href="https://faithfulpack.net/" target="_blank">
  <img
    src="https://database.faithfulpack.net/images/branding/logos/transparent/hd/main_logo.png?w=256"
    alt="Faithful Logo"
    align="right"
  >
</a>
<div align="center">
  <h1>Faithful Website</h1>
  <h3>The official website for the Faithful Resource Packs.</h3>

  ![RepoSize](https://img.shields.io/github/repo-size/Faithful-Resource-Pack/Website?style=flat-square)
  ![Issues](https://img.shields.io/github/issues/Faithful-Resource-Pack/Website?style=flat-square)
  ![PullRequests](https://img.shields.io/github/issues-pr/Faithful-Resource-Pack/Website?style=flat-square)
  ![Stars](https://img.shields.io/github/stars/Faithful-Resource-Pack/Website?style=flat-square)
</div>

---

## Requirements
- NodeJS 20+ https://nodejs.org
- pnpm (`corepack enable` + `corepack prepare pnpm@latest --activate`)

## Running

Create a file called `.env` in the root folder, using [`.env.example`](.env.example) as a template.

```bash
pnpm install
```

```bash
pnpm dev
```

## Building

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.
