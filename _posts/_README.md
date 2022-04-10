# How to add an article to Faithful Website :
- Add an image in `image/article/<compliance ...>/<mc_version>.png`  
- Add a markdown file inside `article/<compliance ...>/<mc_version>.md` :warning: **You should replace "." with "\_"**

Use this file as an example for your markdown file:
> **title & permalink are necessary, everything else can be removed**

```markdown
---
layout: post
title: 1.16.4 - 64x
permalink: /compliance64x/1_16_4

header-img: compliance64x/1.16.4.png // can be removed

// can be removed:
carousel-img: article/carousel/Dark UI/ //must be in image/article/carousel/<whatever you want>
show_carousel_name: false //if true : show image basename as caption title

long_text: Lorem ipsum doloret and i like compliance // can be removed

added: // can be: 'removed', 'changed', 'fixed', 'added'
  - Blocks: // can be everything you want
    - Stone <strong>@Juknum</strong> // use html balises to underline/bold text

// you can add each category that you want:
changed:
  - Items:
    - Beds <strong>@Juknum</strong>

// used for addons, can be removed:
authors:
  - JogurciQ:
    - https://twitter.com/JogurciQ // if not, remove it
  - Juknum
  - RobertR11

// can be removed:
download: 
  - Planet Minecraft:
    - https://www.planetminecraft.com/texture-pack/
  - CurseForge:
    - https://www.curseforge.com/minecraft/texture-packs/

---
```

:warning: **To avoid any problems with yaml format, do not use tabs characters between `---` only spaces are allowed!**