# Personal Blog — Hugo site with heavily modified Hyde theme

## Key Conventions
- Subsections live in `content/posts/` directories, each with an `_index.md`.
- The `weight` front matter in `_index.md` controls homepage display order. Weights are assigned alphabetically. When adding a new subsection, adjust weights to maintain alphabetical order.
- Each subsection may have a `recommended.md` displayed on its index page via `themes/hyde/layouts/_default/list.html`.
- The site deploys from the `generated` branch (not `main`).
- When new posts or recommended content are added, check for spelling and grammar errors before committing.
- The site supports light and dark mode via `prefers-color-scheme`. CSS color tokens live in `themes/hyde/static/css/poole.css` (`--bg`, `--text`, `--text-secondary`, `--link`, `--border`). Any new styles must use these tokens or include explicit `@media (prefers-color-scheme: dark)` overrides — never hardcode colors that only look right in one mode.

## Git Workflow
- Always create a feature branch from `main` for changes. Never commit directly to `main`.
- Do not commit until explicitly asked. When asked to commit:
  1. Run `hugo server` in the background and fetch the relevant pages to verify changes render correctly.
  2. Make logically separated commits. Never mix infrastructure changes (config, docs, theme) with content. Separate posts should be separate commits.
  3. Display what the commits you made are along with the files modified in each commit and then ask me whether I want to push the branch to GitHub.
  4. Create a PR targeting `main`.
  5. Ask whether the PR has been deployed. Once confirmed, check out `main`, pull latest, and delete the feature branch locally and on github.