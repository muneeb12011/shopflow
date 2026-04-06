import { Layout } from "@/components/layout";
import { useGetProduct, useGetRelatedProducts, useAddToCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, Heart, Share2, ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id || "0", 10);

  const { data: product, isLoading } = useGetProduct(productId, { query: { enabled: !!productId, queryKey: [`/api/products/${productId}`] } });
  const { data: related } = useGetRelatedProducts(productId, { query: { enabled: !!productId, queryKey: [`/api/products/${productId}/related`] } });

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addToCart = useAddToCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({ title: "Added to cart", description: `${quantity}x ${product?.name} added to your cart.` });
      }
    }
  });

  const handleAddToCart = () => {
    if (!product) return;
    addToCart.mutate({ data: { productId: product.id, quantity } });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <div className="aspect-square bg-muted animate-pulse rounded-3xl mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />)}
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-5 pt-4">
            <div className="h-5 bg-muted animate-pulse rounded w-1/4" />
            <div className="h-10 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-7 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-32 bg-muted animate-pulse rounded w-full" />
            <div className="h-14 bg-muted animate-pulse rounded-full w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) return <Layout><div className="py-32 text-center text-muted-foreground">Product not found</div></Layout>;

  // Deduplicate images
  const images = Array.from(new Set([product.imageUrl, ...product.images]));
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground mb-10 flex items-center gap-2 flex-wrap"
        >
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-border">/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span className="text-border">/</span>
          <Link href={`/products?category=${product.category.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary transition-colors capitalize">{product.category}</Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">{product.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* ── GALLERY ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[52%] flex flex-col gap-4"
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/50 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  src={images[activeImage]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Badges overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wide"
                  >
                    New Arrival
                  </motion.span>
                )}
                {discount && discount > 0 && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                  >
                    Save {discount}%
                  </motion.span>
                )}
              </div>

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-background transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveImage(i => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-background transition-colors rotate-180"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.button>
                </>
              )}

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {images.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeImage ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImage === i ? 'border-primary shadow-md' : 'border-transparent hover:border-border'}`}
                  >
                    <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── DETAILS ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-[48%] flex flex-col"
          >
            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'fill-muted text-muted'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-5 leading-tight">{product.name}</h1>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-end gap-3 mb-6"
            >
              <span className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through pb-0.5">{formatCurrency(product.originalPrice)}</span>
              )}
              {discount && discount > 0 && (
                <span className="text-sm font-bold text-red-500 pb-0.5">Save {discount}%</span>
              )}
            </motion.div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">{product.description}</p>

            {/* Stock indicator */}
            {product.stockCount < 15 && product.inStock && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mb-6 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800/50"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                Only {product.stockCount} left in stock — order soon
              </motion.div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-stretch gap-3 mb-6">
              <div className="flex items-center border border-border rounded-2xl bg-secondary/50 overflow-hidden">
                <button
                  className="w-11 h-14 flex items-center justify-center hover:bg-secondary text-foreground disabled:opacity-40 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-base">{quantity}</span>
                <button
                  className="w-11 h-14 flex items-center justify-center hover:bg-secondary text-foreground disabled:opacity-40 transition-colors"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 bg-primary text-primary-foreground h-14 rounded-2xl font-semibold text-base hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={!product.inStock || addToCart.isPending}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={addToCart.isPending ? "loading" : "ready"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center justify-center gap-2"
                  >
                    {addToCart.isPending ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                className="w-14 h-14 rounded-2xl border-2 border-border flex items-center justify-center hover:border-red-300 transition-colors"
              >
                <Heart className={`w-5 h-5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-foreground/50"}`} />
              </motion.button>
            </div>

            {/* Trust pillars */}
            <div className="grid grid-cols-3 gap-3 py-6 border-y border-border mb-6">
              {[
                { icon: ShieldCheck, title: "5-Year Warranty", desc: "Full coverage" },
                { icon: Truck, title: "Free Shipping", desc: "Orders over $500" },
                { icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex flex-col items-center text-center gap-2 group cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  >
                    <item.icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.8} />
                  </motion.div>
                  <div>
                    <p className="text-[11px] font-bold leading-none mb-0.5">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors cursor-default"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {related && related.length > 0 && (
        <section className="bg-sidebar py-24 border-t border-border mt-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">You may also like</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Complete the Look</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((prod, i) => (
                <ProductCard key={prod.id} product={prod} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
