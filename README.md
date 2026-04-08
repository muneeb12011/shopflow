# ShopFlow — E-Commerce Store

> React 19 · Express 5 · PostgreSQL · Vercel

A fully animated, production-ready e-commerce storefront. Built with React 19 and Framer Motion on the frontend, Express 5 and Drizzle ORM on the backend, deployed as a serverless monorepo on Vercel with PostgreSQL on Neon or Supabase.

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## Stats

| Products | Categories | API Endpoints | Pages |
|----------|------------|---------------|-------|
| 32+      | 6          | 10            | 8+    |

---

## Tech Stack

### Frontend · `artifacts/shop`

| Tool | Role |
|------|------|
| React 19 | UI Framework |
| Vite 7 | Build tool & dev server |
| TypeScript | Full type safety |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & interactions |
| TanStack Query | Server state management |
| Wouter | Lightweight routing |
| Radix UI | Accessible UI primitives |

### Backend · `artifacts/api-server`

| Tool | Role |
|------|------|
| Node.js + Express 5 | HTTP server & routing |
| Drizzle ORM | Type-safe SQL ORM |
| PostgreSQL | Relational database |
| Zod | Runtime schema validation |
| Pino | Structured JSON logging |
| esbuild | Serverless bundler |

### Infrastructure

| Tool | Role |
|------|------|
| Vercel | Hosting (static + serverless) |
| pnpm Workspaces | Monorepo management |
| Neon / Supabase | Serverless PostgreSQL |

---

## Why PostgreSQL?

PostgreSQL is the right database for ShopFlow — products join categories, cart items join products. It handles this natively with SQL JOINs, ILIKE search, and foreign key constraints.

| | PostgreSQL ✦ | MongoDB Atlas |
|---|---|---|
| Data Model | Relational — native JOINs | Document — no native JOINs |
| ORM | Drizzle ORM — already wired | Mongoose — full rewrite needed |
| Vercel Hosting | Neon / Supabase — native integration | Atlas free tier, adds latency |
| Best For | Structured relational data | Flexible document schemas |

**Recommended hosts:** [Neon.tech](https://neon.tech) · [Supabase](https://supabase.com) · [CockroachDB](https://cockroachlabs.com)

---

## Project Structure

```
shopflow/
├── artifacts/
│   ├── shop/                  # React + Vite frontend
│   │   └── src/
│   │       ├── components/    # Navbar, Layout, ProductCard…
│   │       ├── pages/         # Home, Products, Cart, Detail…
│   │       ├── hooks/         # useTheme, useCart…
│   │       └── index.css      # Tailwind + design tokens
│   └── api-server/            # Express backend
│       └── src/
│           ├── routes/        # products, categories, cart, health
│           ├── lib/           # logger (Pino)
│           └── app.ts         # Express app (serverless)
├── lib/
│   ├── db/                    # Drizzle schema + PostgreSQL client
│   ├── api-client-react/      # Typed API client (TanStack Query)
│   └── api-zod/               # Shared Zod schemas
├── api/
│   └── index.js               # Vercel serverless entry point
├── vercel.json                 # Vercel deployment config
├── pnpm-workspace.yaml         # Monorepo workspace config
└── .env.example                # Environment variable template
```

---

## Local Setup

You'll need **Node.js v20+** and **pnpm v9+**.

### 1. Clone & Install

```bash
git clone <your-repo-url> && cd shopflow

# Windows PowerShell
pnpm install --no-frozen-lockfile

# macOS / Linux
pnpm install
```

### 2. Configure Environment

```bash
# macOS / Linux
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Fill in your `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/shopflow
SESSION_SECRET=any-random-string-here
PORT=3000
API_PORT=8080
```

### 3. Set Up the Database

```sql
-- Local PostgreSQL only:
CREATE DATABASE shopflow;
```

```bash
pnpm --filter @workspace/db run db:push
pnpm --filter @workspace/db run db:seed
```

### 4. Start the API Server

```powershell
# Windows PowerShell
$env:DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/shopflow"
$env:NODE_ENV="development"
pnpm --filter @workspace/api-server run dev
```

```bash
# macOS / Linux
DATABASE_URL="postgresql://..." pnpm --filter @workspace/api-server run dev
```

### 5. Start the Frontend

```bash
pnpm --filter @workspace/shop run dev

# Open: http://localhost:3000
```

The Vite proxy forwards `/api/*` to the API server automatically.

---

## Deploy to Vercel

### 1. Push to GitHub

```bash
git add . && git commit -m "initial commit" && git push origin main
```

### 2. Import to Vercel

Go to [vercel.com](https://vercel.com) → Add New Project → import your GitHub repo. Vercel auto-detects `vercel.json` — no framework preset needed.

### 3. Set Environment Variables

In Vercel project settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string (Neon, Supabase…) |
| `SESSION_SECRET` | Any random string — generate with `openssl rand -hex 32` |

> **Neon tip:** In the Neon dashboard → your project → Connect → copy the connection string. Append `?sslmode=require` at the end if not already present.

### 4. Deploy

Click Deploy. Your app will be live at `https://your-project.vercel.app`

- **Frontend** — served from CDN at `/`
- **API** — serverless function at `/api/*`

---

## API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/healthz` | Health check |
| `GET` | `/api/products` | List products — filterable by category, search, price, sort |
| `GET` | `/api/products/:id` | Get a single product by ID |
| `GET` | `/api/products/:id/related` | Get related products |
| `GET` | `/api/categories` | List all categories |
| `GET` | `/api/cart` | Get current cart contents |
| `POST` | `/api/cart/items` | Add an item to the cart |
| `PATCH` | `/api/cart/items/:id` | Update cart item quantity |
| `DELETE` | `/api/cart/items/:id` | Remove a cart item |
| `DELETE` | `/api/cart` | Clear the entire cart |

### Query Parameters — `GET /api/products`

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category slug, e.g. `furniture`, `electronics` |
| `search` | string | Full-text search on product name |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `sort` | string | `price_asc` · `price_desc` · `newest` · `rating` |
| `featured` | boolean | Show only featured products |
| `page` | number | Page number for pagination |
| `limit` | number | Items per page — default 12 |

---

## Features

- **Animated Hero** — Ken Burns zoom, light-bulb glow, pulsing warm-white core, volumetric light rays
- **Headline Rotator** — 3 headline pairs cycling with blur-in/out transitions and animated underline
- **Dark / Light Mode** — Animated Sun/Moon toggle, persisted in localStorage
- **Shopping Cart** — Add, remove, update quantities with animated badge counter
- **Search & Filter** — Filter by category, price range, sort order — all wired to the API
- **Fully Responsive** — Mobile hamburger menu, touch-friendly cards, fluid layout breakpoints
- **Product Gallery** — 32+ products across 6 categories with real Unsplash images and multi-image galleries
- **8+ Pages** — Home, Products, Product Detail, Cart, Our Story, Journal, Stores, Contact

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | ✅ Required | — | PostgreSQL connection string |
| `SESSION_SECRET` | ✅ Required | — | Secret for session signing |
| `PORT` | Optional | 3000 | Frontend port |
| `API_PORT` | Optional | 8080 | API server port |
| `BASE_PATH` | Optional | `/` | URL base path |
| `NODE_ENV` | Optional | development | `development` or `production` |

---

## License

MIT License — Open Source
