import { Layout } from "@/components/layout";
import { useGetProduct, useGetRelatedProducts, useAddToCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Truck, RotateCcw, Minus, Plus } from "lucide-react";
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
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const addToCart = useAddToCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({
          title: "Added to cart",
          description: `${quantity}x ${product?.name} added to your cart.`,
        });
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
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 animate-pulse">
          <div className="w-full md:w-1/2 aspect-square bg-muted rounded-2xl" />
          <div className="w-full md:w-1/2 space-y-6">
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-6 bg-muted rounded w-1/4" />
            <div className="h-32 bg-muted rounded w-full" />
            <div className="h-12 bg-muted rounded w-full mt-8" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) return <Layout><div className="py-24 text-center">Product not found</div></Layout>;

  const images = [product.imageUrl, ...product.images];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          {/* Gallery */}
          <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar w-full md:w-24 flex-shrink-0 snap-x">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden flex-shrink-0 snap-start border-2 transition-colors ${activeImage === i ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            <div className="relative aspect-square md:aspect-[4/5] flex-1 rounded-2xl overflow-hidden bg-secondary">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImage]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {product.isNew && (
                <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded">
                  NEW ARRIVAL
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-accent' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 text-foreground">{product.name}</h1>
            
            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl font-medium text-primary">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through mb-1">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-32 flex items-center justify-between border border-border rounded-full p-1">
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary text-foreground disabled:opacity-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium w-8 text-center">{quantity}</span>
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary text-foreground disabled:opacity-50"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  className="flex-1 bg-primary text-primary-foreground h-14 rounded-full font-medium text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addToCart.isPending}
                >
                  {addToCart.isPending ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
              {product.stockCount > 0 && product.stockCount < 10 && (
                <p className="text-sm text-accent flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Only {product.stockCount} left in stock
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-border">
              <div className="flex flex-col gap-2 text-center items-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h4 className="text-sm font-bold">Extended Warranty</h4>
                <p className="text-xs text-muted-foreground">5 years coverage</p>
              </div>
              <div className="flex flex-col gap-2 text-center items-center">
                <Truck className="w-6 h-6 text-primary" />
                <h4 className="text-sm font-bold">Free Shipping</h4>
                <p className="text-xs text-muted-foreground">On orders over $500</p>
              </div>
              <div className="flex flex-col gap-2 text-center items-center">
                <RotateCcw className="w-6 h-6 text-primary" />
                <h4 className="text-sm font-bold">Easy Returns</h4>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related && related.length > 0 && (
        <section className="bg-sidebar py-24 border-t border-border mt-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">You May Also Like</h2>
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
