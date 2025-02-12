import { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutCoupon = ({
  handleCouponCode,
  couponRef,
  couponApplyMsg,
  setCoupon,
  applyCouponHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { coupon_info } = useSelector((state) => state.coupon);
  return (
    <div className="tp-checkout-verify-item">
      <p className="tp-checkout-verify-reveal">
        Có phiếu giảm giá?{" "}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="tp-checkout-coupon-form-reveal-btn"
        >
          Bấm vào đây để nhập mã của bạn
        </button>
      </p>

      {isOpen && (
        <div id="tpCheckoutCouponForm" className="tp-return-customer">
          <form onSubmit={handleCouponCode}>
            <div className="tp-return-customer-input">
              <label>Mã Giảm Giá :</label>
              <input
                ref={couponRef}
                type="text"
                placeholder="Mã giảm giá"
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="tp-return-customer-btn tp-checkout-btn"
              onClick={() => {
                applyCouponHandler();
              }}
            >
              Áp Dụng
            </button>
          </form>
          {couponApplyMsg && (
            <p className="p-2" style={{ color: "green" }}>
              {couponApplyMsg}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutCoupon;
