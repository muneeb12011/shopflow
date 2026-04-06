import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search } from "lucide-react";
import { useGetCart } from "@workspace/api-client-react";

export function Navbar() {
  const { data: cart } = useGetCart();
  const itemCount = cart?.totalItems || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-serif font-bold text-xl"
            >
              S
            </motion.div>
            <span className="font-serif font-bold text-xl tracking-tight">ShopFlow</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/products" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Shop All
            </Link>
            <Link href="/products?category=furniture" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Furniture
            </Link>
            <Link href="/products?category=lighting" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Lighting
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:bg-secondary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/cart" className="relative w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </header>
  );
}
