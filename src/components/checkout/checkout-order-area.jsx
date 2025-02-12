import { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";

const CheckoutOrderArea = ({
  checkoutData,
  cart,
  totalAfterDiscount,
  discount,
  placeOrderHanlder,
}) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    stripe,
    isCheckoutSubmit,
    clientSecret,
    register,
    errors,
    showCard,
    setShowCard,
    shippingCost,
    discountAmount,
  } = checkoutData;
  // const { cart_products } = useSelector((state) => state.cart);
  const subTotal = cart.cartTotal;
  const cart_products = cart.products;

  const { total } = useCartInfo();
  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Đơn Hàng Của Bạn</h3>

      <div className="tp-order-info-list">
        <ul>
          {/*  header */}
          <li className="tp-order-info-list-header">
            <h4>Sản phẩm</h4>
            <h4>Tổng Cộng</h4>
          </li>

          {/*  item list */}
          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.name.length > 30
                  ? item.name.slice(0, 30) + "..."
                  : item.name}{" "}
                <span> x {item.qty}</span>
              </p>
              <span>
                {(item.price * item.qty).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </li>
          ))}

          {/*  shipping */}
          <li className="tp-order-info-list-shipping">
            <span>Vận Chuyển</span>
            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_shipping"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(30000)}
                  htmlFor="flat_shipping"
                >
                  Giao Hàng Nhanh: <span>30.000 VND</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                />
                <label
                  onClick={() => handleShippingCost(15000)}
                  htmlFor="flat_rate"
                >
                  Giao Hàng Tiết Kiệm: <span>15.000 VND</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li>

          {/*  subtotal */}
          <li className="tp-order-info-list-subtotal">
            <span>Tạm Tính</span>
            <span>
              {subTotal.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </li>

          {/*  shipping cost */}
          <li className="tp-order-info-list-subtotal">
            <span>Phí Vận Chuyển</span>
            <span>
              {shippingCost.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </li>

          {/* discount */}
          <li className="tp-order-info-list-subtotal">
            <span>Giảm Giá</span>
            <span>
              {discount
                ? (cart.cartTotal - totalAfterDiscount).toLocaleString(
                    "it-IT",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )
                : 0}
            </span>
          </li>

          {/* total */}
          <li className="tp-order-info-list-total">
            <span>Tổng Cộng</span>
            <span>
              {totalAfterDiscount
                ? totalAfterDiscount.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                : cart.cartTotal.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
            </span>
          </li>
        </ul>
      </div>
      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            type="radio"
            id="back_transfer"
            name="payment"
            value="Card"
          />
          <label
            onClick={() => setShowCard(true)}
            htmlFor="back_transfer"
            data-bs-toggle="direct-bank-transfer"
          >
            Thẻ Tín Dụng
          </label>
          {showCard && (
            <div className="direct-bank-transfer">
              <div className="payment_card">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>

        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type="radio"
            id="atm"
            name="payment"
            value="ATM"
          />
          <label htmlFor="atm">Thanh Toán Bằng Thẻ Ngân Hàng</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>

        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type="radio"
            id="cod"
            name="payment"
            value="cash"
          />
          <label htmlFor="cod">Thanh Toán Khi Nhận Hàng</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          // disabled={!stripe || isCheckoutSubmit}
          className="tp-checkout-btn w-100"
          // onClick={placeOrderHanlder}
        >
          Đặt Hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
