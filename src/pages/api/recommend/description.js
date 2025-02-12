import { createRouter } from "next-connect";
import db from "@/utils/db";
import axios from "axios";
import Product from "@/models/Product";
import Category from "@/models/Category";

const router = createRouter();

const numKeyWord = (product, keywords) => {
  let count = 0;
  for (const keyword of keywords) {
    if (
      product.name.includes(keyword) ||
      product.description.includes(keyword)
    ) {
      count++;
    }
  }
  return count;
};

router.post(async (req, res) => {
  try {
    console.log("NEWWWWWWWWWW");

    db.connectDB();
    const { keyword } = req.body;

    const { data } = await axios.post(
      `http://127.0.0.1:8000/recommend_product_by_description?keyword=${keyword}`
    );
    console.log(">>>>>>>>>>>>>>>>>", data);
    const keywords = data.top_products;

    // const filter = {
    //   $or: keywords.map((keyword) => ({
    //     $or: [
    //       { name: { $regex: keyword, $options: "i" } },
    //       { description: { $regex: keyword, $options: "i" } },
    //     ],
    //   })),
    // };

    // const products = await Product.find(filter);

    const minKey = 6;

    const products = [];

    const allProducts = await Product.find().populate({
      path: "category",
      model: Category,
    });
    console.log(allProducts);
    for (const product of allProducts) {
      const count = numKeyWord(product, keywords);
      if (count >= minKey) {
        products.push(product);
      }
    }

    db.disconnectDB();
    return res.json({ products, keywords });
  } catch (error) {
    console.log("NEWWWWWWWWWW");
    return res.json({ products: [], keywords: [keyword] });
  }
});

export default router.handler();
