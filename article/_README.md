# How add an article to Compliance Website :
- Add an image in `image/article/<compliance ...>/<mc_version>.png`  
- Add a markdown file inside `article/<compliance ...>/<mc_version>.md` :warning: **You should replace "." with "\_"**

Use this file as an example for your markdown file:
> **title & permalink are necessary, everything else can be removed**

```markdown
---
title: 1.16.4 - 64x
permalink: /article/compliance64x/1_16_4

header-img: /article/compliance64x/1.16.4.png

long_text: Lorem ipsum doloret and i like compliance // can be removed

added: // can be: removed, changed, fixed, added
  - Blocks: // can be everything you want
    - Stone <strong>@Juknum</strong> // use html balise to underline/bold text
---
```