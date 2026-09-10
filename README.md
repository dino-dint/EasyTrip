# EasyTrip — Project Structure & Git Workflow Guide

## 1. Project Folder Structure

```
EasyTrip/
├── node_modules/              # Installed npm dependencies (auto-generated, never edit)
├── public/                    # Static assets served as-is (favicon, robots.txt, etc.)
├── src/
│   ├── assets/                # Images, icons, and static media used inside components
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/            # Reusable, "dumb" UI building blocks shared across pages
│   │   ├── cards/              # Card components (e.g. hotel card, flight card, destination card)
│   │   ├── layouts/             # Layout wrappers (Navbar, Footer, PageLayout, etc.)
│   │   └── loading/              # Loading spinners / skeleton screens
│   ├── context/                # React Context providers for global state
│   │   ├── AuthContext.jsx      # Login/logout/session state
│   │   ├── BookingContext.jsx   # Current booking flow state (flights/hotels selected)
│   │   └── WishlistContext.jsx  # Saved/favorited items
│   ├── data/                   # Static/mock data or data-shaping helpers (not API calls)
│   │   ├── countries.js
│   │   ├── destination.js
│   │   ├── flight.js
│   │   └── hotels.js
│   ├── pages/                  # Route-level "screen" components, one folder per page
│   │   ├── About/
│   │   ├── Auth/                # Login / Register / Forgot Password
│   │   ├── Booking/
│   │   ├── Checkout/
│   │   ├── ComingSoon/
│   │   ├── Contact/
│   │   ├── Destination/
│   │   ├── Flights/
│   │   ├── Home/
│   │   ├── Hotels/
│   │   ├── MyTrips/
│   │   ├── NotFound/            # 404 page
│   │   ├── Payment/
│   │   ├── Profile/
│   │   └── Wishlist/
│   ├── routes/                 # Route definitions / route guards (e.g. React Router config)
│   ├── utils/                   # Small pure helper functions
│   │   ├── formatCurrency.js
│   │   └── formatDate.js
│   ├── App.jsx                  # Root component, mounts routes/layout
│   ├── index.css                 # Global styles
│   └── main.jsx                  # App entry point, renders <App /> into the DOM
├── .gitignore                  # Files/folders Git should ignore (node_modules, .env, dist...)
├── eslint.config.js            # Linting rules
├── index.html                  # Vite's HTML entry point
├── package.json                 # Project metadata & dependencies
├── package-lock.json            # Locked dependency versions
├── README.md                    # Project overview/setup instructions
└── vite.config.js               # Vite build/dev-server configuration
```

### Folder-by-folder explanation

| Folder | Purpose |
|---|---|
| `public/` | Files copied to the output as-is, no build processing. |
| `src/assets/` | Images and icons imported directly into components. |
| `src/components/` | Small, reusable UI pieces with no business/routing logic (cards, layout shells, loaders). |
| `src/context/` | App-wide state shared via React Context — auth session, active booking, wishlist. |
| `src/data/` | Local data sets or mock data used before/instead of a real backend. |
| `src/pages/` | One folder per route — each represents a full screen the user navigates to. |
| `src/routes/` | Central place defining which URL renders which page (and any protected-route logic). |
| `src/utils/` | Framework-agnostic helper functions, e.g. currency/date formatting. |
| `App.jsx` / `main.jsx` | Application bootstrap — `main.jsx` mounts React, `App.jsx` sets up layout/routes. |

---

## 2. Git Branching Strategy

A simple **3-tier branching model** works well for a project like EasyTrip:

```
main        →  production-ready, always deployable
  └── develop   →  integration branch, latest working code
        └── feature/xxx  →  one branch per feature/bugfix
```

### `main`
- Always reflects what is **live in production**.
- Nobody commits directly here.
- Only receives merges from `develop` (via a release) or urgent `hotfix/*` branches.
- Every merge into `main` should be tagged (e.g. `v1.0.0`).

### `develop`
- The **integration branch** — where finished features come together before release.
- Should always build and run, but may contain unreleased features.
- `feature/*` branches are created from `develop` and merged back into `develop`.
- Periodically, `develop` is merged into `main` to create a release.

