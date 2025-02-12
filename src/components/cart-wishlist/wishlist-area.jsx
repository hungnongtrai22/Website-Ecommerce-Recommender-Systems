import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import WishlistItem from "./wishlist-item";
import { notifyError, notifySuccess } from "@/utils/toast";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

const WishlistArea = ({ list }) => {
  // const { wishlist } = useSelector((state) => state.wishlist);
  const [wishlist, setWishlist] = useState(list || []);
  const { data: session } = useSession();
  const removeProduct = async (id, style) => {
    console.log("remove", id, style);
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put("/api/user/deleteWishlist", {
        product_id: id,
        style: style,
      });
      const newWishlist = wishlist.filter(
        (product) => !(product.product._id === id && product.style === style)
      );
      setWishlist(newWishlist);
      notifySuccess("Sản phẩm được xoá khỏi danh sách yêu thích thành công");
    } catch (error) {
      notifyError("Lỗi danh sách yêu thích: " + error.message);
    }
  };
  return (
    <>
      <section className="tp-cart-area pb-120">
        <div className="container">
          {wishlist.length === 0 && (
            <div className="text-center pt-50">
              <h3>Không Có Sản Phẩm Nào Trong Danh Sách Yêu Thích</h3>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                Tiếp Tục Mua Sắm
              </Link>
            </div>
          )}
          {wishlist.length > 0 && (
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-cart-list mb-45 mr-30">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2" className="tp-cart-header-product">
                          Sản Phẩm
                        </th>
                        <th className="tp-cart-header-price">Giá</th>
                        {/* <th className="tp-cart-header-quantity">Số Lượng</th> */}
                        <th>Hành Động</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((item, i) => (
                        <WishlistItem
                          key={i}
                          product={item.product}
                          style={item.style}
                          removeProduct={removeProduct}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tp-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-4">
                      <div className="tp-cart-update">
                        <Link href="/cart" className="tp-cart-update-btn">
                          Đi Tới Giỏ Hàng
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WishlistArea;
