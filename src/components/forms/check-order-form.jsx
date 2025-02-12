import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// internal
import ErrorMsg from "../common/error-msg";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import axios from "axios";
import { useRouter } from "next/router";

// schema
const schema = Yup.object().shape({
  orderId: Yup.string().required().label("orderId"),
});

const CheckOrderForm = () => {
  const [resetPassword, {}] = useResetPasswordMutation();
  const router = useRouter();
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
    // resetPassword({
    //   verifyEmail: data.email,
    // }).then((result) => {
    //   if (result?.error) {
    //     notifyError(result?.error?.data?.message);
    //   } else {
    //     notifySuccess(result.data?.message);
    //   }
    // });
    try {
      const { data } = await axios.get(`/api/order/${result.orderId}/check`);
      // console.log(data);
      await router.push("/order/" + result.orderId);
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("orderId", { required: `Order Id is required!` })}
              name="orderId"
              id="orderId"
              type="text"
              placeholder="Nhập mã đơn hàng của bạn tại đây"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="orderId">Mã đơn hàng</label>
          </div>
          <ErrorMsg msg={errors.orderId?.message} />
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

export default CheckOrderForm;
