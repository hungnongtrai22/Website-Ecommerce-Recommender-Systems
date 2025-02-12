import React from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { emptyCart } from "@/redux/features/cartSlice";
import { saveCart } from "@/requests/user";

const CartCheckout = ({ subTotal }) => {
  const { total } = useCartInfo();
  const router = useRouter();
  const { data: session } = useSession();
  const [shipCost, setShipCost] = useState(0);
  const dispatch = useDispatch();
  const { cart_products } = useSelector((state) => state.cart);
  // handle shipping cost
  const handleShippingCost = (value) => {
    if (value === "free") {
      setShipCost(0);
    } else {
      setShipCost(value);
    }
  };
  const saveCartToDbHandler = async () => {
    if (session) {
      const res = await saveCart(cart_products);
      dispatch(emptyCart());
      await router.push("/checkout");
    } else {
      signIn();
    }
  };
  return (
    <div className="tp-cart-checkout-wrapper">
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">Tạm Tính</span>
        <span className="tp-cart-checkout-top-price">
          {subTotal.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className="tp-cart-checkout-shipping">
        <h4 className="tp-cart-checkout-shipping-title">Vận Chuyển</h4>
        <div className="tp-cart-checkout-shipping-option-wrapper">
          <div className="tp-cart-checkout-shipping-option">
            <input id="flat_rate" type="radio" name="shipping" />
            <label
              htmlFor="flat_rate"
              onClick={() => handleShippingCost(15000)}
            >
              Nhanh: <span>15.000 VND</span>
            </label>
          </div>
          <div className="tp-cart-checkout-shipping-option">
            <input id="local_pickup" type="radio" name="shipping" />
            <label
              htmlFor="local_pickup"
              onClick={() => handleShippingCost(30000)}
            >
              Hỏa Tốc: <span> 30.000 VND</span>
            </label>
          </div>
          <div className="tp-cart-checkout-shipping-option">
            <input id="free_shipping" type="radio" name="shipping" />
            <label
              onClick={() => handleShippingCost("free")}
              htmlFor="free_shipping"
            >
              Miễn Phí
            </label>
          </div>
        </div>
      </div>
      <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
        <span>Tổng Cộng</span>
        <span>
          {(subTotal + shipCost).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className="tp-cart-checkout-proceed">
        <button
          className="tp-cart-checkout-btn w-100"
          onClick={() => saveCartToDbHandler()}
        >
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default CartCheckout;
