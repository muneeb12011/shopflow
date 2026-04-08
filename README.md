<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ShopFlow — README</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --green:        #1e4d35;
    --green-mid:    #2a6b48;
    --green-bright: #3a9962;
    --green-glow:   rgba(58,153,98,0.12);
    --amber:        #c9933a;
    --amber-light:  #e8b86a;
    --amber-dim:    rgba(201,147,58,0.35);
    --bg:           #090e0b;
    --bg-card:      rgba(255,255,255,0.025);
    --bg-code:      rgba(0,0,0,0.4);
    --border:       rgba(255,255,255,0.07);
    --border-green: rgba(58,153,98,0.2);
    --text:         #f0f4f1;
    --text-muted:   rgba(240,244,241,0.45);
    --text-dim:     rgba(240,244,241,0.22);
    --font-h:       'Syne', sans-serif;
    --font-b:       'Plus Jakarta Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-b);
    font-size: 15px;
    line-height: 1.8;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::selection { background: rgba(201,147,58,0.3); color: #fff; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--amber); border-radius: 2px; }

  /* ── GRID BG ── */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(58,153,98,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(58,153,98,0.03) 1px, transparent 1px);
    background-size: 64px 64px;
  }

  /* ── WRAPPER ── */
  .wrap { max-width: 900px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }

  /* ── HERO ── */
  .hero {
    padding: 80px 0 64px;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .hero::after {
    content: '';
    position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--amber-dim), transparent);
  }

  .hero-eyebrow {
    display: flex; align-items: center; gap: 12px; margin-bottom: 28px;
  }
  .hero-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--green-bright);
    box-shadow: 0 0 10px rgba(58,153,98,0.7);
    animation: pulse 2.4s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 10px rgba(58,153,98,0.7); }
    50%      { box-shadow: 0 0 20px rgba(58,153,98,0.3); }
  }
  .hero-eyebrow-text {
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--text-dim); font-family: var(--font-b);
  }

  .hero-title {
    font-family: var(--font-h);
    font-size: clamp(52px, 7vw, 86px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -2px;
    color: #fff;
    margin-bottom: 6px;
  }
  .hero-title span { color: var(--amber); }

  .hero-sub {
    font-family: var(--font-h);
    font-size: clamp(14px, 2vw, 18px);
    font-weight: 400;
    color: var(--text-muted);
    letter-spacing: 1px;
    margin-bottom: 36px;
  }

  .hero-desc {
    font-size: 15px;
    color: rgba(240,244,241,0.5);
    max-width: 600px;
    line-height: 1.9;
    margin-bottom: 40px;
  }

  /* badges */
  .badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 48px; }
  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; letter-spacing: 1px; font-weight: 500;
    padding: 5px 13px;
    border-radius: 2px;
    font-family: var(--font-b);
  }
  .badge-green  { background: rgba(30,77,53,0.55);  border: 1px solid rgba(58,153,98,0.3);  color: #6fcf97; }
  .badge-amber  { background: rgba(80,54,10,0.55);  border: 1px solid rgba(201,147,58,0.3); color: var(--amber-light); }
  .badge-gray   { background: rgba(255,255,255,0.04); border: 1px solid var(--border);       color: var(--text-muted); }
  .badge-dot    { width: 5px; height: 5px; border-radius: 50%; }
  .badge-dot-g  { background: #6fcf97; }
  .badge-dot-a  { background: var(--amber-light); }

  .hero-stats {
    display: flex; gap: 40px; padding-top: 32px;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .hero-stat-val {
    font-family: var(--font-h); font-size: 32px; font-weight: 700;
    color: var(--amber); line-height: 1;
  }
  .hero-stat-lbl {
    font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--text-dim); margin-top: 5px;
  }

  /* ── SECTIONS ── */
  section { padding: 64px 0; border-bottom: 1px solid var(--border); }
  section:last-child { border-bottom: none; }

  .sec-label {
    display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
  }
  .sec-label-num {
    font-family: var(--font-h); font-size: 12px; color: var(--amber);
    letter-spacing: 3px; font-weight: 600;
  }
  .sec-label-line { width: 32px; height: 1px; background: var(--amber-dim); flex-shrink: 0; }
  .sec-label-text {
    font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
    color: var(--text-dim);
  }

  h2 {
    font-family: var(--font-h);
    font-size: clamp(26px, 3.5vw, 38px);
    font-weight: 700; color: #fff;
    letter-spacing: -0.5px; line-height: 1.1;
    margin-bottom: 8px;
  }
  h2 em { color: var(--amber); font-style: normal; }

  .sec-intro {
    font-size: 15px; color: var(--text-muted);
    max-width: 560px; line-height: 1.9; margin-bottom: 40px;
  }

  /* ── TECH STACK ── */
  .stack-group { margin-bottom: 36px; }
  .stack-group-label {
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .stack-group-label::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
  .stack-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; }
  .stack-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    transition: border-color .2s, background .2s;
  }
  .stack-item:hover { border-color: var(--border-green); background: var(--green-glow); }
  .stack-icon {
    width: 28px; height: 28px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(58,153,98,0.08); border: 1px solid var(--border-green);
    font-size: 13px;
  }
  .stack-name { font-size: 13px; font-weight: 600; color: #fff; line-height: 1.2; }
  .stack-role { font-size: 11px; color: var(--text-dim); margin-top: 2px; }

  /* ── COMPARISON TABLE ── */
  .cmp-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
  .cmp-table th {
    font-family: var(--font-h); font-size: 12px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--text-dim); padding: 10px 16px; text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .cmp-table th:nth-child(2) { color: var(--green-bright); }
  .cmp-table td {
    padding: 12px 16px; font-size: 13px; color: var(--text-muted);
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .cmp-table tr:hover td { background: rgba(255,255,255,0.015); }
  .cmp-table td:first-child { color: var(--text-dim); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
  .cmp-table td:nth-child(2) { color: rgba(240,244,241,0.75); }
  .cmp-winner {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; color: var(--green-bright); letter-spacing: 1px;
    background: rgba(58,153,98,0.08); border: 1px solid var(--border-green);
    padding: 4px 12px;
  }

  /* ── FILE TREE ── */
  .file-tree {
    background: var(--bg-code);
    border: 1px solid var(--border);
    border-left: 2px solid var(--green-mid);
    padding: 24px 28px;
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
    font-size: 13px;
    line-height: 2;
    overflow-x: auto;
  }
  .tree-dir  { color: var(--amber-light); font-weight: 600; }
  .tree-file { color: rgba(240,244,241,0.55); }
  .tree-comment { color: rgba(240,244,241,0.25); font-style: italic; }

  /* ── STEPS ── */
  .steps { display: flex; flex-direction: column; gap: 2px; }
  .step {
    display: grid; grid-template-columns: 52px 1fr;
    gap: 20px; align-items: start;
    padding: 24px 20px;
    background: var(--bg-card); border: 1px solid var(--border);
    transition: border-color .25s;
  }
  .step:hover { border-color: var(--border-green); }
  .step-num {
    font-family: var(--font-h); font-size: 36px; font-weight: 700;
    color: var(--amber); opacity: 0.25; line-height: 1; padding-top: 2px;
  }
  .step-title {
    font-family: var(--font-h); font-size: 17px; font-weight: 700;
    color: #fff; margin-bottom: 6px;
  }
  .step-body { font-size: 14px; color: var(--text-muted); line-height: 1.8; }

  /* ── CODE BLOCKS ── */
  .code-block {
    position: relative;
    background: var(--bg-code);
    border: 1px solid var(--border);
    padding: 20px 24px;
    margin: 14px 0;
    overflow-x: auto;
  }
  .code-block::before {
    content: attr(data-lang);
    position: absolute; top: 10px; right: 14px;
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--text-dim); font-family: var(--font-b);
  }
  .code-block code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 13px; line-height: 1.8;
    color: rgba(240,244,241,0.7);
    white-space: pre;
    display: block;
  }
  .code-block code .c-green  { color: #6fcf97; }
  .code-block code .c-amber  { color: var(--amber-light); }
  .code-block code .c-dim    { color: var(--text-dim); }
  .code-block code .c-string { color: #9ddcb0; }

  /* ── ENV TABLE ── */
  .env-table { width: 100%; border-collapse: collapse; }
  .env-table th {
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--text-dim); padding: 8px 14px; text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .env-table td {
    padding: 11px 14px; font-size: 13px;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    vertical-align: top;
  }
  .env-table tr:hover td { background: rgba(255,255,255,0.015); }
  .env-key {
    font-family: 'SF Mono','Fira Code',monospace;
    font-size: 12px; color: var(--amber-light);
  }
  .env-req-yes {
    display: inline-block; font-size: 10px; letter-spacing: 1px;
    background: rgba(58,153,98,0.12); border: 1px solid var(--border-green);
    color: #6fcf97; padding: 2px 8px;
  }
  .env-req-no {
    display: inline-block; font-size: 10px; letter-spacing: 1px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    color: var(--text-dim); padding: 2px 8px;
  }
  .env-desc { font-size: 13px; color: var(--text-muted); }

  /* ── API TABLE ── */
  .api-table { width: 100%; border-collapse: collapse; }
  .api-table th {
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--text-dim); padding: 8px 14px; text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .api-table td {
    padding: 10px 14px; font-size: 13px;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }
  .api-table tr:hover td { background: rgba(255,255,255,0.015); }
  .method {
    display: inline-block; font-size: 10px; font-weight: 700;
    letter-spacing: 1px; padding: 2px 8px; font-family: 'SF Mono','Fira Code',monospace;
  }
  .m-get    { background: rgba(30,77,53,0.5);  border: 1px solid rgba(58,153,98,0.3);  color: #6fcf97; }
  .m-post   { background: rgba(80,54,10,0.5);  border: 1px solid rgba(201,147,58,0.3); color: var(--amber-light); }
  .m-patch  { background: rgba(60,40,100,0.5); border: 1px solid rgba(139,126,168,0.3); color: #c4b5e0; }
  .m-delete { background: rgba(80,20,20,0.5);  border: 1px solid rgba(200,70,70,0.3);  color: #e08080; }
  .ep-path {
    font-family: 'SF Mono','Fira Code',monospace;
    font-size: 12px; color: rgba(240,244,241,0.65);
  }
  .ep-desc { font-size: 13px; color: var(--text-muted); }

  /* ── FEATURE GRID ── */
  .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .feature-item {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 18px 20px;
    background: var(--bg-card); border: 1px solid var(--border);
    transition: border-color .2s, background .2s;
  }
  .feature-item:hover { border-color: var(--border-green); background: var(--green-glow); }
  .feature-icon {
    width: 32px; height: 32px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; background: rgba(201,147,58,0.08);
    border: 1px solid rgba(201,147,58,0.2);
  }
  .feature-name { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 3px; }
  .feature-desc { font-size: 12px; color: var(--text-dim); line-height: 1.6; }

  /* ── HOST CARDS ── */
  .host-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-top: 20px; }
  .host-card {
    padding: 20px; background: var(--bg-card); border: 1px solid var(--border);
    text-align: center; transition: border-color .2s;
  }
  .host-card:hover { border-color: var(--border-green); }
  .host-name { font-family: var(--font-h); font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .host-desc { font-size: 12px; color: var(--text-dim); }
  .host-free {
    display: inline-block; margin-top: 10px;
    font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
    background: rgba(58,153,98,0.1); border: 1px solid var(--border-green);
    color: #6fcf97; padding: 3px 10px;
  }

  /* ── FOOTER ── */
  .footer {
    padding: 48px 0 64px;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 20px;
  }
  .footer-brand { font-family: var(--font-h); font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -1px; }
  .footer-brand span { color: var(--amber); }
  .footer-sub { font-size: 12px; color: var(--text-dim); margin-top: 4px; letter-spacing: 1px; }
  .footer-copy { font-size: 11px; color: var(--text-dim); letter-spacing: 2px; text-transform: uppercase; }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .wrap { padding: 0 20px; }
    .feature-grid { grid-template-columns: 1fr; }
    .host-cards { grid-template-columns: 1fr; }
    .stack-grid { grid-template-columns: 1fr 1fr; }
    .hero-stats { gap: 24px; }
    .step { grid-template-columns: 40px 1fr; }
    .step-num { font-size: 28px; }
  }
</style>
</head>
<body>

<!-- ═══ HERO ═══════════════════════════════════════════════════ -->
<div class="wrap">
  <header class="hero">
    <div class="hero-eyebrow">
      <div class="hero-dot"></div>
      <span class="hero-eyebrow-text">Open Source · MIT License · Vercel Ready</span>
    </div>

    <h1 class="hero-title">Shop<span>Flow</span></h1>
    <p class="hero-sub">Animated E-Commerce Store — React + Express + PostgreSQL</p>
    <p class="hero-desc">
      A fully animated, production-ready e-commerce storefront. Built with React 19 and Framer Motion on the frontend, Express 5 and Drizzle ORM on the backend, deployed as a serverless monorepo on Vercel with PostgreSQL on Neon or Supabase.
    </p>

    <div class="badges">
      <span class="badge badge-green"><span class="badge-dot badge-dot-g"></span>React 19</span>
      <span class="badge badge-amber"><span class="badge-dot badge-dot-a"></span>Express 5</span>
      <span class="badge badge-gray">TypeScript</span>
      <span class="badge badge-gray">Tailwind CSS v4</span>
      <span class="badge badge-gray">Framer Motion</span>
      <span class="badge badge-gray">Drizzle ORM</span>
      <span class="badge badge-green"><span class="badge-dot badge-dot-g"></span>Vercel</span>
      <span class="badge badge-amber"><span class="badge-dot badge-dot-a"></span>PostgreSQL</span>
    </div>

    <div class="hero-stats">
      <div>
        <div class="hero-stat-val">42</div>
        <div class="hero-stat-lbl">Products</div>
      </div>
      <div>
        <div class="hero-stat-val">7</div>
        <div class="hero-stat-lbl">Categories</div>
      </div>
      <div>
        <div class="hero-stat-val">10</div>
        <div class="hero-stat-lbl">API Endpoints</div>
      </div>
      <div>
        <div class="hero-stat-val">8+</div>
        <div class="hero-stat-lbl">Pages</div>
      </div>
    </div>
  </header>


  <!-- ═══ TECH STACK ══════════════════════════════════════════ -->
  <section>
    <div class="sec-label">
      <span class="sec-label-num">01</span>
      <span class="sec-label-line"></span>
      <span class="sec-label-text">Technology</span>
    </div>
    <h2>Tech <em>Stack</em></h2>
    <p class="sec-intro">A carefully chosen set of modern tools — each picked for a reason, not just because they're popular.</p>

    <div class="stack-group">
      <div class="stack-group-label">Frontend · artifacts/shop</div>
      <div class="stack-grid">
        <div class="stack-item"><div class="stack-icon">⚛</div><div><div class="stack-name">React 19</div><div class="stack-role">UI Framework</div></div></div>
        <div class="stack-item"><div class="stack-icon">⚡</div><div><div class="stack-name">Vite 7</div><div class="stack-role">Build tool & dev server</div></div></div>
        <div class="stack-item"><div class="stack-icon">TS</div><div><div class="stack-name">TypeScript</div><div class="stack-role">Full type safety</div></div></div>
        <div class="stack-item"><div class="stack-icon">🌊</div><div><div class="stack-name">Tailwind CSS v4</div><div class="stack-role">Utility-first styling</div></div></div>
        <div class="stack-item"><div class="stack-icon">🎞</div><div><div class="stack-name">Framer Motion</div><div class="stack-role">Animations & interactions</div></div></div>
        <div class="stack-item"><div class="stack-icon">🔁</div><div><div class="stack-name">TanStack Query</div><div class="stack-role">Server state management</div></div></div>
        <div class="stack-item"><div class="stack-icon">🗺</div><div><div class="stack-name">Wouter</div><div class="stack-role">Lightweight routing</div></div></div>
        <div class="stack-item"><div class="stack-icon">◉</div><div><div class="stack-name">Radix UI</div><div class="stack-role">Accessible UI primitives</div></div></div>
      </div>
    </div>

    <div class="stack-group">
      <div class="stack-group-label">Backend · artifacts/api-server</div>
      <div class="stack-grid">
        <div class="stack-item"><div class="stack-icon">🟢</div><div><div class="stack-name">Node.js + Express 5</div><div class="stack-role">HTTP server & routing</div></div></div>
        <div class="stack-item"><div class="stack-icon">💧</div><div><div class="stack-name">Drizzle ORM</div><div class="stack-role">Type-safe SQL ORM</div></div></div>
        <div class="stack-item"><div class="stack-icon">🐘</div><div><div class="stack-name">PostgreSQL</div><div class="stack-role">Relational database</div></div></div>
        <div class="stack-item"><div class="stack-icon">🛡</div><div><div class="stack-name">Zod</div><div class="stack-role">Runtime schema validation</div></div></div>
        <div class="stack-item"><div class="stack-icon">📋</div><div><div class="stack-name">Pino</div><div class="stack-role">Structured JSON logging</div></div></div>
        <div class="stack-item"><div class="stack-icon">📦</div><div><div class="stack-name">esbuild</div><div class="stack-role">Serverless bundler</div></div></div>
      </div>
    </div>

    <div class="stack-group">
      <div class="stack-group-label">Infrastructure</div>
      <div class="stack-grid">
        <div class="stack-item"><div class="stack-icon">▲</div><div><div class="stack-name">Vercel</div><div class="stack-role">Hosting (static + serverless)</div></div></div>
        <div class="stack-item"><div class="stack-icon">🗂</div><div><div class="stack-name">pnpm Workspaces</div><div class="stack-role">Monorepo management</div></div></div>
        <div class="stack-item"><div class="stack-icon">⚡</div><div><div class="stack-name">Neon / Supabase</div><div class="stack-role">Serverless PostgreSQL</div></div></div>
      </div>
    </div>
  </section>


  <!-- ═══ DATABASE CHOICE ══════════════════════════════════ -->
  <section>
    <div class="sec-label">
      <span class="sec-label-num">02</span>
      <span class="sec-label-line"></span>
      <span class="sec-label-text">Database</span>
    </div>
    <h2>Why <em>PostgreSQL</em>?</h2>
    <p class="sec-intro">PostgreSQL is the right database for ShopFlow. Here's why — and how it compares to MongoDB Atlas.</p>

    <table class="cmp-table">
      <thead>
        <tr>
          <th></th>
          <th>✦ PostgreSQL <span class="cmp-winner">Recommended</span></th>
          <th>MongoDB Atlas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data Model</td>
          <td>Relational — products → categories, cart → products</td>
          <td>Document — no native JOINs</td>
        </tr>
        <tr>
          <td>Queries</td>
          <td>SQL JOINs, ILIKE search, foreign key constraints</td>
          <td>$lookup aggregation pipelines</td>
        </tr>
        <tr>
          <td>ORM</td>
          <td>Drizzle ORM — type-safe SQL, already wired</td>
          <td>Mongoose — requires full rewrite</td>
        </tr>
        <tr>
          <td>Vercel Hosting</td>
          <td>Neon / Supabase — native Vercel integration, free tier</td>
          <td>Atlas free tier works, adds latency</td>
        </tr>
        <tr>
          <td>Best For</td>
          <td>Structured, relational data with predictable queries</td>
          <td>Flexible, document-heavy schemas</td>
        </tr>
      </tbody>
    </table>

    <p style="font-size:14px; color:var(--text-muted); margin-bottom:20px;">
      Every query in ShopFlow joins tables — products join categories, cart items join products. PostgreSQL handles this natively. Switching to MongoDB would require rewriting all queries, replacing Drizzle ORM, and restructuring the schema from scratch.
    </p>

    <div class="host-cards">
      <div class="host-card">
        <div class="host-name">Neon.tech</div>
        <div class="host-desc">Serverless Postgres with native Vercel integration</div>
        <div class="host-free">Recommended</div>
      </div>
      <div class="host-card">
        <div class="host-name">Supabase</div>
        <div class="host-desc">Full Postgres with dashboard — 500MB free tier</div>
        <div class="host-free">Free Tier</div>
      </div>
      <div class="host-card">
        <div class="host-name">CockroachDB</div>
        <div class="host-desc">Distributed Postgres — free tier available</div>
        <div class="host-free">Free Tier</div>
      </div>
    </div>
  </section>


  <!-- ═══ FILE STRUCTURE ═══════════════════════════════════ -->
  <section>
    <div class="sec-label">
      <span class="sec-label-num">03</span>
      <span class="sec-label-line"></span>
      <span class="sec-label-text">Structure</span>
    </div>
    <h2>Project <em>Structure</em></h2>
    <p class="sec-intro">A clean monorepo layout with a clear separation between frontend, backend, and shared libraries.</p>

    <div class="file-tree">
<code><span class="tree-dir">shopflow/</span>
├── <span class="tree-dir">artifacts/</span>
│   ├── <span class="tree-dir">shop/</span>                  <span class="tree-comment"># React + Vite frontend</span>
│   │   └── <span class="tree-dir">src/</span>
│   │       ├── <span class="tree-dir">components/</span>    <span class="tree-comment"># Navbar, Layout, ProductCard…</span>
│   │       ├── <span class="tree-dir">pages/</span>         <span class="tree-comment"># Home, Products, Cart, Detail…</span>
│   │       ├── <span class="tree-dir">hooks/</span>         <span class="tree-comment"># useTheme, useCart…</span>
│   │       └── <span class="tree-file">index.css</span>      <span class="tree-comment"># Tailwind + design tokens</span>
│   └── <span class="tree-dir">api-server/</span>            <span class="tree-comment"># Express backend</span>
│       └── <span class="tree-dir">src/</span>
│           ├── <span class="tree-dir">routes/</span>        <span class="tree-comment"># products, categories, cart, health</span>
│           ├── <span class="tree-dir">lib/</span>           <span class="tree-comment"># logger (Pino)</span>
│           └── <span class="tree-file">app.ts</span>         <span class="tree-comment"># Express app (no listen — serverless)</span>
├── <span class="tree-dir">lib/</span>
│   ├── <span class="tree-dir">db/</span>                    <span class="tree-comment"># Drizzle schema + PostgreSQL client</span>
│   ├── <span class="tree-dir">api-client-react/</span>      <span class="tree-comment"># Typed API client (TanStack Query)</span>
│   └── <span class="tree-dir">api-zod/</span>               <span class="tree-comment"># Shared Zod schemas</span>
├── <span class="tree-dir">api/</span>
│   └── <span class="tree-file">index.js</span>               <span class="tree-comment"># Vercel serverless entry point</span>
├── <span class="tree-file">vercel.json</span>                <span class="tree-comment"># Vercel deployment config</span>
├── <span class="tree-file">pnpm-workspace.yaml</span>        <span class="tree-comment"># Monorepo workspace config</span>
└── <span class="tree-file">.env.example</span>               <span class="tree-comment"># Environment variable template</span></code>
    </div>
  </section>


  <!-- ═══ LOCAL SETUP ══════════════════════════════════════ -->
  <section>
    <div class="sec-label">
      <span class="sec-label-num">04</span>
      <span class="sec-label-line"></span>
      <span class="sec-label-text">Development</span>
    </div>
    <h2>Local <em>Setup</em></h2>
    <p class="sec-intro">Get the full stack running locally in five steps. You'll need Node.js v20+ and pnpm v9+.</p>

    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <div>
          <div class="step-title">Clone & Install</div>
          <div class="step-body">Clone the repository and install all workspace dependencies.</div>
          <div class="code-block" data-lang="bash">
<code>git clone &lt;your-repo-url&gt; &amp;&amp; cd shopflow

<span class="c-dim"># Windows PowerShell</span>
pnpm install --no-frozen-lockfile

<span class="c-dim"># macOS / Linux</span>
pnpm install</code>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">02</div>
        <div>
          <div class="step-title">Configure Environment</div>
          <div class="step-body">Copy the example env file and fill in your database URL and session secret.</div>
          <div class="code-block" data-lang="bash">
<code><span class="c-dim"># macOS / Linux</span>
cp .env.example .env

<span class="c-dim"># Windows PowerShell</span>
Copy-Item .env.example .env</code>
          </div>
          <div class="code-block" data-lang=".env">
<code><span class="c-amber">DATABASE_URL</span>=<span class="c-string">postgresql://user:password@localhost:5432/shopflow</span>
<span class="c-amber">SESSION_SECRET</span>=<span class="c-string">any-random-string-here</span></code>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">03</div>
        <div>
          <div class="step-title">Set Up the Database</div>
          <div class="step-body">Create the database locally or connect to Neon.tech, then push migrations and seed data.</div>
          <div class="code-block" data-lang="sql">
<code><span class="c-dim">-- Local PostgreSQL only:</span>
<span class="c-green">CREATE DATABASE</span> shopflow;</code>
          </div>
          <div class="code-block" data-lang="bash">
<code>pnpm --filter @workspace/db run db:push
pnpm --filter @workspace/db run db:seed</code>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">04</div>
        <div>
          <div class="step-title">Start the API Server</div>
          <div class="step-body">Run the Express API on port 8080 in one terminal.</div>
          <div class="code-block" data-lang="bash">
<code><span class="c-dim"># macOS / Linux</span>
DATABASE_URL="postgresql://..." pnpm --filter @workspace/api-server run dev

<span class="c-dim"># Windows PowerShell</span>
$env:DATABASE_URL="postgresql://..."
$env:NODE_ENV="development"
pnpm --filter @workspace/api-server run dev</code>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">05</div>
        <div>
          <div class="step-title">Start the Frontend</div>
          <div class="step-body">Open a second terminal and run the Vite dev server on port 3000. The Vite proxy forwards <code style="font-family:monospace;font-size:12px;color:var(--amber-light)">/api/*</code> to the API automatically.</div>
          <div class="code-block" data-lang="bash">
<code>pnpm --filter @workspace/shop run dev

<span class="c-dim"># Open: http://localhost:3000</span></code>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══ VERCEL DEPLOY ════════════════════════════════════ -->
  <section>
    <div class="sec-label">
      <span class="sec-label-num">05</span>
      <span class="sec-label-line"></span>
      <span class="sec-label-text">Deployment</span>
    </div>
    <h2>Deploy to <em>Vercel</em></h2>
    <p class="sec-intro">Push to GitHub, import to Vercel, set two environment variables, and you're live. No extra configuration needed — <code style="font-family:monospace;font-size:13px;color:var(--amber-light)">vercel.json</code> handles everything.</p>

    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <div>
          <div class="step-title">Push to GitHub</div>
          <div class="code-block" data-lang="bash">
<code>git add . &amp;&amp; git commit -m "initial commit" &amp;&amp; git push origin main</code>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">02</div>
        <div>
          <div class="step-title">Import to Vercel</div>
          <div class="step-body">Go to vercel.com → Add New Project → import your GitHub repo. Vercel auto-detects <code style="font-family:monospace;font-size:12px;color:var(--amber-light)">vercel.json</code> — no framework preset needed.</div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">03</div>
        <div>
          <div class="step-title">Set Environment Variables</div>
          <div class="step-body">In Vercel project settings → Environment Variables, add:</div>
          <div style="margin-top:12px; display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; align-items:center; gap:14px; padding:10px 16px; background:var(--bg-code); border:1px solid var(--border);">
              <code style="font-family:monospace;font-size:12px;color:var(--amber-light);min-width:140px">DATABASE_URL</code>
              <span style="font-size:13px;color:var(--text-muted)">Your PostgreSQL connection string (Neon, Supabase…)</span>
            </div>
            <div style="display:flex; align-items:center; gap:14px; padding:10px 16px; background:var(--bg-code); border:1px solid var(--border);">
              <code style="font-family:monospace;font-size:12px;color:var(--amber-light);min-width:140px">SESSION_SECRET</code>
              <span style="font-size:13px;color:var(--text-muted)">Any random string — generate with <code style="font-size:11px">openssl rand -hex 32</code></span>
            </div>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">04</div>
        <div>
          <div class="step-title">Deploy</div>
          <div class="step-body">Click Deploy. Vercel installs dependencies, builds the TypeScript libraries, bundles the Express API as a serverless function, and builds the React frontend to static files. Your app will be live at <code style="font-family:monospace;font-size:12px;color:var(--green-bright)">https://your-project.vercel.app</code></div>
          <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
            <span class="badge badge-green">Frontend — CDN at /</span>
            <span class="badge badge-amber">API — Serverless at /api/*</span>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══ API REFERENCE ════════════════════════════════════ -->
  <section>
    <div class="sec-label">
      <span class="sec-label-num">06</span>
      <span class="sec-label-line"></span>
      <span class="sec-label-text">API</span>
    </div>
    <h2>API <em>Reference</em></h2>
    <p class="sec-intro">All endpoints are prefixed with <code style="font-family:monospace;font-size:13px;color:var(--amber-light)">/api</code> and served from the Vercel serverless function.</p>

    <table class="api-table">
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><span class="method m-get">GET</span></td><td class="ep-path">/api/healthz</td><td class="ep-desc">Health check</td></tr>
        <tr><td><span class="method m-get">GET</span></td><td class="ep-path">/api/products</td><td class="ep-desc">List products — filterable by category, search, price, sort</td></tr>
        <tr><td><span class="method m-get">GET</span></td><td class="ep-path">/api/products/:id</td><td class="ep-desc">Get a single product by ID</td></tr>
        <tr><td><span class="method m-get">GET</span></td><td class="ep-path">/api/products/:id/related</td><td class="ep-desc">Get related products</td></tr>
        <tr><td><span class="method m-get">GET</span></td><td class="ep-path">/api/categories</td><td class="ep-desc">List all categories</td></tr>
        <tr><td><span class="method m-get">GET</span></td><td class="ep-path">/api/cart</td><td class="ep-desc">Get current cart contents</td></tr>
        <tr><td><span class="method m-post">POST</span></td><td class="ep-path">/api/cart/items</td><td class="ep-desc">Add an item to the cart</td></tr>
        <tr><td><span class="method m-patch">PATCH</span></td><td class="ep-path">/api/cart/items/:id</td><td class="ep-desc">Update cart item quantity</td></tr>
        <tr><td><span class="method m-delete">DELETE</span></td><td class="ep-path">/api/cart/items/:id</td><td class="ep-desc">Remove a cart item</td></tr>
        <tr><td><span class="method m-delete">DELETE</span></td><td class="ep-path">/api/cart</td><td class="ep-desc">Clear the entire cart</td></tr>
      </tbody>
    </table>

    <div style="margin-top:28px;">
      <div class="sec-label" style="margin-bottom:12px;">
        <span class="sec-label-text">Query Parameters · GET /api/products</span>
      </div>
      <table class="env-table">
        <thead>
          <tr><th>Param</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td class="env-key">category</td><td style="font-size:12px;color:var(--text-dim)">string</td><td class="env-desc">Filter by category slug, e.g. furniture, lighting</td></tr>
          <tr><td class="env-key">search</td><td style="font-size:12px;color:var(--text-dim)">string</td><td class="env-desc">Full-text search on product name</td></tr>
          <tr><td class="env-key">minPrice</td><td style="font-size:12px;color:var(--text-dim)">number</td><td class="env-desc">Minimum price filter</td></tr>
          <tr><td class="env-key">maxPrice</td><td style="font-size:12px;color:var(--text-dim)">number</td><td class="env-desc">Maximum price filter</td></tr>
          <tr><td class="env-key">sort</td><td style="font-size:12px;color:var(--text-dim)">string</td><td class="env-desc">price_asc · price_desc · newest · rating</td></tr>
          <tr><td class="env-key">featured</td><td style="font-size:12px;color:var(--text-dim)">boolean</td><td class="env-desc">Show only featured products</td></tr>
          <tr><td class="env-key">page</td><td style="font-size:12px;color:var(--text-dim)">number</td><td class="env-desc">Page number for pagination</td></tr>
          <tr><td class="env-key">limit</td><td style="font-size:12px;color:var(--text-dim)">number</td><td class="env-desc">Items per page — default 12</td></tr>
        </tbody>
      </table>
    </div>
  </section>


  <!-- ═══ FEATURES ═════════════════════════════════════════ -->
  <section>
    <div class="sec-label">
      <span class="sec-label-num">07</span>
      <span class="sec-label-line"></span>
      <span class="sec-label-text">Features</span>
    </div>
    <h2>What's <em>Included</em></h2>
    <p class="sec-intro">Everything you'd expect from a production storefront — and a few things you wouldn't.</p>

    <div class="feature-grid">
      <div class="feature-item">
        <div class="feature-icon">✦</div>
        <div><div class="feature-name">Animated Hero</div><div class="feature-desc">Ken Burns zoom, light-bulb glow with pulsing warm-white core, amber mid-ring, volumetric light rays</div></div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">↻</div>
        <div><div class="feature-name">Headline Rotator</div><div class="feature-desc">3 headline pairs cycling with blur-in/out transitions and animated underline</div></div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">☾</div>
        <div><div class="feature-name">Dark / Light Mode</div><div class="feature-desc">Animated Sun/Moon toggle, persisted in localStorage</div></div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🛍</div>
        <div><div class="feature-name">Shopping Cart</div><div class="feature-desc">Add, remove, update quantities with animated badge counter</div></div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🔍</div>
        <div><div class="feature-name">Search & Filter</div><div class="feature-desc">Filter by category, price range, sort order — all wired to the API</div></div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📱</div>
        <div><div class="feature-name">Fully Responsive</div><div class="feature-desc">Mobile hamburger menu, touch-friendly cards, fluid layout breakpoints</div></div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🖼</div>
        <div><div class="feature-name">Product Gallery</div><div class="feature-desc">42 products across 7 categories with real Unsplash images and multi-image galleries</div></div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📄</div>
        <div><div class="feature-name">8+ Pages</div><div class="feature-desc">Home, Products, Product Detail, Cart, Our Story, Journal, Stores, Contact</div></div>
      </div>
    </div>
  </section>


  <!-- ═══ ENV VARS ══════════════════════════════════════════ -->
  <section>
    <div class="sec-label">
      <span class="sec-label-num">08</span>
      <span class="sec-label-line"></span>
      <span class="sec-label-text">Configuration</span>
    </div>
    <h2>Environment <em>Variables</em></h2>

    <table class="env-table">
      <thead>
        <tr><th>Variable</th><th>Required</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td class="env-key">DATABASE_URL</td>
          <td><span class="env-req-yes">Required</span></td>
          <td style="font-size:12px;color:var(--text-dim)">—</td>
          <td class="env-desc">PostgreSQL connection string</td>
        </tr>
        <tr>
          <td class="env-key">SESSION_SECRET</td>
          <td><span class="env-req-yes">Required</span></td>
          <td style="font-size:12px;color:var(--text-dim)">—</td>
          <td class="env-desc">Secret for session signing</td>
        </tr>
        <tr>
          <td class="env-key">PORT</td>
          <td><span class="env-req-no">Optional</span></td>
          <td style="font-size:12px;color:var(--text-dim)">3000 / 8080</td>
          <td class="env-desc">Frontend and API server ports</td>
        </tr>
        <tr>
          <td class="env-key">API_PORT</td>
          <td><span class="env-req-no">Optional</span></td>
          <td style="font-size:12px;color:var(--text-dim)">8080</td>
          <td class="env-desc">API port for Vite proxy in local dev</td>
        </tr>
        <tr>
          <td class="env-key">BASE_PATH</td>
          <td><span class="env-req-no">Optional</span></td>
          <td style="font-size:12px;color:var(--text-dim)">/</td>
          <td class="env-desc">URL base path — set automatically by Replit</td>
        </tr>
        <tr>
          <td class="env-key">NODE_ENV</td>
          <td><span class="env-req-no">Optional</span></td>
          <td style="font-size:12px;color:var(--text-dim)">development</td>
          <td class="env-desc">development or production</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top:20px; padding:18px 20px; background:rgba(58,153,98,0.06); border:1px solid var(--border-green);">
      <div style="font-size:12px;color:var(--green-bright);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">Neon.tech tip</div>
      <div style="font-size:13px;color:var(--text-muted);">In the Neon dashboard → your project → Connect → copy the connection string. Append <code style="font-family:monospace;font-size:12px;color:var(--amber-light)">?sslmode=require</code> at the end if not already present.</div>
    </div>
  </section>


  <!-- ═══ FOOTER ════════════════════════════════════════════ -->
  <footer class="footer">
    <div>
      <div class="footer-brand">Shop<span>Flow</span></div>
      <div class="footer-sub">React 19 · Express 5 · PostgreSQL · Vercel</div>
    </div>
    <div class="footer-copy">MIT License · Open Source</div>
  </footer>

</div>
</body>
</html>