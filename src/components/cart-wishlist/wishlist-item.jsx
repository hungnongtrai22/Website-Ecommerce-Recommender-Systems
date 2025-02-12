import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
} from "@/redux/features/cartSlice";
import { remove_wishlist_product } from "@/redux/features/wishlist-slice";
import { useRouter } from "next/router";

const WishlistItem = ({ product, style = 0, removeProduct }) => {
  const { _id, img, title, price } = product || {};
  const pricePrd = product?.subProducts[style]?.sizes
    .map((s) => s.price)
    .sort((a, b) => a - b);
  console.log("wishlist", product);
  const { cart_products } = useSelector((state) => state.cart);
  const isAddToCart = cart_products.find((item) => item._id === _id);
  const router = useRouter();

  const dispatch = useDispatch();
  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_wishlist_product(prd));
  };

  return (
    <tr>
      <td className="tp-cart-img">
        <Link href={`/product-details/${product.slug}?style=0`}>
          <Image
            src={product.subProducts[style].images[0].url}
            alt="product img"
            width={70}
            height={100}
          />
        </Link>
      </td>
      <td className="tp-cart-title">
        <Link href={`/product-details/${product.slug}?style=0`}>
          {product.name}
        </Link>
      </td>
      <td className="tp-cart-price">
        <span>
          {pricePrd[0].toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </td>
      {/* <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" value={0} readOnly />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td> */}

      <td className="tp-cart-add-to-cart">
        <button
          onClick={async () => {
            await router.push(`/product-details/${product.slug}?style=0`);
          }}
          type="button"
          className="tp-btn tp-btn-2 tp-btn-blue"
        >
          Xem Chi Tiết
        </button>
      </td>

      <td className="tp-cart-action">
        <button
          onClick={() => removeProduct(product._id, style)}
          className="tp-cart-action-btn"
        >
          <Close />
          <span> Xóa</span>
        </button>
      </td>
    </tr>
  );
};

export default WishlistItem;
