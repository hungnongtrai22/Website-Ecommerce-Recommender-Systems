import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { signIn, useSession } from "next-auth/react";
import { notifyError, notifySuccess } from "@/utils/toast";
import axios from "axios";

const ProductItem = ({ product, prdCenter = false, primary_style = false }) => {
  const { _id, img, title, discount, price, tags, status } = product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const imgProduct = product ? product.subProducts[0].images[0].url : null;
  const { data: session } = useSession();

  const dispatch = useDispatch();

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
        product_id: product._id,
        style: 0,
      });

      notifySuccess("Sản phẩm được thêm vào danh sách yêu thích thành công");
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };
  const pricePrd = product?.subProducts[0]?.sizes
    .map((s) => {
      if (new Date(product.endDate) > new Date() && product.sale > 0) {
        return s.price * ((100 - product.sale) / 100);
      } else {
        return s.price;
      }
    })
    .sort((a, b) => a - b);
  // if (new Date(product?.endDate) > new Date() && product?.sale > 0) {
  //   pricePrd *= (100 - product.sale) / 100;
  // }
  return (
    <div
      className={`tp-product-item-3 mb-50 ${
        primary_style ? "tp-product-style-primary" : ""
      } ${prdCenter ? "text-center" : ""}`}
    >
      <div className="tp-product-thumb-3 mb-15 fix p-relative z-index-1">
        <Link href={`/product-details/${product.slug}?style=${0}`}>
          <Image
            src={imgProduct}
            alt="product image"
            width={282}
            height={320}
          />
        </Link>

        <div className="tp-product-badge">
          {status === "out-of-stock" && (
            <span className="product-hot">out-stock</span>
          )}
        </div>

        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn text-center`}
              >
                <Cart />
                <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? "active" : ""
                } tp-product-add-cart-btn`}
                disabled={status === "out-of-stock"}
              >
                <Cart />
                <span className="tp-product-tooltip">Thêm vào giỏ hàng</span>
              </button>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip">Xem Nhanh</span>
            </button>

            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleWishlistProduct(product)}
              className={`tp-product-action-btn-3 
            ${
              isAddedToWishlist ? "active" : ""
            } tp-product-add-to-wishlist-btn`}
            >
              <Wishlist />
              <span className="tp-product-tooltip">
                Thêm vào danh sách yêu thích
              </span>
            </button>
          </div>
        </div>

        <div className="tp-product-add-cart-btn-large-wrapper">
          {isAddedToCart ? (
            <Link
              href="/cart"
              className="tp-product-add-cart-btn-large text-center"
            >
              View To Cart
            </Link>
          ) : (
            <button
              onClick={() => handleAddProduct(product)}
              type="button"
              className="tp-product-add-cart-btn-large"
              disabled={status === "out-of-stock"}
            >
              Thêm vào giỏ hàng
            </button>
          )}
        </div>
      </div>
      <div className="tp-product-content-3">
        <div className="tp-product-tag-3">
          <span>{product?.category?.name}</span>
        </div>
        <h3 className="tp-product-title-3">
          <Link href={`/product-details/${_id}`}>{product?.name}</Link>
        </h3>
        <div className="tp-product-price-wrapper-3">
          <span className="tp-product-price-3">
            {pricePrd[0].toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
