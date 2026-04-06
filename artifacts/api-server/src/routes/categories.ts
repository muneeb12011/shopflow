import { Router } from "express";
import { db } from "@workspace/db";
import { categoriesTable, productsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const results = await db
      .select({
        id: categoriesTable.id,
        name: categoriesTable.name,
        slug: categoriesTable.slug,
        imageUrl: categoriesTable.imageUrl,
        productCount: sql<number>`count(${productsTable.id})`,
      })
      .from(categoriesTable)
      .leftJoin(productsTable, eq(productsTable.categoryId, categoriesTable.id))
      .groupBy(categoriesTable.id, categoriesTable.name, categoriesTable.slug, categoriesTable.imageUrl);

    res.json(results.map(c => ({ ...c, productCount: Number(c.productCount) })));
  } catch (err) {
    req.log.error({ err }, "Failed to list categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
