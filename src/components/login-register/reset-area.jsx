import Link from "next/link";
import React from "react";
import ForgotForm from "../forms/forgot-form";
import LoginShapes from "./login-shapes";
import ResetForm from "../forms/reset-form";

const ResetArea = ({ user_id }) => {
  return (
    <section className="tp-login-area pb-140 p-relative z-index-1 fix">
      <LoginShapes />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="tp-login-wrapper">
              <div className="tp-login-top text-center mb-30">
                <h3 className="tp-login-title">Đặt Lại Mật Khẩu</h3>
                <p>Nhập mật khẩu mới của bạn để đặt lại mật khẩu.</p>
              </div>
              <div className="tp-login-option">
                {/* form start */}
                <ResetForm user_id={user_id} />
                {/* form end */}
                <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-center">
                  <div className="tp-login-forgot">
                    <span>
                      Bạn có nhớ mật khẩu không?{" "}
                      <Link href="/login"> Đăng Nhập</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetArea;
