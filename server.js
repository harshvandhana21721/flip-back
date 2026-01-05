require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* PUBLIC */
app.use(express.static(path.join(__dirname, "public")));

/* API ROUTES */
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

/* PAGES */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/add-product.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "public/product-list.html"));
});

/* START */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("✅ Server running → http://localhost:" + PORT);
});
