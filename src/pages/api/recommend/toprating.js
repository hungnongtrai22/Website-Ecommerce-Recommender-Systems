import { createRouter } from "next-connect";
import db from "@/utils/db";
import axios from "axios";
import Product from "@/models/Product";
import Category from "@/models/Category";

const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDB();
    const { data } = await axios.get(
      "http://127.0.0.1:8000/recommend_product_by_top_rating"
    );
    const results = [];
    for (const product of data.top_products) {
      const p = await Product.findById(product.ProductId).populate({
        path: "category",
        model: Category,
      });
      results.push(p);
    }
    db.disconnectDB();
    return res.json(results);
  } catch (error) {
    return res.json([]);
  }
});

export default router.handler();
