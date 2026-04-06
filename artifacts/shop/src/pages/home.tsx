import { Layout } from "@/components/layout";
import { useGetFeaturedProducts, useListCategories, useGetProductStats } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import heroBg from "@/assets/hero-bg.png";
import catFurniture from "@/assets/category-furniture.png";
import catLighting from "@/assets/category-lighting.png";
import catDecor from "@/assets/category-decor.png";

const localCategories = [
  { name: "Furniture", slug: "furniture", image: catFurniture },
  { name: "Lighting", slug: "lighting", image: catLighting },
  { name: "Decor", slug: "decor", image: catDecor },
];

export default function Home() {
  const { data: featuredProducts, isLoading: featuredLoading } = useGetFeaturedProducts();
  const { data: stats } = useGetProductStats();
  const { data: categories } = useListCategories();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Luxury boutique" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase mb-6">
              The Winter Collection
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Curated living, <br />designed for you.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg">
              Discover our premium collection of minimal, tactile, and confident pieces that elevate your everyday spaces.
            </p>
            <div className="flex gap-4">
              <Link href="/products" className="bg-white text-primary px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors">
                Shop Collection
              </Link>
              <Link href="/products?isFeatured=true" className="bg-black/30 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-black/50 transition-colors">
                View Lookbook
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      {stats && (
        <section className="py-12 border-b border-border bg-sidebar">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-primary mb-2">{stats.totalProducts}+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Curated Pieces</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-primary mb-2">{stats.totalCategories}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-primary mb-2">{stats.featuredCount}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Exclusive Drops</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-primary mb-2">{stats.avgRating.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Average Rating</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Featured Additions</h2>
            <p className="text-muted-foreground max-w-xl">Carefully selected pieces that define the aesthetic of modern living.</p>
          </div>
          <Link href="/products" className="hidden md:inline-flex font-medium text-primary hover:text-accent transition-colors">
            View all products &rarr;
          </Link>
        </div>

        {featuredLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] bg-muted animate-pulse rounded-xl" />
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts?.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="py-24 bg-sidebar">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {localCategories.map((cat, i) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{cat.name}</h3>
                    <span className="text-white/80 flex items-center gap-2 group-hover:gap-4 transition-all">
                      Explore collection &rarr;
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
