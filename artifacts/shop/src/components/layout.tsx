import { Navbar } from "./navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="py-12 border-t border-border bg-sidebar mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="font-serif font-bold text-xl">ShopFlow</div>
            <p className="text-sm text-muted-foreground">Curated lifestyle products for the modern home. Designed with intent, built to last.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>All Products</li>
              <li>Furniture</li>
              <li>Lighting</li>
              <li>Decor</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Our Story</li>
              <li>Journal</li>
              <li>Stores</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for updates and curated drops.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm" />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
