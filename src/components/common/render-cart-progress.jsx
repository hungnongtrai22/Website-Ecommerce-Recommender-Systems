import React from "react";
import useCartInfo from "@/hooks/use-cart-info";
import { useDispatch, useSelector } from "react-redux";

const RenderCartProgress = () => {
  // const { total } = useCartInfo();
  const { cart } = useSelector((state) => ({ ...state }));
  const total =
    cart?.cart_products?.reduce((a, c) => a + c.price * c.qty, 0) || 0;
  const freeShippingThreshold = 500000;
  const progress = (total / freeShippingThreshold) * 100;
  if (total < freeShippingThreshold) {
    const remainingAmount = freeShippingThreshold - total;
    return (
      <>
        <p>{`Add $${remainingAmount.toFixed(
          2
        )} more to qualify for free shipping`}</p>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            data-width={`${progress}%`}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </>
    );
  }
  return (
    <>
      <p> Bạn đủ điều kiện để được miễn phí vận chuyển!</p>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          data-width={`${progress}%`}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
};

export default RenderCartProgress;
