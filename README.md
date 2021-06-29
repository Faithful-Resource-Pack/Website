<p align="center">
  <a href="https://compliancepack.net/" target="_blank">
    <img src="./image/icon/compliance_32x.png" alt="logo">
  </a>
  <h1 align="center">Compliance Website</h1>

  <div align="center">

![RepoSize](https://img.shields.io/github/repo-size/Compliance-Resource-Pack/Website?style=flat-square)
![Issues](https://img.shields.io/github/issues/Compliance-Resource-Pack/Website?style=flat-square)
![PullRequests](https://img.shields.io/github/issues-pr/Compliance-Resource-Pack/Website?style=flat-square)
![Stars](https://img.shields.io/github/stars/Compliance-Resource-Pack/Website?style=flat-square)
  </div>
</p>

## What is this website?
This website was created to show off everything related to the Compliance Resource Pack for Minecraft. On it you'll find the main pack, add-ons, mod support and much more.
You can also contribute thanks to the instructions below.

## You want to contribute? Contribute!

You can create a [fork](https://github.com/Compliance-Resource-Pack/Website/network/members) of this repository, apply your changes/additions and then create a [pull request](https://github.com/Compliance-Resource-Pack/Website/compare)

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

Eventually, in order to automatically rebuild the website if an existing file was updated, you can run:
```
bundle exec jekyll serve
```
After that you can enjoy your website on your local machine at the following address: http://127.0.0.1:4000/. Enjoy!
