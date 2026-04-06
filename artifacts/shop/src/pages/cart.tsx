import { Layout } from "@/components/layout";
import { useGetCart, useUpdateCartItem, useRemoveFromCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { formatCurrency } from "@/lib/format";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { data: cart, isLoading } = useGetCart();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateItem = useUpdateCartItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
      }
    }
  });

  const removeItem = useRemoveFromCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({ description: "Item removed from cart" });
      }
    }
  });

  const handleUpdateQty = (productId: number, newQty: number) => {
    if (newQty < 1) return;
    updateItem.mutate({ productId, data: { quantity: newQty } });
  };

  const handleRemove = (productId: number) => {
    removeItem.mutate({ productId });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 max-w-4xl animate-pulse">
          <div className="h-10 bg-muted w-1/3 mb-12 rounded" />
          <div className="space-y-8">
            {[1, 2].map(i => (
              <div key={i} className="flex gap-6">
                <div className="w-32 h-32 bg-muted rounded-xl" />
                <div className="flex-1 space-y-4 py-2">
                  <div className="h-6 bg-muted w-1/2 rounded" />
                  <div className="h-4 bg-muted w-1/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 lg:py-24 max-w-6xl">
        <h1 className="text-4xl font-serif font-bold mb-12">Your Cart</h1>

        {isEmpty ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-sidebar rounded-3xl border border-border flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm border border-border">
              <div className="text-4xl opacity-50">🛒</div>
            </div>
            <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added anything yet. Discover our latest collections.</p>
            <Link href="/products" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <div className="divide-y divide-border">
                <AnimatePresence initial={false}>
                  {cart.items.map((item) => (
                    <motion.div 
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, height: 0 }}
                      className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                    >
                      <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                        <Link href={`/products/${item.productId}`} className="w-24 h-24 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                        </Link>
                        <div className="flex flex-col">
                          <Link href={`/products/${item.productId}`} className="font-bold text-lg hover:text-primary transition-colors mb-1 line-clamp-1">
                            {item.product.name}
                          </Link>
                          <span className="text-sm text-muted-foreground mb-2 capitalize">{item.product.category}</span>
                          <span className="font-medium">{formatCurrency(item.product.price)}</span>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-3 flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-sm text-muted-foreground font-medium">Quantity:</span>
                        <div className="flex items-center gap-3 border border-border rounded-full p-1 bg-background">
                          <button 
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary disabled:opacity-50"
                            onClick={() => handleUpdateQty(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updateItem.isPending}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary disabled:opacity-50"
                            onClick={() => handleUpdateQty(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockCount || updateItem.isPending}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-3 flex justify-between md:justify-end items-center">
                        <span className="md:hidden text-sm text-muted-foreground font-medium">Total:</span>
                        <div className="flex items-center gap-6">
                          <span className="font-bold text-lg">{formatCurrency(item.product.price * item.quantity)}</span>
                          <button 
                            className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
                            onClick={() => handleRemove(item.productId)}
                            disabled={removeItem.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-sidebar rounded-3xl p-8 border border-border sticky top-24">
                <h3 className="text-xl font-serif font-bold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({cart.totalItems} items)</span>
                    <span>{formatCurrency(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(cart.subtotal)}</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group"
                  onClick={() => toast({ title: "Checkout Initiated", description: "This is a demo store. Checkout is not implemented." })}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>Secure checkout powered by ShopFlow</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
