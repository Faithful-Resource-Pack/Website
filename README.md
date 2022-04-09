<p align="center">
  <a href="https://Faithfulpack.net/" target="_blank">
    <img src="https://github.com/Faithful-Resource-Pack/Branding/blob/main/logos/transparent/512/plain_logo.png?raw=true" alt="logo">
  </a>
  <h1 align="center">Faithful Website</h1>

  <div align="center">

![RepoSize](https://img.shields.io/github/repo-size/Faithful-Resource-Pack/Website?style=flat-square)
![Issues](https://img.shields.io/github/issues/Faithful-Resource-Pack/Website?style=flat-square)
![PullRequests](https://img.shields.io/github/issues-pr/Faithful-Resource-Pack/Website?style=flat-square)
![Stars](https://img.shields.io/github/stars/Faithful-Resource-Pack/Website?style=flat-square)
  </div>
</p>

## What is this website?
This website was created to show off everything related to the Faithful Resource Pack for Minecraft. On it you'll find the main pack, add-ons, mod support and much more.
You can also contribute thanks to the instructions below.

## You want to contribute? Contribute!

You can create a [fork](https://github.com/Faithful-Resource-Pack/Website/network/members) of this repository, apply your changes/additions and then create a [pull request](https://github.com/Faithful-Resource-Pack/Website/compare)

### Installation process

You need a two requirements before developing the website. First you need [Ruby](https://www.ruby-lang.org/en/downloads/). With Ruby you will need to install [Jekyll](https://jekyllrb.com/) by typing the following command in your favorite terminal:
```
gem install bundler jekyll
```
**If you are using Ruby 3 or higher, you also need to install webrick:**
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

Setup .env file at root following .env.example file

Eventually, in order to automatically rebuild the website if an existing file was updated, you can run in **2 different** terminals:
```
npm run dev-watch-site
```
```
npm run dev-watch-app
```

After that you can enjoy your website on your local machine at the following address: http://127.0.0.1:&lt;PORT&gt;/. Enjoy!
