# ShopFlow — Animated E-Commerce Store

A fully animated, production-ready e-commerce product store built with React + Vite on the frontend and Express + PostgreSQL on the backend, deployed as a serverless app on Vercel.

---

## Live Demo

Deploy your own in minutes using the guide below.

---

## Tech Stack

### Frontend (`artifacts/shop`)
| Tool | Purpose |
|------|---------|
| **React 19** | UI framework |
| **Vite 7** | Build tool and dev server |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Page animations, hero effects, micro-interactions |
| **TanStack Query** | Data fetching and server state management |
| **Wouter** | Lightweight client-side routing |
| **Radix UI** | Accessible headless UI primitives |
| **Lucide React** | Icon library |
| **Syne + Plus Jakarta Sans** | Typography (Google Fonts) |

### Backend (`artifacts/api-server`)
| Tool | Purpose |
|------|---------|
| **Node.js + Express 5** | HTTP server and API routing |
| **Drizzle ORM** | Type-safe SQL ORM |
| **PostgreSQL** | Relational database |
| **Zod** | Runtime schema validation |
| **Pino** | Structured JSON logging |
| **esbuild** | Bundler for production and Vercel serverless |

### Infrastructure & Tooling
| Tool | Purpose |
|------|---------|
| **pnpm Workspaces** | Monorepo package management |
| **Vercel** | Hosting (frontend static + backend serverless) |
| **Neon / Supabase** | Serverless PostgreSQL (recommended) |

---

## MongoDB Atlas vs PostgreSQL — Which is Better?

**PostgreSQL is the right choice for this project.** Here's why:

| | PostgreSQL | MongoDB Atlas |
|--|------------|---------------|
| Data model | Relational (products → categories, cart → products) | Document (flexible but no native JOINs) |
| Queries | SQL JOINs, ILIKE search, foreign keys | `$lookup` aggregation pipelines |
| ORM | Drizzle ORM (type-safe SQL) | Mongoose (requires full rewrite) |
| Vercel hosting | Neon / Supabase — free tier, serverless | Atlas free tier works but adds latency |
| Best for | Structured, relational data | Flexible, document-heavy data |

This app uses relational joins in every query (products join categories, cart items join products). PostgreSQL is faster, simpler, and already wired up. Switching to MongoDB would require rewriting all queries, replacing Drizzle ORM, and restructuring the schema.

