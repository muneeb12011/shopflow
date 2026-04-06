import { Layout } from "@/components/layout";
import { useGetFeaturedProducts, useListCategories, useGetProductStats, useListProducts } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product-card";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Star, Zap, Shield, Truck, RotateCcw } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <div ref={ref}>{display}{suffix}</div>;
}

const marqueeItems = [
  "Free shipping over $500",
  "New arrivals weekly",
  "Handcrafted excellence",
  "30-day easy returns",
  "5-year warranty",
  "Curated by designers",
];

const categoryData = [
  {
    name: "Furniture",
    slug: "furniture",
    tagline: "Heirloom pieces for modern living",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900",
    color: "from-amber-950/80",
  },
  {
    name: "Lighting",
    slug: "lighting",
    tagline: "Shape space with light",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=900",
    color: "from-yellow-950/80",
  },
  {
    name: "Electronics",
    slug: "electronics",
    tagline: "Technology, beautifully made",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900",
    color: "from-slate-950/80",
  },
  {
    name: "Fashion",
    slug: "fashion",
    tagline: "Wear what endures",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900",
    color: "from-rose-950/80",
  },
  {
    name: "Beauty",
    slug: "beauty",
    tagline: "Rituals, elevated",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900",
    color: "from-pink-950/80",
  },
];

