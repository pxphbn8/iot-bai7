const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Kết nối MongoDB với MONGO_URI
const MONGO_URI = "mongodb+srv://vuducluong12a:123@cluster0.kznsm.mongodb.net/bai7bai7?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Tạo Schema và Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

// GET: Lấy danh sách sản phẩm
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET: Lấy chi tiết sản phẩm
app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).send("Product not found");
});

// POST: Thêm sản phẩm mới
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// PUT: Cập nhật sản phẩm
app.put("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  product ? res.json(product) : res.status(404).send("Product not found");
});

// DELETE: Xóa sản phẩm
app.delete("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  product ? res.status(204).send() : res.status(404).send("Product not found");
});

// Khởi chạy server
app.listen(3000, () => console.log("Server started on http://localhost:3000"));
