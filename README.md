# Personal Blog

A personal blog powered by Hugo, serving as a centralized digital home to broadcast thoughts on Computer Science, Cinema, Sports, Gaming, and other personal interests.

**Live at:** [aliraza.gg](https://www.aliraza.gg)

## Tech Stack

- [Hugo](https://gohugo.io/) — Static site generator using standard markdown for blog posts
- [Hyde Theme](https://github.com/spf13/hyde) — Base theme, heavily modified
- [GitHub Pages](https://github.com/aaraza/aaraza.github.io) — Hosting
- [Namecheap](https://www.namecheap.com) — Custom domain provider

## Blog Structure

- **Home page** — Configured by `content/about.md`, contains a greeting and links to all subsections
- **Subsections** — Organized as directories under `content/posts/`
- **Recommended posts** — Each subsection can have a `recommended.md` displayed on its index page via `themes/hyde/layouts/_default/list.html`

## Development

```sh
# Run the site locally
hugo server

# Run with draft posts included
hugo server -D

# Create a new post
hugo new content content/posts/<name_of_post>.md
```

## CI/CD

The site is automatically built and deployed via a GitHub Actions workflow (`.github/workflows/deploy.yml`). On every push to `main`:

1. The repository is checked out with full history (`fetch-depth: 0`) so Hugo can access git metadata like dates.
2. The `public/` directory is cleaned to ensure a fresh build.
3. Hugo is installed and builds the site with `--minify`.
4. The built output is deployed to the `generated` branch using [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages). GitHub Pages is configured to serve from this branch.

## Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hyde Theme](https://github.com/spf13/hyde)
- [Poole/Hyde](https://github.com/poole/hyde)
- [Poole](https://github.com/poole/poole)
