import { createRouter } from "next-connect";
import db from "@/utils/db";
import axios from "axios";
import Product from "@/models/Product";
import Category from "@/models/Category";

const router = createRouter();

router.post(async (req, res) => {
  try {
    db.connectDB();
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (product.numReviews == 0 || product.rating == 0) {
      return res.json([]);
    }
    const { data } = await axios.post(
      `http://127.0.0.1:8000/recommend_product_by_similar_rating?productId=${productId}`
    );
    console.log(">>>>>>>>>>>>>>>>>", data);
    const results = [];
    for (const product of data.top_products) {
      const p = await Product.findById(product).populate({
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
