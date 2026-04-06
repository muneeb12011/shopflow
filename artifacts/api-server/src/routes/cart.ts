import { Router } from "express";
import { db } from "@workspace/db";
import { cartItemsTable, productsTable, categoriesTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { AddToCartBody, UpdateCartItemBody, UpdateCartItemParams, RemoveFromCartParams } from "@workspace/api-zod";

const router = Router();

const SESSION_ID = "default-session";

async function getCartData() {
  const items = await db
    .select({
      productId: cartItemsTable.productId,
      quantity: cartItemsTable.quantity,
      id: productsTable.id,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      originalPrice: productsTable.originalPrice,
      imageUrl: productsTable.imageUrl,
      images: productsTable.images,
      categoryId: productsTable.categoryId,
      category: categoriesTable.name,
      rating: productsTable.rating,
      reviewCount: productsTable.reviewCount,
      inStock: productsTable.inStock,
      stockCount: productsTable.stockCount,
      isFeatured: productsTable.isFeatured,
      isNew: productsTable.isNew,
      tags: productsTable.tags,
      createdAt: productsTable.createdAt,
    })
    .from(cartItemsTable)
    .innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
    .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(cartItemsTable.sessionId, SESSION_ID));

  const cartItems = items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    product: {
      id: item.id,
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
      originalPrice: item.originalPrice ? parseFloat(item.originalPrice) : null,
      imageUrl: item.imageUrl,
      images: item.images,
      categoryId: item.categoryId,
      category: item.category,
      rating: parseFloat(item.rating),
      reviewCount: item.reviewCount,
      inStock: item.inStock,
      stockCount: item.stockCount,
      isFeatured: item.isFeatured,
      isNew: item.isNew,
      tags: item.tags,
      createdAt: item.createdAt?.toISOString?.() ?? item.createdAt,
    },
  }));

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return { items: cartItems, totalItems, subtotal };
}

router.get("/cart", async (req, res) => {
  try {
    res.json(await getCartData());
  } catch (err) {
    req.log.error({ err }, "Failed to get cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/cart", async (req, res) => {
  try {
    const parsed = AddToCartBody.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid body" });

    const { productId, quantity } = parsed.data;

    const [existing] = await db
      .select()
      .from(cartItemsTable)
      .where(and(
        eq(cartItemsTable.sessionId, SESSION_ID),
        eq(cartItemsTable.productId, productId)
      ));

    if (existing) {
      await db
        .update(cartItemsTable)
        .set({ quantity: existing.quantity + quantity })
        .where(and(
          eq(cartItemsTable.sessionId, SESSION_ID),
          eq(cartItemsTable.productId, productId)
        ));
    } else {
      await db
        .insert(cartItemsTable)
        .values({ sessionId: SESSION_ID, productId, quantity });
    }

    res.json(await getCartData());
  } catch (err) {
    req.log.error({ err }, "Failed to add to cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/cart/:productId", async (req, res) => {
  try {
    const parsedParams = UpdateCartItemParams.safeParse({ productId: Number(req.params.productId) });
    const parsedBody = UpdateCartItemBody.safeParse(req.body);
    if (!parsedParams.success || !parsedBody.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const { productId } = parsedParams.data;
    const { quantity } = parsedBody.data;

    if (quantity <= 0) {
      await db
        .delete(cartItemsTable)
        .where(and(
          eq(cartItemsTable.sessionId, SESSION_ID),
          eq(cartItemsTable.productId, productId)
        ));
    } else {
      await db
        .update(cartItemsTable)
        .set({ quantity })
        .where(and(
          eq(cartItemsTable.sessionId, SESSION_ID),
          eq(cartItemsTable.productId, productId)
        ));
    }

    res.json(await getCartData());
  } catch (err) {
    req.log.error({ err }, "Failed to update cart item");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/cart/:productId", async (req, res) => {
  try {
    const parsed = RemoveFromCartParams.safeParse({ productId: Number(req.params.productId) });
    if (!parsed.success) return res.status(400).json({ error: "Invalid id" });

    await db
      .delete(cartItemsTable)
      .where(and(
        eq(cartItemsTable.sessionId, SESSION_ID),
        eq(cartItemsTable.productId, parsed.data.productId)
      ));

    res.json(await getCartData());
  } catch (err) {
    req.log.error({ err }, "Failed to remove from cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
