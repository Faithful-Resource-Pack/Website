# How to add an article to the Faithful Website:

Adding an article to the website is as simple as adding a markdown file in this folder (`_posts`). You can use this file as an example for your post.

> **The title, layout, and permalink are necessary, but everything else can be safely removed.**

```md
---
layout: post
title: Faithful Smart Fridge Alpha 1
permalink: /faithfulsmartfridge/A1

# can be removed
header-img: https://database.faithfulpack.net/images/website/posts/fridge/A1.jpg

# deprecated
carousel-img: https://database.faithfulpack.net/images/website/posts/fridge/
# if true, show image basename as caption title
show_carousel_name: false

# can be removed
long_text: |
  We're proud to announce that Faithful is extending its support to smart fridges worldwide.
  <br>
  This description can span multiple lines and can have <b>markup</b>

changelog:
  # you can technically have more than one changelog per article
  # this is usually not necessary however
  - Beta 3:
    - Added:
      - Blocks: # can be everything you want
        - Stone <strong>@Juknum</strong> # use html tags to underline/bold text
    - Changed:
      - Items:
        - "[Bedrock] Square and curly brackets need quoting to prevent YAML conflicts"

# can be removed:
download:
  - Planet Minecraft:
    - https://www.planetminecraft.com/texture-pack/
  - CurseForge:
    - https://www.curseforge.com/minecraft/texture-packs/

---
```

**To avoid any problems with YAML formatting, we recommend using two spaces per indentation level for whitespace between the frontmatter tags (`---`) as opposed to tabs or a different number of spaces.**