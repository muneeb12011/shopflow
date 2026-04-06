import { pgTable, text, serial, decimal, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  categoryId: integer("category_id").references(() => categoriesTable.id).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).notNull().default("4.5"),
  reviewCount: integer("review_count").notNull().default(0),
  inStock: boolean("in_stock").notNull().default(true),
  stockCount: integer("stock_count").notNull().default(100),
  isFeatured: boolean("is_featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cartItemsTable = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").references(() => productsTable.id).notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCategorySchema = createInsertSchema(categoriesTable).omit({ id: true, createdAt: true });
export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, createdAt: true });
export const insertCartItemSchema = createInsertSchema(cartItemsTable).omit({ id: true, createdAt: true });

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categoriesTable.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItemsTable.$inferSelect;
