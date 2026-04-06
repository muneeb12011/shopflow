import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { useSearch, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SlidersHorizontal, Search, X, ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function Products() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const categoryParam = searchParams.get("category") || undefined;

  const [sort, setSort] = useState<any>("popular");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: products, isLoading } = useListProducts({
    category: categoryParam,
    sort,
    search: search || undefined,
  });
  const { data: categories } = useListCategories();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  return (
    <Layout>
      {/* Header banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-sidebar py-16 border-b border-border relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-bold text-accent uppercase tracking-widest mb-3"
          >
            {categoryParam ? "Collection" : "All Products"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4 capitalize"
          >
            {categoryParam?.replace("-", " ") || "Everything"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-sm"
          >
            {products ? `${products.length} pieces, thoughtfully curated` : "Discover our complete collection"}
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: -20, width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full md:w-56 lg:w-64 flex-shrink-0 overflow-hidden"
            >
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </h3>

                  {/* Search */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full bg-secondary/60 border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    {search && (
                      <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    )}
                  </div>

                  {/* Categories */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Category</p>
                    <ul className="space-y-1">
                      <li>
                        <Link href="/products">
                          <motion.span
                            whileHover={{ x: 3 }}
                            className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm cursor-pointer transition-colors ${!categoryParam ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/70 hover:bg-secondary hover:text-primary'}`}
                          >
                            All Categories
                            <span className="text-xs opacity-60">{categories?.reduce((s, c) => s + c.productCount, 0)}</span>
                          </motion.span>
                        </Link>
                      </li>
                      {categories?.map((cat, i) => (
                        <motion.li
                          key={cat.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link href={`/products?category=${cat.slug}`}>
                            <motion.span
                              whileHover={{ x: 3 }}
                              className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm cursor-pointer transition-colors ${categoryParam === cat.slug ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/70 hover:bg-secondary hover:text-primary'}`}
                            >
                              {cat.name}
                              <span className="text-xs opacity-60">{cat.productCount}</span>
                            </motion.span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main grid */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors bg-secondary/60 px-4 py-2 rounded-xl border border-border"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {sidebarOpen ? "Hide" : "Show"} Filters
              </motion.button>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{products?.length || 0}</span> results
              </p>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-secondary/60 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-8 cursor-pointer font-medium transition-all"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Active filter chips */}
          {(categoryParam || search) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {categoryParam && (
                <Link href="/products">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full cursor-pointer hover:bg-primary/20 transition-colors capitalize">
                    {categoryParam} <X className="w-3 h-3" />
                  </span>
                </Link>
              )}
              {search && (
                <button onClick={() => setSearch("")} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full hover:bg-primary/20 transition-colors">
                  "{search}" <X className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          )}

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-3">
                  <div className="aspect-[4/5] bg-muted animate-pulse rounded-2xl" />
                  <div className="h-3.5 bg-muted animate-pulse rounded w-2/3" />
                  <div className="h-3.5 bg-muted animate-pulse rounded w-1/3" />
                </div>
              ))}
            </motion.div>
          ) : products?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-sidebar rounded-3xl border border-border"
            >
              <div className="text-6xl mb-6 opacity-20">✕</div>
              <h3 className="text-2xl font-serif font-bold mb-3">Nothing found</h3>
              <p className="text-muted-foreground mb-8 text-sm">Try different filters or browse all products.</p>
              <Link href="/products">
                <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer">
                  Browse All
                </span>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key={`${categoryParam}-${sort}-${search}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products?.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
