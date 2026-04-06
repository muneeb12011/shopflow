import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function Products() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const categoryParam = searchParams.get("category") || undefined;
  
  const [sort, setSort] = useState<any>("popular");
  
  const { data: products, isLoading } = useListProducts({ category: categoryParam, sort });
  const { data: categories } = useListCategories();

  return (
    <Layout>
      <div className="bg-sidebar py-12 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">
            {categoryParam ? <span className="capitalize">{categoryParam}</span> : "All Products"}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of thoughtfully designed pieces. Every item is crafted with uncompromising attention to detail.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Categories</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/products" className={`text-sm ${!categoryParam ? 'text-primary font-bold' : 'text-foreground/70 hover:text-primary'}`}>
                      All Categories
                    </a>
                  </li>
                  {categories?.map(cat => (
                    <li key={cat.id}>
                      <a href={`/products?category=${cat.slug}`} className={`text-sm capitalize ${categoryParam === cat.slug ? 'text-primary font-bold' : 'text-foreground/70 hover:text-primary'}`}>
                        {cat.name} ({cat.productCount})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm text-muted-foreground">
              Showing {products?.length || 0} products
            </p>
            <select 
              className="bg-transparent border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[4/5] bg-muted animate-pulse rounded-xl" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : products?.length === 0 ? (
            <div className="text-center py-24 bg-sidebar rounded-2xl border border-border">
              <h3 className="text-xl font-serif font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
