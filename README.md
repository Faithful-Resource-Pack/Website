<a href="https://faithfulpack.net/" target="_blank"><img src="https://github.com/Faithful-Resource-Pack/Branding/blob/main/logos/transparent/256/plain_logo.png?raw=true" alt="Faithful Logo" align="right"></a>
<div align="center">
  <h1>Faithful Website</h1>
  <h3>The official website for the Faithful Project.</h3>

  ![RepoSize](https://img.shields.io/github/repo-size/Faithful-Resource-Pack/Website?style=flat-square)
  ![Issues](https://img.shields.io/github/issues/Faithful-Resource-Pack/Website?style=flat-square)
  ![PullRequests](https://img.shields.io/github/issues-pr/Faithful-Resource-Pack/Website?style=flat-square)
  ![Stars](https://img.shields.io/github/stars/Faithful-Resource-Pack/Website?style=flat-square)
</div>

---

## Requirements
- NodeJS 18+ https://nodejs.org
- pnpm (`corepack enable` + `corepack prepare pnpm@latest --activate`)
- Ruby 3.1 or below https://www.ruby-lang.org/en/downloads/ (https://mac.install.guide/ruby/12.html for MacOS)
- Jekyll & Webrick (`gem install bundler jekyll` + `gem install webrick`)

## Running

Create a file called `.env` in the root folder, using [`.env.example`](.env.example) as a template.

```bash
bundle install
```

```bash
pnpm install
```

```bash
pnpm dev
```