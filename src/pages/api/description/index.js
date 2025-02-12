import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";

const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDB();
    const products = await Product.find();
    const results = products.map((prd) => ({
      product_uid: prd._id,
      product_description: prd.description,
    }));
    db.disconnectDB();
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
