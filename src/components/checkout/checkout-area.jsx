import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
// internal
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutCoupon from "./checkout-coupon";
import CheckoutLogin from "./checkout-login";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddressCard from "./AddressCard";
import CheckoutAddress from "./checkout-address";
import { notifyError, notifySuccess } from "@/utils/toast";
import { applyCoupon } from "@/requests/user";
import { useRouter } from "next/router";

import axios from "axios";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const CheckoutArea = ({ addresses, cart, setAddresses, selectedAddress }) => {
  const checkoutData = useCheckoutSubmit();
  const {
    handleSubmit,
    submitHandler,
    register,
    errors,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
  } = checkoutData;
  // const { cart_products } = useSelector((state) => state.cart);
  const cart_products = cart.products;
  const router = useRouter();

  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState();
  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon);
    if (res.message) {
      notifyError(res.message);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      notifySuccess("Thêm mã giảm giá thành công");
    }
  };
  const placeOrderHanlder = async (data) => {
    // console.log("payment", data);
    const paymentMethod = data.payment;
    // if (paymentMethod == "ATM") {
    //   router.push("https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder");
    // }
    try {
      // paymentMethod = "cash";
      console.log("selected", selectedAddress);
      if (!selectedAddress) {
        notifyError("Vui lòng chọn địa chỉ giao hàng.");
        return;
      }
      const totalBeforeDiscount = cart.cartTotal;
      const { data } = await axios.post("/api/order/create", {
        products: cart_products.map((p) => ({ ...p, isReview: false })),
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
        totalBeforeDiscount: totalBeforeDiscount,
        couponApplied: coupon,
      });
      for (const product of cart_products) {
        const res = await axios.post(`/api/product/${product.product}`, {
          sizeToUpdate: product.size,
          updateQtyValue: product.qty,
          sku: product.sku,
        });
      }
      if (paymentMethod == "ATM") {
        const payURL = await axios.post(
          "http://localhost:8888/order/create_payment_url",
          {
            orderId: data.order_id,
            amount:
              totalAfterDiscount !== ""
                ? totalAfterDiscount
                : totalBeforeDiscount,
            bankCode: "VNBANK",
            language: "vn",
          }
        );
        console.log("PayemtURL", payURL.data);
        // notifySuccess("URL: " + payURL.data);
        router.push(payURL.data);
      } else {
        router.push(`/order/${data.order_id}`);
      }
    } catch (error) {
      notifyError("Error: " + error?.response?.data?.message);
    }
  };

  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cart_products.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link href="/shop" className="tp-checkout-btn">
                Return to shop
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  {/* <CheckoutLogin /> */}
                  <CheckoutCoupon
                    handleCouponCode={handleCouponCode}
                    couponRef={couponRef}
                    couponApplyMsg={couponApplyMsg}
                    setCoupon={setCoupon}
                    applyCouponHandler={applyCouponHandler}
                  />
                  <CheckoutAddress
                    handleCouponCode={handleCouponCode}
                    couponRef={couponRef}
                    couponApplyMsg={couponApplyMsg}
                    setAddresses={setAddresses}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit(placeOrderHanlder)}>
                <div className="row">
                  <div className="col-lg-7">
                    {/* <CheckoutBillingArea register={register} errors={errors} /> */}

                    <div
                      className="tp-checkout-bill-area"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="row">
                        <h3 className="tp-checkout-bill-title">
                          Danh Sách Địa Chỉ Giao Hàng
                        </h3>
                        {addresses.map((address) => (
                          <div className="col-lg-6">
                            <AddressCard
                              address={address}
                              cart={cart}
                              setAddresses={setAddresses}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <CheckoutOrderArea
                      checkoutData={checkoutData}
                      cart={cart}
                      totalAfterDiscount={totalAfterDiscount}
                      discount={discount}
                      placeOrderHanlder={placeOrderHanlder}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
