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

## 这是什么网页？
这个网页是为了展示所有关于 Compliance Resource Pack 的东西.。你可以在这里找到材质包,，附加组件,，模组支持和更多。
你还可以根据下面的教程向我们贡献。

## 想要贡献？ 贡献！

你可以创建一个关于这个 Repository 的 [fork](https://github.com/Compliance-Resource-Pack/Website/network/members) , 做好你的改动之后创建一个 [pull request](https://github.com/Compliance-Resource-Pack/Website/compare)

### 安装过程

在编写网站前你需要满足两个要求。首先你需要 [Ruby](https://www.ruby-lang.org/en/downloads/)。安装完 Ruby 之后你需要运行以下命令来安装 [Jekyll](https://jekyllrb.com/) ：
```
gem install bundler jekyll
```
**如果你在使用 Ruby 3 或更高，你还需要安装 Webrick：**
```
gem install webrick
```

接下来你需要安装 [Gemfile](./Gemfile) 提供的 Bundle：
```
bundle install
```

你需要运行这条命令来创建网页：
```
bundle exec jekyll build
```

最后，如果现有的文件被更新，为了自动重建网站，你可以运行：
```
bundle exec jekyll serve
```
最后你可以在本地浏览你的网页： http://127.0.0.1:4000/ 。Enjoy！
