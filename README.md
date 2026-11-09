<a href="https://faithfulpack.net/" target="_blank">
  <img
    src="https://database.faithfulpack.net/images/branding/logos/transparent/hd/main_logo.png?w=256"
    alt="Faithful Logo"
    height="256"
    align="right"
  >
</a>
<div align="center">
  <h1>Faithful Website</h1>
  <h3>The official website for the Faithful resource packs.</h3>

  ![RepoSize](https://img.shields.io/github/repo-size/Faithful-Resource-Pack/Website?style=flat-square)
  ![Issues](https://img.shields.io/github/issues/Faithful-Resource-Pack/Website?style=flat-square)
  ![PullRequests](https://img.shields.io/github/issues-pr/Faithful-Resource-Pack/Website?style=flat-square)
  ![Stars](https://img.shields.io/github/stars/Faithful-Resource-Pack/Website?style=flat-square)
</div>

---

## Requirements

- Node.js v22+ (https://nodejs.org)
- pnpm (`corepack enable` + `corepack prepare pnpm@latest --activate`)

## Running

Rename the [`.env.example`](.env.example) file to `.env`. The defaults should work out of the box, but you may want to configure the Faithful API URL if you want to test local data.

Install the website project dependencies by running:

```bash
pnpm install
```

To start the website, run:

```bash
pnpm dev
```

## Building

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.
