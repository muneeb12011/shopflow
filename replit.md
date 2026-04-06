# ShopFlow - Product Store

## Overview

A fully animated e-commerce product store built with React + Vite (frontend) and Express (backend) in a pnpm monorepo.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion + shadcn/ui
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Router**: Wouter

## App Structure

- `artifacts/shop/` — React frontend (product store UI)
- `artifacts/api-server/` — Express backend (REST API)
- `lib/api-spec/openapi.yaml` — OpenAPI contract
- `lib/api-client-react/` — Generated React Query hooks
- `lib/api-zod/` — Generated Zod validation schemas
- `lib/db/` — Drizzle ORM schema and DB connection

## Pages

- `/` — Homepage with animated hero, featured products, category grid, store stats
- `/products` — Product catalog with filters, search, sort
- `/products/:id` — Product detail with image gallery, add to cart, related products
- `/cart` — Shopping cart with quantity controls and subtotal

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/shop run dev` — run frontend locally

## Database Tables

- `categories` — product categories
- `products` — all products (18 seeded items across 5 categories)
- `cart_items` — shopping cart (session-based)

## Features

- Full Framer Motion animations (page transitions, staggered cards, hover effects)
- Deep emerald + warm amber color palette
- Sticky header with animated cart badge
- Product filtering by category, price range, search
- Product sorting (newest, popular, price)
- Add/remove/update cart items
- Related products on detail page
- Store stats dashboard on homepage