**Recommended free PostgreSQL hosts for Vercel:**
- [Neon.tech](https://neon.tech) — serverless Postgres, native Vercel integration, generous free tier
- [Supabase](https://supabase.com) — full Postgres with dashboard, 500MB free
- [CockroachDB](https://cockroachlabs.com) — distributed Postgres, free tier available

---

## Project Structure

```
shopflow/
├── artifacts/
│   ├── shop/                  # React + Vite frontend
│   │   ├── src/
│   │   │   ├── components/    # Navbar, Layout, ProductCard, etc.
│   │   │   ├── pages/         # Home, Products, Product Detail, Cart, etc.
│   │   │   ├── hooks/         # useTheme, useCart, etc.
│   │   │   └── index.css      # Tailwind + custom design tokens
│   │   └── vite.config.ts
│   └── api-server/            # Express backend
│       ├── src/
│       │   ├── routes/        # products, categories, cart, health
│       │   ├── lib/           # logger
│       │   └── app.ts         # Express app (no listen — imported by serverless)
│       ├── build.mjs          # Dev/production esbuild bundle
│       └── build-serverless.mjs  # Vercel serverless bundle (app only)
├── lib/
│   ├── db/                    # Drizzle schema + PostgreSQL client
│   ├── api-client-react/      # Auto-generated typed API client (TanStack Query)
│   └── api-zod/               # Shared Zod schemas for API validation
├── api/
│   └── index.js               # Vercel serverless function entry point
├── vercel.json                # Vercel deployment configuration
├── pnpm-workspace.yaml        # Monorepo workspace config
└── .env.example               # Environment variable template
```

---

## Local Development Setup

### Prerequisites

- **Node.js** v20 or later
- **pnpm** v9 or later — install with: `npm install -g pnpm`
- **PostgreSQL** database (local install or cloud — see below)

### 1. Clone the project

```bash
git clone <your-repo-url>
cd shopflow
```

### 2. Install dependencies

**Windows PowerShell:**
```powershell
pnpm install --no-frozen-lockfile
```

**macOS / Linux:**
```bash
pnpm install
```

> The `--no-frozen-lockfile` flag is needed on Windows the first time because the lockfile was generated on Linux. After the first install it regenerates automatically.

### 3. Set up environment variables

Copy the example file and fill in your values:

**Windows PowerShell:**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/shopflow
SESSION_SECRET=any-random-string-here
```

### 4. Set up the database

**Option A — Local PostgreSQL:**
```sql
-- In psql:
CREATE DATABASE shopflow;
```

**Option B — Neon.tech (recommended for cloud):**
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project → copy the connection string
3. Paste it as `DATABASE_URL` in your `.env`

**Run migrations and seed data:**
```bash
pnpm --filter @workspace/db run db:push
pnpm --filter @workspace/db run db:seed
```

> If you don't have a db:seed script, the API server will start with an empty database. Products, categories, and sample data can be inserted via the seed script in `lib/db/`.

### 5. Start the servers

Open **two terminals**:

**Terminal 1 — API server** (port 8080):

*Windows PowerShell:*
```powershell
$env:DATABASE_URL="postgresql://..."
$env:NODE_ENV="development"
pnpm --filter @workspace/api-server run dev
```

*macOS / Linux:*
```bash
DATABASE_URL="postgresql://..." pnpm --filter @workspace/api-server run dev
```

**Terminal 2 — Frontend** (port 3000):
```bash
pnpm --filter @workspace/shop run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The Vite dev server automatically proxies `/api/*` requests to the API server on port 8080.

---

## Vercel Deployment

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "initial commit"
git push origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project** → import your GitHub repo
3. Vercel auto-detects `vercel.json` — no framework preset needed

### Step 3 — Set environment variables

In Vercel project settings → **Environment Variables**, add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string (Neon, Supabase, etc.) |
| `SESSION_SECRET` | Any random string (e.g. `openssl rand -hex 32`) |

**Neon.tech tip:** In the Neon dashboard, go to your project → **Connect** → copy the connection string. Add `?sslmode=require` at the end if not already present.

### Step 4 — Deploy

Click **Deploy**. Vercel will:
1. Install dependencies with `pnpm install --no-frozen-lockfile`
2. Build TypeScript libraries
3. Bundle the Express API as a serverless function (`api/index.js`)
4. Build the React frontend to static files
5. Serve everything from a single Vercel project

**Your app will be live at:** `https://your-project.vercel.app`

- Frontend: served from CDN at `/`
- API: serverless function at `/api/*`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/healthz` | Health check |
| `GET` | `/api/products` | List products (filterable by category, search, price, sort) |
| `GET` | `/api/products/:id` | Get single product |
| `GET` | `/api/products/:id/related` | Get related products |
| `GET` | `/api/categories` | List all categories |
| `GET` | `/api/cart` | Get current cart |
| `POST` | `/api/cart/items` | Add item to cart |
| `PATCH` | `/api/cart/items/:id` | Update cart item quantity |
| `DELETE` | `/api/cart/items/:id` | Remove cart item |
| `DELETE` | `/api/cart` | Clear cart |

### Query parameters for `/api/products`

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category slug (e.g. `furniture`, `lighting`) |
| `search` | string | Full-text search on product name |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `sort` | string | `price_asc`, `price_desc`, `newest`, `rating` |
| `featured` | boolean | Show only featured products |
| `page` | number | Page number for pagination |
| `limit` | number | Items per page (default 12) |

---

## Features

- **Animated hero** — Ken Burns image zoom, light-bulb diffuse glow animation with pulsing warm-white core, amber mid-ring, volumetric light rays
- **Rotating headline swapper** — 3 headline pairs cycling with blur-in/out transitions and animated underline
- **Dark / light mode** — Animated Sun/Moon toggle, persisted in localStorage
- **Product catalog** — 42 products across 7 categories with real Unsplash images and multi-image galleries
- **Shopping cart** — Add/remove/update quantities, animated badge counter
- **Category browsing** — Furniture, Lighting, Electronics, Fashion, Home & Living, Beauty, Sports
- **Search and filter** — By category, price range, sort order
- **Responsive design** — Mobile hamburger menu, touch-friendly cards
- **Multiple pages** — Home, Products, Product Detail, Cart, Our Story, Journal, Stores, Contact

---

## Design Tokens

```css
--primary: 153 44% 21%    /* Emerald green */
--accent:  46 65% 52%     /* Warm amber */
```

- **Serif font:** Syne (headings)
- **Sans font:** Plus Jakarta Sans (body)

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `SESSION_SECRET` | Yes | — | Secret for session signing |
| `PORT` | No | `3000` (frontend), `8080` (API) | Server port |
| `BASE_PATH` | No | `/` | URL base path (set automatically by Replit) |
| `API_PORT` | No | `8080` | API port for Vite proxy in local dev |
| `NODE_ENV` | No | `development` | `development` or `production` |
