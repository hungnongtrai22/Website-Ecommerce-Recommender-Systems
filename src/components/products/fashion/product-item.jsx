import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";

const ProductItem = ({ product, style_2 = false }) => {
  const { _id, img, category, name, reviews, price, discount, tags, status } =
    product || {};
  // const pricePrd = product?.subProducts[0]?.sizes
  //   .map((s) => s.price)
  //   .sort((a, b) => a - b);
  const pricePrd = product?.subProducts[0]?.sizes
    .map((s) => {
      if (new Date(product.endDate) > new Date() && product.sale > 0) {
        return s.price * ((100 - product.sale) / 100);
      } else {
        return s.price;
      }
    })
    .sort((a, b) => a - b);
  console.log("Pr", pricePrd);
  const [ratingVal, setRatingVal] = useState(0);
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products?.some((prd) => prd._id === _id) || false;
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

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
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };
  console.log("detail", product);

  const imgProduct = product ? product.subProducts[0].images[0].url : null;

  return (
    <div className={`tp-product-item-2 ${style_2 ? "" : "mb-40"}`}>
      <div className="tp-product-thumb-2 p-relative z-index-1 fix">
        <Link href={`/product-details/${product.slug}?style=0`}>
          <Image
            src={imgProduct}
            alt="product img"
            width={284}
            height={302}
            sizes="100vw"
            style={{
              width: "283.48px",
              height: "327.77px",
            }}
          />
        </Link>
        <div className="tp-product-badge">
          {status === "out-of-stock" && (
            <span className="product-hot">out-stock</span>
          )}
        </div>
        {/* product action */}
        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-2 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
              >
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  View Cart
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-2 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
                disabled={status === "out-of-stock"}
              >
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Thêm Vào Giỏ Hàng
                </span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Xem Nhanh
              </span>
            </button>
            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleWishlistProduct(product)}
              className={`tp-product-action-btn-2 ${
                isAddedToWishlist ? "active" : ""
              } tp-product-add-to-wishlist-btn`}
            >
              <Wishlist />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Thêm Vào Danh Sách Yêu Thích
              </span>
            </button>
            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleCompareProduct(product)}
              className="tp-product-action-btn-2 tp-product-add-to-compare-btn"
            >
              <CompareThree />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Thêm Vào Danh Sách So Sánh
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-content-2 pt-15">
        <div className="tp-product-tag-2">
          {/* {tags.map((t, i) => (
            <a key={i} href="#">
              {t}
              {i < tags.length - 1 && ","}
            </a>
          ))} */}
          {product.subCategories.length > 0 ? (
            <a href="#">{product.subCategories[0].name}</a>
          ) : (
            ""
          )}
        </div>
        <h3 className="tp-product-title-2">
          <Link href={`/product-details/${product.slug}?style=0`}>{name}</Link>
        </h3>
        <div className="tp-product-rating-icon tp-product-rating-icon-2">
          <Rating
            allowFraction
            size={16}
            initialValue={ratingVal}
            readonly={true}
          />
        </div>
        <div className="tp-product-price-wrapper-2">
          {product?.subProducts[0].discount > 0 || discount > 0 ? (
            <>
              <span className="tp-product-price-2 new-price">
                {(pricePrd &&
                  pricePrd.length > 0 &&
                  (
                    (pricePrd[0] * (100 - product?.subProducts[0].discount)) /
                    100
                  ).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })) ||
                  (
                    Number(price) -
                    (Number(price) * Number(discount)) / 100
                  ).toFixed(2)}{" "}
              </span>
              <span className="tp-product-price-2 old-price">
                {/* {" "}
                $
                {(
                  Number(price) -
                  (Number(price) * Number(discount)) / 100
                ).toFixed(2)} */}
                {(pricePrd &&
                  pricePrd.length > 0 &&
                  pricePrd[0].toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })) ||
                  price}
              </span>
            </>
          ) : (
            <span className="tp-product-price-2 new-price">
              {/* ${price.toFixed(2)} */}
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
      </div>
    </div>
  );
};

export default ProductItem;
