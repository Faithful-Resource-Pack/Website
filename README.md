<a href="https://Faithfulpack.net/" target="_blank"><img src="https://github.com/Faithful-Resource-Pack/Branding/blob/main/logos/transparent/256/plain_logo.png?raw=true" alt="Faithful Logo" align="right"></a>
<div align="center">
  <h1>Faithful Website</h1>
  <h3>The official website for the Faithful Project</h3>
  
![RepoSize](https://img.shields.io/github/repo-size/Faithful-Resource-Pack/Website?style=flat-square)
![Issues](https://img.shields.io/github/issues/Faithful-Resource-Pack/Website?style=flat-square)
![PullRequests](https://img.shields.io/github/issues-pr/Faithful-Resource-Pack/Website?style=flat-square)
![Stars](https://img.shields.io/github/stars/Faithful-Resource-Pack/Website?style=flat-square)
</div>

---

## What is this website?
This website was created to show off everything related to the Faithful Resource Pack for Minecraft. On it you'll find the main pack, add-ons, mod support and much more.

## Do you want to contribute? Contribute!

You can create a [fork](https://github.com/Faithful-Resource-Pack/Website/network/members) of this repository, apply your changes/additions and then create a [pull request](https://github.com/Faithful-Resource-Pack/Website/compare).

# Installation process:

There are two requirements before developing/previewing the website. First you need [Ruby](https://www.ruby-lang.org/en/downloads/). With Ruby you will need to install [Jekyll](https://jekyllrb.com/) by typing the following command in your favorite terminal:
```
gem install bundler jekyll
```
**If you are using Ruby 3 or higher, you also need to install Webrick:**
```
gem install webrick
```

Then you need to install the bundle provided in the [Gemfile](./Gemfile):
```
bundle install
```

Then you need to build the website with this command:
```
bundle exec jekyll build
```

New hybrid website to allow dynamic content with Jekyll!

Install all dependencies :
```
npm install --save-dev
```

Create a `.env` file in the root folder, following the formatting of the `.env.example` file


If you're using Windows (or any OS that uses backslashes for file paths), run these commands in **separate terminals** to preview and automatically rebuild the website if an existing file changes:
```
npm run dev-watch-site

npm run dev-watch-app
```

If you're using Mac/Linux (or any OS that uses regular slashes for file paths), run these commands in **separate terminals** to preview and automatically rebuild the website if an existing file changes:

```
npm run dev-watch-site

npm run dev-watch-app-unix
```

After that you can enjoy your website on your local machine at http://localhost:8110, where the numbers at the end are the PORT number in the `.env` file created earlier. Enjoy! 
