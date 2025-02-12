import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// internal
import ErrorMsg from "../common/error-msg";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import axios from "axios";
import { signIn } from "next-auth/react";

// schema
const schema = Yup.object().shape({
  password: Yup.string().required().label("Password"),
  confirmPassowrd: Yup.string().required().label("ConfirmPassword"),
});

const ResetForm = ({ user_id }) => {
  const [resetPassword, {}] = useResetPasswordMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = async (result) => {
    console.log("reset", result.password, result.confirmPassowrd);
    try {
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password: result.password,
      });
      const options = {
        redirect: false,
        email: data.email,
        password: result.password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      notifyError(error.response.data.message);
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("password", { required: `password is required!` })}
              name="password"
              id="password"
              type="password"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="password">Mật Khẩu Của Bạn</label>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>
      </div>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("confirmPassowrd", {
                required: `Confirm Password is required!`,
              })}
              name="confirmPassowrd"
              id="confirmPassowrd"
              type="password"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="confirmPassowrd">Xác Nhận Mật Khẩu</label>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>
      </div>
      <div className="tp-login-bottom mb-15">
        <button type="submit" className="tp-login-btn w-100">
          Xác Nhận
        </button>
      </div>
    </form>
  );
};

export default ResetForm;
