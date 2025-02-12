import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import User from "@/models/User";

const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDB();
    const products = await Product.find({})
      .populate({ path: "category", model: Category })
      .populate({
        path: "reviews.reviewBy",
        model: User,
      })
      .sort({ createdAt: -1 })
      .lean();
    const reviews = [];
    for (const product of products) {
      if (product.reviews && product.reviews.length > 0) {
        for (const review of product.reviews) {
          if (review?.reviewBy?._id) {
            reviews.push({
              UserId: review?.reviewBy?._id,
              ProductId: product._id,
              Rating: review.rating,
            });
          }
        }
      }
    }
    db.disconnectDB();
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
