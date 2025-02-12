import { createRouter } from "next-connect";
const twilio = require("twilio");
// import db from "@/utils/db";
const router = createRouter();

function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.startsWith("0") && phoneNumber.length === 10) {
    return phoneNumber.replace(/^0/, "+84");
  } else {
    return phoneNumber;
  }
}

router.post(async (req, res) => {
  try {
    const { orderId, phoneNumber } = req.body;
    const client = new twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    const message = await client.messages.create({
      body: "Bạn đặt hàng thành công đơn hàng mã " + orderId,
      from: "+17623394264",
      to: formatPhoneNumber(phoneNumber),
    });
    console.log(message);
    return res.json({
      message: "Gửi tin nhắn thành công !",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
