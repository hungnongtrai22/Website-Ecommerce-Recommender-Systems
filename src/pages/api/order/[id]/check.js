import { createRouter } from "next-connect";
import db from "@/utils/db";
import Order from "@/models/Order";
import User from "@/models/User";

const router = createRouter();

router.get(async (req, res) => {
  await db.connectDB();
  try {
    const order = await Order.findById(req.query.id).populate({
      path: "user",
      model: User,
    });
    if (order) {
      await db.disconnectDB();
      res.json(order);
    }
  } catch (error) {
    await db.disconnectDB();
    res.status(404).json({ message: "Không tìm thấy đơn hàng." });
  }
});

export default router.handler();
