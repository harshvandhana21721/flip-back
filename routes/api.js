const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
const DB_URL = process.env.FIREBASE_DB_URL;

/* GET PRODUCTS */
router.get("/products", async (req, res) => {
  try {
    const r = await fetch(`${DB_URL}/products.json`);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/* ADD PRODUCT */
router.post("/products", async (req, res) => {
  const product = req.body;
  try {
    await fetch(`${DB_URL}/products/${product.id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

/* DELETE PRODUCT */
router.delete("/products/:id", async (req, res) => {
  try {
    await fetch(`${DB_URL}/products/${req.params.id}.json`, { method: "DELETE" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