const trustFeatures = [
  { icon: Truck, title: "Free Delivery", desc: "On all orders over $500" },
  { icon: Shield, title: "5-Year Warranty", desc: "On every product we sell" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free policy" },
  { icon: Zap, title: "Fast Support", desc: "24/7 dedicated assistance" },
];

const heroHeadlines = [
  { line1: "Curated living,", line2: "for the bold." },
  { line1: "Designed for you,", line2: "built to last." },
  { line1: "Less noise,", line2: "more beauty." },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [showSecond, setShowSecond] = useState(false);
  const [started, setStarted] = useState(false);

  // Sequence: line1 in → pause → line2 replaces line1 → pause → next pair
  useEffect(() => {
    const delay1 = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(delay1);
  }, []);

  useEffect(() => {
    if (!started) return;
    // Show line1, after 1.8s swap to line2, after another 2.2s advance headline
    setShowSecond(false);
    const t1 = setTimeout(() => setShowSecond(true), 1800);
    const t2 = setTimeout(() => {
      setHeadlineIdx(i => (i + 1) % heroHeadlines.length);
      setShowSecond(false);
    }, 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [started, headlineIdx]);

  const { data: featuredProducts, isLoading: featuredLoading } = useGetFeaturedProducts();
  const { data: stats } = useGetProductStats();
  const { data: newProducts } = useListProducts({ sort: "newest" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const currentHeadline = heroHeadlines[headlineIdx];

  return (
    <Layout>
      {/* ───── HERO ───── */}
      <section ref={heroRef} className="relative h-[100vh] min-h-[640px] flex items-center overflow-hidden">

        {/* ── Background image with Ken Burns zoom ── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <motion.img
            src={heroBg}
            alt="Luxury boutique"
            className="w-full h-full object-cover origin-center"
            animate={{ scale: [1.08, 1.2] }}
            transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Multi-layer dramatic gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />

          {/* Light sweep shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
          />

          {/* Subtle film grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />
        </motion.div>

        {/* ── Animated orb glows ── */}
        {[
          { w: 500, h: 500, l: "5%", t: "20%", color: "bg-accent/15", dur: 8 },
          { w: 350, h: 350, l: "60%", t: "10%", color: "bg-primary/20", dur: 11 },
          { w: 280, h: 280, l: "30%", t: "60%", color: "bg-white/8", dur: 9 },
          { w: 200, h: 200, l: "80%", t: "55%", color: "bg-accent/10", dur: 7 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${orb.color} blur-3xl pointer-events-none`}
            style={{ width: orb.w, height: orb.h, left: orb.l, top: orb.t }}
            animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
          />
        ))}

        {/* ── Hero content ── */}
        <motion.div style={{ opacity: heroOpacity }} className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl text-white"
          >
            {/* Badge */}
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/12 backdrop-blur-md text-xs font-bold tracking-widest uppercase mb-8 border border-white/20"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              The Winter Collection
            </motion.span>

            {/* ── Swapping headline ── */}
            <motion.div variants={itemVariants} className="mb-8">
              {/* Fixed height container so swap doesn't shift layout */}
              <div className="relative" style={{ minHeight: "clamp(120px, 18vw, 200px)" }}>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`${headlineIdx}-${showSecond ? "b" : "a"}`}
                    initial={{ y: 60, opacity: 0, filter: "blur(12px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -50, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.0] absolute inset-x-0 top-0"
                  >
                    {showSecond ? (
                      <span className="relative inline-block">
                        {currentHeadline.line2}
                        <motion.span
                          className="absolute -bottom-1 left-0 h-[4px] bg-accent rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          style={{ originX: 0 }}
                        />
                      </span>
                    ) : (
                      currentHeadline.line1
                    )}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Headline progress dots */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8">
              {heroHeadlines.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setHeadlineIdx(i); setShowSecond(false); }}
                  className={`h-1 rounded-full transition-all duration-500 ${i === headlineIdx ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                />
              ))}
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/75 mb-10 max-w-lg leading-relaxed">
              Discover our premium collection of minimal, tactile, and confident pieces that elevate your everyday spaces.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/products">
                <motion.span
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(255,255,255,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-white/95 transition-all shadow-2xl cursor-pointer"
                >
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/products?sort=newest">
                <motion.span
                  whileHover={{ scale: 1.04, backgroundColor: "rgba(0,0,0,0.55)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md text-white border border-white/25 px-8 py-4 rounded-full font-bold transition-all cursor-pointer"
                >
                  New Arrivals
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Corner accent lines ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 right-12 z-10 hidden lg:flex flex-col items-end gap-2 text-white/40"
        >
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-medium">
            <motion.div
              className="h-px bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 2, duration: 0.8 }}
            />
            Scroll to explore
          </div>
        </motion.div>

        {/* ── Animated scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ───── MARQUEE ───── */}
      <div className="py-4 bg-primary text-primary-foreground overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-0 whitespace-nowrap"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-sm font-medium tracking-wider uppercase px-8 flex items-center gap-8">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ───── STATS ───── */}
      {stats && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 border-b border-border"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Curated Pieces", value: stats.totalProducts, suffix: "+" },
                { label: "Collections", value: stats.totalCategories, suffix: "" },
                { label: "Featured Drops", value: stats.featuredCount, suffix: "" },
                { label: "Avg Rating", value: parseFloat(stats.avgRating.toFixed(1)), suffix: " / 5" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 transition-transform group-hover:scale-105 duration-300">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ───── FEATURED PRODUCTS ───── */}
      <section className="py-28 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-14"
        >
          <div>
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Handpicked</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">Featured Additions</h2>
            <p className="text-muted-foreground max-w-md">Carefully selected pieces that define the aesthetic of modern living.</p>
          </div>
          <Link href="/products">
            <motion.span
              whileHover={{ x: 4 }}
              className="hidden md:inline-flex items-center gap-2 font-semibold text-primary hover:text-accent transition-colors cursor-pointer text-sm"
            >
              View all <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>

        {featuredLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] bg-muted animate-pulse rounded-2xl" />
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts?.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </section>

      {/* ───── CATEGORIES GRID ───── */}
      <section className="py-24 bg-sidebar border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Browse</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Shop by Category</h2>
          </motion.div>

          {/* Hero pair: Furniture + Lighting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {categoryData.slice(0, 2).map((cat, i) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4 }}
                  className="group relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer shadow-xl"
                >
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-black/20 to-transparent`} />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    >
                      <p className="text-white/70 text-xs uppercase tracking-widest font-medium mb-1">{cat.tagline}</p>
                      <h3 className="text-3xl font-serif font-bold text-white mb-3">{cat.name}</h3>
                      <motion.span
                        className="inline-flex items-center gap-2 text-white/80 text-sm font-medium"
                        whileHover={{ gap: "12px" }}
                      >
                        Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Bottom three */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {categoryData.slice(2).map((cat, i) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4 }}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
                >
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-black/15 to-transparent`} />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">{cat.name}</h3>
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors flex items-center gap-1">
                      Shop now <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── NEW ARRIVALS SPOTLIGHT ───── */}
      <section className="py-28 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-14"
        >
          <div>
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Just dropped</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">New Arrivals</h2>
          </div>
          <Link href="/products?sort=newest">
            <motion.span
              whileHover={{ x: 4 }}
              className="hidden md:inline-flex items-center gap-2 font-semibold text-primary hover:text-accent transition-colors cursor-pointer text-sm"
            >
              See all new <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {newProducts?.filter(p => p.isNew).slice(0, 6).map((product, i) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link href={`/products/${product.id}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary/60"
                >
                  <motion.img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-semibold line-clamp-1">{product.name}</p>
                    <p className="text-accent text-xs font-bold">${product.price}</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───── TRUST BAR ───── */}
      <section className="py-20 bg-sidebar border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center gap-4 group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── LIGHTING SPOTLIGHT ───── */}
      <section className="py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 space-y-6"
            >
              <p className="text-xs font-bold text-accent uppercase tracking-widest">New Collection</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                Light is the{" "}
                <span className="clip-text-gradient">soul of space</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Our lighting collection transforms rooms with carefully crafted pieces — from hand-blown glass pendants to sculptural travertine lamps. Each one designed to cast the perfect mood.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link href="/products?category=lighting">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg cursor-pointer"
                  >
                    Shop Lighting <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 grid grid-cols-2 gap-4"
            >
              {[
                { url: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600", h: "aspect-[3/4]" },
                { url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600", h: "aspect-[3/4] mt-8" },
                { url: "https://images.unsplash.com/photo-1513506003901-1e6a35fb3ac0?w=600", h: "aspect-video" },
                { url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600", h: "aspect-video" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`${img.h} rounded-2xl overflow-hidden shadow-lg`}
                >
                  <img src={img.url} alt="Lighting" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── FURNITURE SPOTLIGHT ───── */}
      <section className="py-28 bg-sidebar border-y border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 grid grid-cols-2 gap-4"
            >
              {[
                { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600", h: "aspect-square" },
                { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600", h: "aspect-square mt-8" },
                { url: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600", h: "aspect-[4/3]" },
                { url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600", h: "aspect-[4/3]" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`${img.h} rounded-2xl overflow-hidden shadow-lg`}
                >
                  <img src={img.url} alt="Furniture" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 space-y-6"
            >
              <p className="text-xs font-bold text-accent uppercase tracking-widest">Heirloom Quality</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                Furniture that{" "}
                <span className="clip-text-gradient">outlives trends</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Solid oak, walnut, and marble — sourced responsibly and crafted by hand. Every joint, every grain tells a story. Pieces built to last generations.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link href="/products?category=furniture">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg cursor-pointer"
                  >
                    Shop Furniture <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── BOTTOM CTA ───── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 pointer-events-none"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              right: `-${i * 60}px`,
              top: `${-80 + i * 60}px`,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4"
          >
            Join 12,000+ customers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight"
          >
            Elevate your everyday.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg mb-10 max-w-xl mx-auto"
          >
            Discover the full collection and find pieces that speak to you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/products">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white text-primary px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-white/95 transition-colors cursor-pointer"
              >
                Browse the Collection <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
}
