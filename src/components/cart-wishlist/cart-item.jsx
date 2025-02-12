import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  quantityDecrement,
  remove_product,
  updateCart,
} from "@/redux/features/cartSlice";

const CartItem = ({ product }) => {
  const { _id, img, title, name, price, orderQuantity = 0 } = product || {};
  const { cart } = useSelector((state) => ({ ...state }));
  console.log("Cart", product);

  const dispatch = useDispatch();
  const updateQty = (type) => {
    let newCart = cart.cart_products.map((p) => {
      if (p._uid == product._uid) {
        return {
          ...p,
          qty: type == "plus" ? product.qty + 1 : product.qty - 1,
        };
      }
      return p;
    });
    dispatch(updateCart(newCart));
  };

  const removeProduct = (id) => {
    let newCart = cart.cart_products.filter((p) => p._uid != id);
    dispatch(updateCart(newCart));
  };

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
    dispatch(remove_product(prd));
  };

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image
            src={product.images[0].url}
            alt="product img"
            width={70}
            height={100}
          />
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title">
        <Link href={`/product-details/${_id}`}>{name}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>
          {product.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            // onClick={() => handleDecrement(product)}
            onClick={() => updateQty("minus")}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={product.qty}
            readOnly
          />
          <span
            // onClick={() => handleAddProduct(product)}
            onClick={() => updateQty("plus")}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>
          {(product.price * product.qty).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </td>
      {/* action */}
      <td className="tp-cart-action">
        <button
          // onClick={() => handleRemovePrd({ title, id: _id })}
          onClick={() => removeProduct(product._uid)}
          className="tp-cart-action-btn"
        >
          <Close />
          <span> Xóa</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
