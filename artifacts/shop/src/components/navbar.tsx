import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Sun, Moon, Menu, X } from "lucide-react";
import { useGetCart } from "@workspace/api-client-react";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";

const navLinks = [
  { label: "Shop All", href: "/products" },
  { label: "Furniture", href: "/products?category=furniture" },
  { label: "Lighting", href: "/products?category=lighting" },
  { label: "Electronics", href: "/products?category=electronics" },
  { label: "Fashion", href: "/products?category=fashion" },
];

export function Navbar() {
  const { data: cart } = useGetCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const itemCount = cart?.totalItems || 0;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-xl transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-serif font-bold text-xl shadow-md"
              >
                S
              </motion.div>
              <span className="font-serif font-bold text-xl tracking-tight">ShopFlow</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-md hover:bg-primary/5 group"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:bg-secondary transition-colors relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="w-5 h-5 text-accent" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Search */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-foreground/70 hover:bg-secondary transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Cart */}
            <Link href="/cart" className="relative w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
              <motion.div whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.05 }}>
                <ShoppingBag className="w-5 h-5" />
              </motion.div>
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, y: 4 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-md"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:bg-secondary transition-colors"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-border overflow-hidden bg-background"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-4 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
