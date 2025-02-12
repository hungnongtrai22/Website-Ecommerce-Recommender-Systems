import auth from "@/middleware/auth";
import Product from "@/models/Product";
import db from "@/utils/db";
import { createRouter } from "next-connect";

const router = createRouter().use(auth);

router.put(async (req, res) => {
  try {
    await db.connectDB();
    // const {id} =
    // const product = await Product.findByIdAndUpdate(req.query.id);

    return res.status(200).json({ reviews: product.reviews.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
export default router.handler();
