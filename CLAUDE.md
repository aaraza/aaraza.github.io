# Personal Blog

## Project Overview

This project is a personal blog powered by Hugo. The blog serves as a centralized digital home for me to broadcast my thoughts to the world. I intend on writing about:
    
- Computer Science
- Cinema
- Sports
- Gaming
- And many other personal interests as thoughts worth publishing pop up

## Tech Stack and Tooling
- [Hugo](https://gohugo.io/): A static site generator. It allows me to create new blog posts using standard markdown.
- [Hyde Theme](https://github.com/spf13/2hyde): I used this theme to base the design of my application but have modified it quite a bit.
- [GitHub Pages](https://github.com/aaraza/aaraza.github.io): The blog is hosted on GitHub pages.
- [Namecheap](https://www.namecheap.com): The custom domain, https://www.aliraza.gg, is a namecheap domain. 

## CI/CD
Defined in `.github/workflows/deploy.yml`. On every push to `main`, GitHub Actions:
1. Checks out the repo with full history (`fetch-depth: 0`) so Hugo can access git metadata.
2. Cleans the `public/` directory for a fresh build.
3. Installs Hugo and builds the site with `--minify`.
4. Deploys the built output to the `generated` branch via `peaceiris/actions-gh-pages`. GitHub Pages serves the site from this branch.

## Organization and Blog Structure
The home page, configured by the `content/about.md` file has a one-line greeting and a link to all the subsections of the website.

The subsections are organized as directories in the `content/posts/` directory. 

Each subsection may have a unique type of post `recommended.md`. This content is displayed in indexs page of the subsection as configured in `themes/hyde/layouts/_default/list.html` 