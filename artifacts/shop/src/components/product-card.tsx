import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, ShoppingBag } from "lucide-react";
import type { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { formatCurrency } from "@/lib/format";
import { useAddToCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const addToCart = useAddToCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart.`,
        });
      }
    }
  });

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation
    addToCart.mutate({ data: { productId: product.id, quantity: 1 } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative flex flex-col gap-3"
    >
      <Link href={`/products/${product.id}`} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary/50">
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground shadow-lg px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 disabled:opacity-50"
          onClick={handleAdd}
          disabled={!product.inStock || addToCart.isPending}
        >
          <ShoppingBag className="w-4 h-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </motion.button>
      </Link>
      
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <Link href={`/products/${product.id}`} className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </Link>
          <div className="flex gap-2 items-center">
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="font-semibold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="capitalize">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span>{product.rating} ({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
