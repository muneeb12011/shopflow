import { Router } from "express";
import { db } from "@workspace/db";
import { productsTable, categoriesTable } from "@workspace/db";
import { eq, ilike, and, gte, lte, desc, asc, sql } from "drizzle-orm";
import { ListProductsQueryParams, GetProductParams, GetRelatedProductsParams } from "@workspace/api-zod";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const parsed = ListProductsQueryParams.safeParse(req.query);
    const params = parsed.success ? parsed.data : {};

    let conditions: ReturnType<typeof eq>[] = [];

    let query = db
      .select({
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
      .from(productsTable)
      .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id));

    const wheres = [];

    if (params.category) {
      wheres.push(ilike(categoriesTable.slug, params.category));
    }
    if (params.search) {
      wheres.push(ilike(productsTable.name, `%${params.search}%`));
    }
    if (params.minPrice !== undefined) {
      wheres.push(gte(productsTable.price, String(params.minPrice)));
    }
    if (params.maxPrice !== undefined) {
      wheres.push(lte(productsTable.price, String(params.maxPrice)));
    }

    let finalQuery = wheres.length > 0
      ? query.where(and(...wheres))
      : query;

    let results;
    if (params.sort === "price_asc") {
      results = await (finalQuery as any).orderBy(asc(productsTable.price));
    } else if (params.sort === "price_desc") {
      results = await (finalQuery as any).orderBy(desc(productsTable.price));
    } else if (params.sort === "popular") {
      results = await (finalQuery as any).orderBy(desc(productsTable.reviewCount));
    } else {
      results = await (finalQuery as any).orderBy(desc(productsTable.createdAt));
    }

    const formatted = results.map((p: any) => ({
      ...p,
      price: parseFloat(p.price),
      originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
      rating: parseFloat(p.rating),
      createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    req.log.error({ err }, "Failed to list products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/featured", async (req, res) => {
  try {
    const results = await db
      .select({
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
      .from(productsTable)
      .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
      .where(eq(productsTable.isFeatured, true))
      .limit(6);

    const formatted = results.map((p) => ({
      ...p,
      price: parseFloat(p.price),
      originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
      rating: parseFloat(p.rating),
      createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    req.log.error({ err }, "Failed to get featured products");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/stats", async (req, res) => {
  try {
    const [productCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productsTable);
    const [categoryCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(categoriesTable);
    const [featuredCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productsTable)
      .where(eq(productsTable.isFeatured, true));
    const [avgRating] = await db
      .select({ avg: sql<number>`avg(rating::numeric)` })
      .from(productsTable);

    res.json({
      totalProducts: Number(productCount.count),
      totalCategories: Number(categoryCount.count),
      featuredCount: Number(featuredCount.count),
      avgRating: Math.round(Number(avgRating.avg) * 10) / 10,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const parsed = GetProductParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const [product] = await db
      .select({
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
      .from(productsTable)
      .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
      .where(eq(productsTable.id, parsed.data.id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      ...product,
      price: parseFloat(product.price),
      originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
      rating: parseFloat(product.rating),
      createdAt: product.createdAt?.toISOString?.() ?? product.createdAt,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get product");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id/related", async (req, res) => {
  try {
    const parsed = GetRelatedProductsParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) return res.status(400).json({ error: "Invalid id" });

    const [sourceProduct] = await db
      .select({ categoryId: productsTable.categoryId })
      .from(productsTable)
      .where(eq(productsTable.id, parsed.data.id));

    if (!sourceProduct) return res.json([]);

    const results = await db
      .select({
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
      .from(productsTable)
      .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
      .where(and(
        eq(productsTable.categoryId, sourceProduct.categoryId),
        sql`${productsTable.id} != ${parsed.data.id}`
      ))
      .limit(4);

    const formatted = results.map((p) => ({
      ...p,
      price: parseFloat(p.price),
      originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
      rating: parseFloat(p.rating),
      createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    req.log.error({ err }, "Failed to get related products");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
