import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

const MyOrders = ({ orderData }) => {
  const order_items = orderData;
  return (
    <div className="profile__ticket table-responsive">
      {!order_items ||
        (order_items?.length === 0 && (
          <div
            style={{ height: "210px" }}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="text-center">
              <i
                style={{ fontSize: "30px" }}
                className="fa-solid fa-cart-circle-xmark"
              ></i>
              <p>You Have no order Yet!</p>
            </div>
          </div>
        ))}
      {order_items && order_items?.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Mã Đơn Hàng</th>
              <th scope="col">Thời Gian Đặt</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Xem</th>
            </tr>
          </thead>
          <tbody>
            {order_items.map((item, i) => (
              <tr key={i}>
                <th scope="row">#{item._id.substring(20, 25)}</th>
                <td data-info="title">
                  {dayjs(item.createdAt).format("MM - DD - YYYY")}
                </td>
                <td
                  data-info={`status ${
                    item.status === "Đang Xử Lý" ? "pending" : ""
                  }${item.status === "Đang Vận Chuyển" ? "hold" : ""}${
                    item.status === "Đã Hoàn Thành" ? "done" : ""
                  }`}
                  className={`status ${
                    item.status === "Đang Xử Lý" ? "pending" : ""
                  } ${item.status === "Đang Vận Chuyển" ? "hold" : ""}  ${
                    item.status === "Đã Hoàn Thành" ? "done" : ""
                  }`}
                >
                  {item.status}
                </td>
                <td>
                  <Link href={`/order/${item._id}`} className="tp-logout-btn">
                    Hóa Đơn
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
