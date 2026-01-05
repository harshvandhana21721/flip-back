require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

/* ✅ MIDDLEWARE */
app.use(cors()); // Allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* PUBLIC FILES */
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

/* START SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running → http://localhost:${PORT}`);
});