### `feature/*`
- One branch per task, e.g. `feature/hotel-search`, `feature/wishlist-page`, `feature/auth-context`.
- Branched off the latest `develop`.
- Merged back into `develop` via a Pull Request once done and reviewed.
- Deleted after merging.

### Optional extra branches
| Branch | When to use |
|---|---|
| `hotfix/*` | Urgent fix needed directly in production. Branch from `main`, merge into **both** `main` and `develop`. |
| `bugfix/*` | Non-urgent fix for something already in `develop`. Same flow as `feature/*`. |
| `release/*` | Freeze branch before shipping — only bug fixes and version bumps allowed, then merged into both `main` and `develop`. |

### Example flow for EasyTrip
1. You're building the Hotels page → branch `feature/hotels-page` from `develop`.
2. Work, commit, push.
3. Open a Pull Request into `develop`.
4. Teammate reviews → merge into `develop`.
5. When enough features are ready → merge `develop` into `main` and tag a release.

---

## 3. Git Command Reference

### Setup / cloning
```bash
git clone <repo-url>              # Clone the repository
cd EasyTrip                       # Move into the project folder
git status                        # Check current branch & changed files
```

### Branching
```bash
git branch                              # List local branches
git branch -a                           # List all branches (local + remote)
git checkout develop                    # Switch to develop branch
git checkout -b feature/hotels-page     # Create + switch to a new branch (from current branch)
git checkout main                       # Switch back to main
git branch -d feature/hotels-page       # Delete a local branch (after it's merged)
git push origin --delete feature/hotels-page  # Delete the branch on remote
```

### Staging & committing
```bash
git add .                          # Stage all changed files
git add src/pages/Hotels           # Stage a specific folder/file
git commit -m "feat: add hotel search UI"   # Commit staged changes
git commit --amend                 # Edit the last commit message
```

### Pushing & pulling
```bash
git push origin feature/hotels-page       # Push a new branch to remote for the first time
git push -u origin feature/hotels-page    # Same, but sets upstream tracking (only needed once)
git push                                  # Push after upstream is set
git pull origin develop                   # Pull latest changes from develop into current branch
git fetch                                 # Download remote changes without merging
```

### Merging
```bash
git checkout develop                # Go to the branch you want to merge INTO
git pull origin develop             # Make sure it's up to date
git merge feature/hotels-page       # Merge feature branch into develop
git push origin develop             # Push the merged result
```

### Rebasing (alternative to merge, keeps history linear)
```bash
git checkout feature/hotels-page
git rebase develop                  # Replay your commits on top of latest develop
git push --force-with-lease         # Needed after a rebase (rewrites history)
```

### Resolving merge conflicts
```bash
git merge feature/hotels-page
# Git will pause and mark conflicted files like this inside the file:
# <<<<<<< HEAD
# your current branch's code
# =======
# incoming branch's code
# >>>>>>> feature/hotels-page

# 1. Open each conflicted file and manually edit it to the correct final version
# 2. Remove the <<<<<<<, =======, >>>>>>> markers
git add <resolved-file>              # Mark the conflict as resolved
git commit                           # Finish the merge commit
# If things go wrong and you want to bail out entirely:
git merge --abort
```

### Undoing things
```bash
git restore <file>                  # Discard uncommitted changes to a file
git reset --soft HEAD~1             # Undo last commit, keep changes staged
git reset --hard HEAD~1             # Undo last commit AND discard changes (careful!)
git revert <commit-hash>            # Create a new commit that undoes a specific commit (safe for shared branches)
```

### Checking history
```bash
git log --oneline --graph --all     # Compact visual history of all branches
git diff                            # See unstaged changes
git diff --staged                   # See staged changes not yet committed
```

### Tagging a release (for `main`)
```bash
git tag -a v1.0.0 -m "First production release"
git push origin v1.0.0
```

---

## 4. Recommended day-to-day workflow

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-task
# ...work, commit as you go...
git push -u origin feature/my-task
# open a Pull Request: feature/my-task -> develop
# after approval & merge:
git checkout develop
git pull origin develop
git branch -d feature/my-task
```