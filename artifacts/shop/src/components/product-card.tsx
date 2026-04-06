import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, ShoppingBag, Heart } from "lucide-react";
import type { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { formatCurrency } from "@/lib/format";
import { useAddToCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);

  const addToCart = useAddToCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({ title: "Added to cart", description: `${product.name} added to your cart.` });
      }
    }
  });

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart.mutate({ data: { productId: product.id, quantity: 1 } });
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col gap-3"
    >
      <Link href={`/products/${product.id}`} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/50 block">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07 + 0.2 }}
              className="bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wide"
            >
              New
            </motion.div>
          )}
          {discount && discount > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07 + 0.3 }}
              className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md"
            >
              -{discount}%
            </motion.div>
          )}
        </div>

        {/* Wishlist button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-foreground/60"}`} />
        </motion.button>

        {/* Product image */}
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-500"
        />

        {/* Add to Cart CTA */}
        <motion.button
          initial={{ y: 16, opacity: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background text-foreground shadow-xl px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300 whitespace-nowrap border border-border/50"
          onClick={handleAdd}
          disabled={!product.inStock || addToCart.isPending}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {product.inStock ? (addToCart.isPending ? "Adding..." : "Quick Add") : "Out of Stock"}
        </motion.button>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-1 px-0.5">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/products/${product.id}`} className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-1 leading-snug">
            {product.name}
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span>{product.rating}</span>
            <span className="opacity-60">({product.reviewCount})</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
