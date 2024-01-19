import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import "dotenv/config";
const app = express();
const port = process.env.PORT;
const key = process.env.KEY;
app.use(express.json());
app.use(cors());

const menuSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  price: Number,
  image: String,
  category: String,
});

const menuModel = mongoose.model("menu", menuSchema);

app.get("/menu", async (req, res) => {
  try {
    const allMenu = await menuModel.find({});
    res.status(200).json(allMenu);
  } catch (error) {
    res.send("Menu is not found!");
  }
});

app.get("/menu/:id", async (req, res) => {
  const { id } = req.params;
  const menuItem = await menuModel.findById(id);
  res.send(menuItem);
});

app.post("/menu", async (req, res) => {
  try {
    const { name, ingredients, price, image, category } = req.body;
    const newMenuItem = new menuModel({
      name,
      ingredients,
      price,
      image,
      category,
    });
    await newMenuItem.save();
    res.send("Menu item is created!");
  } catch (error) {
    res.send("Menu item is not created!");
  }
});

app.put("/menu/:id", async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, price, image, category } = req.body;
  const menuItem = await menuModel.findByIdAndUpdate(id, {
    name,
    ingredients,
    price,
    image,
    category,
  });
  res.send(menuItem);
});

app.delete("/menu/:id", async (req, res) => {
  const { id } = req.params;
  const menuItem = await menuModel.findByIdAndDelete(id);
  res.send(menuItem);
});

mongoose
  .connect(key)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
