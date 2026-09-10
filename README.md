# EasyTrip — `develop` Branch

> ⚠️ This is the **development branch**. Code here is actively worked on and may be unstable.
> For the stable, production version, see the `main` branch.

## About

EasyTrip is a travel booking web app (flights, hotels, destinations) built with **React + Vite**.
This branch is the integration point for all in-progress features before they are released to `main`.

## Tech Stack

- React (JSX)
- Vite
- React Router (see `src/routes/`)
- React Context API for state management (`src/context/`)
- ESLint for linting

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url>
cd EasyTrip

# 2. Switch to develop
git checkout develop
git pull origin develop

# 3. Install dependencies
npm install

# 4. Run the dev server
npm run dev
```

The app should now be running locally (Vite will print the local URL, typically `http://localhost:5173`).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

## Project Structure (quick view)

```
src/
├── assets/       # Images & icons
├── components/   # Reusable UI (cards, layouts, loading states)
├── context/      # Global state (Auth, Booking, Wishlist)
├── data/         # Static/mock data
├── pages/        # Route-level screens (Home, Flights, Hotels, Booking, etc.)
├── routes/       # Route definitions
├── utils/        # Helper functions (formatCurrency, formatDate)
├── App.jsx
└── main.jsx
```
See `EasyTrip-PROJECT-GUIDE.md` for a full breakdown of every folder.

## Branching & Contributing

This project follows a `main` → `develop` → `feature/*` workflow.

**To work on a new feature or fix:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description

# ...make your changes...

git add .
git commit -m "feat: describe your change"
git push -u origin feature/short-description
```
Then open a Pull Request targeting **`develop`** (not `main`).

### Branch rules
- ❌ Never commit directly to `main` or `develop`.
- ✅ All work happens on a `feature/*` (or `bugfix/*`) branch.
- ✅ Merge into `develop` only through a reviewed Pull Request.
- ✅ Keep commits small and use clear messages (`feat:`, `fix:`, `chore:`, `docs:`).

## Reporting Issues

If you find a bug on `develop`, open an issue describing:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if UI-related)

## Status

🚧 Active development — features are being merged in continuously. Not guaranteed to be deployment-ready.