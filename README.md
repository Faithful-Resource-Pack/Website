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

# Requirements
- NodeJS 16+ https://nodejs.org
- pnpm (`corepack enable` + `corepack prepare pnpm@latest --activate`)

## For macOS only:

> For more details about this process, check out [this article](https://mac.install.guide/ruby/12.html).

You will first need [chruby](https://github.com/postmodern/chruby) to override the system Ruby. The easiest way is with [Homebrew](https://brew.sh/).
```
brew install ruby-install chruby
```

From there, you will need to edit the `~/.zshrc` file to have the following lines of code.

```
source /usr/local/share/chruby/chruby.sh
source /usr/local/share/chruby/auto.sh
chruby ruby-3.1.0
```

Restart your terminal, and now you can install Ruby:
```
ruby-install --latest ruby
```

If you see Ruby version 2.6.8, it is the system Ruby and you likely forgot to close and re-open the terminal window.

## All other operating systems:

You can use the built-in [Ruby](https://www.ruby-lang.org/en/downloads/) installer, or any other package management system.

# Previewing and building:

With Ruby you will need to install [Jekyll](https://jekyllrb.com/) by typing the following command in your favorite terminal:
```
gem install bundler jekyll
```

If you are using Ruby 3 or higher, you also need to install Webrick:
```
gem install webrick
```

Then you need to install the bundle provided in the [Gemfile](./Gemfile):
```
bundle install
```

After that, you need to build the website with this command:
```
bundle exec jekyll build
```

Now we have a hybrid website with dynamic content using Jekyll!

Install all dependencies:
```
pnpm install
```

Create a file called `.env` in the root folder, following the formatting of the `.env.example` file

From there, run these commands in **separate terminal windows** to preview and automatically rebuild the website if an existing file changes:
```
pnpm dev-watch-site

pnpm dev-watch-app
```

After that you can enjoy your website on your local machine at http://localhost:8110, where the numbers at the end are the PORT number in the `.env` file created earlier. Enjoy!
