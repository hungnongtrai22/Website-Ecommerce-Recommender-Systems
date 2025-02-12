import { useState } from "react";
import { useSelector } from "react-redux";
import CheckoutBillingArea from "./checkout-billing-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";

const CheckoutAddress = ({ setAddresses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { coupon_info } = useSelector((state) => state.coupon);
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
  return (
    <div className="tp-checkout-verify-item">
      <p className="tp-checkout-verify-reveal">
        Bạn muốn thêm địa chỉ giao hàng mới?{" "}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="tp-checkout-coupon-form-reveal-btn"
        >
          Bấm vào đây để thêm địa chỉ giao hàng của bạn
        </button>
      </p>

      {isOpen && (
        <div id="tpCheckoutCouponForm" className="tp-return-customer">
          <CheckoutBillingArea
            register={register}
            errors={errors}
            setAddresses={setAddresses}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default CheckoutAddress;
