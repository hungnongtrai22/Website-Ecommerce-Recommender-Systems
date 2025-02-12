import Link from "next/link";
import React from "react";
import ForgotForm from "../forms/forgot-form";
import LoginShapes from "./login-shapes";
import CheckOrderForm from "../forms/check-order-form";

const CheckOrderArea = () => {
  return (
    <section className="tp-login-area pb-140 p-relative z-index-1 fix">
      <LoginShapes />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="tp-login-wrapper">
              <div className="tp-login-top text-center mb-30">
                <h3 className="tp-login-title">Kiểm tra đơn hàng</h3>
                <p>Nhập mã đơn hàng của bạn đã đặt để kiểm tra đơn hàng.</p>
              </div>
              <div className="tp-login-option">
                {/* form start */}
                <CheckOrderForm />
                {/* form end */}
                {/* <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-center">
                  <div className="tp-login-forgot">
                    <span>
                      Bạn có nhớ mật khẩu không?{" "}
                      <Link href="/login"> Đăng Nhập</Link>
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOrderArea;
