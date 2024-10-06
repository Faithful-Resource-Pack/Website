# How to add an article to the Faithful Website:

Adding an article to the website is as simple as adding a markdown file in this folder (`posts`). You can use this file as an example for your post.

> **The title and permalink are necessary, but everything else can be safely removed.**

```md
---
title: Faithful Smart Fridge Alpha 1
permalink: /faithfulsmartfridge/A1

# can be removed
header_img: https://database.faithfulpack.net/images/website/posts/fridge/A1.jpg

# can be removed
description: |
  We're proud to announce that Faithful is extending its support to smart fridges worldwide.
  <br>
  This description can span multiple lines and can have <b>markup</b>

changelog:
  # you can use any combination of objects, strings, and arrays if it's valid YAML
  Added:
    Blocks:
      - Stone <strong>@Juknum</strong> # use HTML tags to underline/bold text
  Changed:
    Items:
      - "[Bedrock] Square and curly brackets at the start of items need quoting to prevent YAML conflicts"

# you can use a mix of groups and single links
downloads:
  Planet Minecraft: https://www.planetminecraft.com/texture-pack/
  This is a download group:
    CurseForge: https://www.curseforge.com/minecraft/texture-packs/
    Modrinth: https://modrinth.com/resourcepacks

---
```

**To avoid any problems with YAML formatting, we recommend using two spaces per indentation level for whitespace between the frontmatter tags (`---`) as opposed to tabs or a different number of spaces.**