import { Navbar } from "./navbar";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { useState } from "react";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Furniture", href: "/products?category=furniture" },
  { label: "Lighting", href: "/products?category=lighting" },
  { label: "Electronics", href: "/products?category=electronics" },
  { label: "Fashion", href: "/products?category=fashion" },
  { label: "Beauty", href: "/products?category=beauty" },
];

const aboutLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Journal", href: "/journal" },
  { label: "Stores", href: "/stores" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Settings", href: "#" },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-sidebar mt-auto">
        {/* Top section */}
        <div className="container mx-auto px-4 pt-16 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="space-y-5 sm:col-span-2 lg:col-span-1">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                    S
                  </div>
                  <span className="font-serif font-bold text-xl tracking-tight">ShopFlow</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Curated lifestyle products for the modern home. Designed with intent, built to last.
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border"
                  >
                    <s.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Shop</h4>
              <ul className="space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 3 }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-block"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5">About</h4>
              <ul className="space-y-2.5">
                {aboutLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 3 }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-block"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
                <li>
                  <motion.a
                    href="mailto:muneeb.fullstack.dev46@gmail.com"
                    whileHover={{ x: 3 }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-block"
                  >
                    muneeb.fullstack.dev46
                    <br />@gmail.com
                  </motion.a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Curated drops, design stories, and exclusive offers — straight to your inbox.
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  You're subscribed!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    Subscribe <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ShopFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
