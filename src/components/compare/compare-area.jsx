import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
// internal
// import { add_cart_product } from "@/redux/features/cartSlice";
import { remove_compare_product } from "@/redux/features/compareSlice";
import {
  add_cart_product,
  addToCart,
  updateCart,
} from "@/redux/features/cartSlice";
import axios from "axios";
import { notifySuccess } from "@/utils/toast";

const CompareArea = ({ compare, removeProduct }) => {
  const { compareItems } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => ({ ...state }));

  // handle add product
  // const handleAddProduct = (prd) => {
  //   dispatch(add_cart_product(prd));
  // };
  // handle add product
  const handleRemoveComparePrd = (prd) => {
    dispatch(remove_compare_product(prd));
  };

  const addToCartHandler = async (item) => {
    // if (productModal == true && sizeModal == null) {
    //   return;
    // }
    // if (!router.query.size && productModal == false) {
    //   // setError("Vui lòng chọn một kích thước");
    //   return;
    // }
    const qty = 1;
    const { data } = await axios.get(
      `/api/product/${item.product._id}?style=${item.style}&size=${item.size}`
    );
    if (qty > data.quantity) {
      // setError(
      //   "Số lượng bạn đã chọn còn nhiều hơn số lượng có sẵn. Hãy thử và giảm số lượng"
      // );
    } else if (data.quantity < 1) {
      // setError("Sản phẩm này đã hết hàng");
      return;
    } else {
      let _uid = `${data._id}_${item.style}_${item.size}`;
      let exist = cart.cart_products.find((p) => p._uid === _uid);
      if (exist) {
        let newCart = cart.cart_products.map((p) => {
          if (p._uid == exist._uid) {
            return { ...p, qty: p.qty + qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(
          addToCart({
            ...data,
            qty,
            size: data.size,
            _uid,
          })
        );
      }
      // toast.success(`Thêm ${qty} ${data.name} thành công.`);
      notifySuccess(`Thêm ${qty} ${data.name} thành công.`);
    }
  };

  return (
    <>
      <section className="tp-compare-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              {compare.length === 0 && (
                <div className="text-center pt-50">
                  <h3>No Compare Items Found</h3>
                  <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                    Continue Shipping
                  </Link>
                </div>
              )}
              {compare.length > 0 && (
                <div className="tp-compare-table table-responsive text-center">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Sản Phẩm</th>
                        {compare.map((item) => {
                          return (
                            <td key={item.product._id} className="">
                              <div className="tp-compare-thumb">
                                <Image
                                  src={
                                    item.product.subProducts[item.style]
                                      .images[0].url
                                  }
                                  alt="compare"
                                  width={205}
                                  height={176}
                                />
                                <h4 className="tp-compare-product-title">
                                  <Link href={`/product-details/${item._id}`}>
                                    {item.title}
                                  </Link>
                                </h4>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                      {/* Description */}
                      <tr>
                        <th>Mô Tả</th>
                        {compare.map((item) => (
                          <td key={item.product._id}>
                            <div className="tp-compare-desc">
                              <p>{item.product.description}</p>
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* Price */}
                      <tr>
                        <th>Giá</th>
                        {compare.map((item) => (
                          <td key={item.product._id}>
                            <div className="tp-compare-price">
                              <span>
                                {item.product.subProducts[item.style].sizes[
                                  item.size || 0
                                ].price.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* Add to cart*/}
                      <tr>
                        <th>Thêm vào giỏ hàng</th>
                        {compare.map((item) => (
                          <td key={item.product._id}>
                            <div className="tp-compare-add-to-cart">
                              <button
                                onClick={() => addToCartHandler(item)}
                                type="button"
                                className="tp-btn"
                              >
                                Thêm vào giỏ hàng
                              </button>
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* Rating */}
                      <tr>
                        <th>Đánh Giá</th>
                        {compare.map((item) => (
                          <td key={item.product._id}>
                            <div className="tp-compare-rating">
                              <Rating
                                allowFraction
                                size={16}
                                initialValue={item.product.rating}
                                readonly={true}
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* Remove */}
                      <tr>
                        <th>Xoá</th>
                        {compare.map((item) => (
                          <td key={item.product._id}>
                            <div className="tp-compare-remove">
                              <button
                                onClick={() =>
                                  removeProduct(
                                    item.product._id,
                                    item.style,
                                    item.size
                                  )
                                }
                              >
                                <i className="fal fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompareArea;
