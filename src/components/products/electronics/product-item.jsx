import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { signIn, useSession } from "next-auth/react";
import { notifyError, notifySuccess } from "@/utils/toast";
import axios from "axios";
const ProductItem = ({ product, offer_style = false, prd }) => {
  const {
    _id,
    img,
    category,
    title,
    reviews,
    price,
    discount,
    status,
    offerDate,
  } = product || {};
  const imgProduct = prd ? prd.subProducts[0].images[0].url : null;
  const { data: session } = useSession();

  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products?.some((prd) => prd._id === _id) || false;
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle wishlist product
  // const handleWishlistProduct = (prd) => {
  //   dispatch(add_to_wishlist(prd));
  // };
  const handleWishlistProduct = async () => {
    try {
      if (!session) {
        return signIn();
      }

      const { data } = await axios.put("/api/user/wishlist", {
        product_id: prd._id,
        style: 0,
      });

      notifySuccess("Sản phẩm được thêm vào danh sách yêu thích thành công");
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };

  const pricePrd = prd?.subProducts[0]?.sizes
    .map((s) => {
      if (new Date(prd.endDate) > new Date() && prd.sale > 0) {
        return s.price * ((100 - prd.sale) / 100);
      } else {
        return s.price;
      }
    })
    .sort((a, b) => a - b);
  return (
    <>
      <div
        className={`${
          offer_style ? "tp-product-offer-item" : "mb-25"
        } tp-product-item transition-3`}
      >
        <div className="tp-product-thumb p-relative fix">
          <Link href={`/product-details/${prd?.slug || _id}?style=${0}`}>
            <Image
              src={imgProduct || img}
              width="0"
              height="0"
              sizes="100vw"
              style={{
                width: offer_style ? "380px" : "281.5px",
                height: offer_style ? "438.95px" : "325.17px",
              }}
              alt="product-electronic"
            />

            <div className="tp-product-badge">
              {status === "out-of-stock" && (
                <span className="product-hot">out-stock</span>
              )}
            </div>
          </Link>

          {/*  product action */}
          <div className="tp-product-action">
            <div className="tp-product-action-item d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart /> <span className="tp-product-tooltip">View Cart</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className={`tp-product-action-btn ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                  disabled={status === "out-of-stock"}
                >
                  <Cart />

                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}
              <button
                onClick={() => dispatch(handleProductModal(prd))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn"
              >
                <QuickView />

                <span className="tp-product-tooltip">Quick View</span>
              </button>
              <button
                type="button"
                className={`tp-product-action-btn ${
                  isAddedToWishlist ? "active" : ""
                } tp-product-add-to-wishlist-btn`}
                onClick={() => handleWishlistProduct(product)}
                disabled={status === "out-of-stock"}
              >
                <Wishlist />
                <span className="tp-product-tooltip">Add To Wishlist</span>
              </button>
            </div>
          </div>
        </div>
        {/*  product content */}
        <div className="tp-product-content">
          <div className="tp-product-category">
            <a href="#">{prd?.category?.name || category?.name}</a>
          </div>
          <h3 className="tp-product-title">
            <Link href={`/product-details/${prd?.slug || _id}?style=${0}`}>
              {prd?.name.slice(0, 26) || title}
            </Link>
          </h3>
          <div className="tp-product-rating d-flex align-items-center">
            <div className="tp-product-rating-icon">
              <Rating
                allowFraction
                size={16}
                initialValue={prd?.rating || ratingVal}
                readonly={true}
              />
            </div>
            <div className="tp-product-rating-text">
              <span>
                (
                {prd?.numReviews ||
                  (reviews && reviews.length > 0 ? reviews.length : 0)}{" "}
                Đánh Giá)
              </span>
            </div>
          </div>
          <div className="tp-product-price-wrapper">
            {prd?.subProducts[0].discount > 0 || discount > 0 ? (
              <>
                <span className="tp-product-price old-price">
                  {(pricePrd &&
                    pricePrd.length > 0 &&
                    pricePrd[0].toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    price}
                </span>
                <span className="tp-product-price new-price">
                  {" "}
                  {(pricePrd &&
                    pricePrd.length > 0 &&
                    (
                      (pricePrd[0] * (100 - prd?.subProducts[0].discount)) /
                      100
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })) ||
                    (
                      Number(price) -
                      (Number(price) * Number(discount)) / 100
                    ).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="tp-product-price new-price">
                {(pricePrd &&
                  pricePrd.length > 0 &&
                  pricePrd[0].toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })) ||
                  parseFloat(price).toFixed(2)}
              </span>
            )}
          </div>
          {offer_style && (
            <div className="tp-product-countdown">
              <div className="tp-product-countdown-inner">
                {dayjs().isAfter(
                  new Date(prd.endDate) || offerDate?.endDate
                ) ? (
                  <ul>
                    <li>
                      <span>{0}</span> Day
                    </li>
                    <li>
                      <span>{0}</span> Hrs
                    </li>
                    <li>
                      <span>{0}</span> Min
                    </li>
                    <li>
                      <span>{0}</span> Sec
                    </li>
                  </ul>
                ) : (
                  <Timer expiryTimestamp={new Date(prd.endDate)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
