import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import * as Yup from "yup";
// internal
import ErrorMsg from "../common/error-msg";
import { useAddReviewMutation } from "@/redux/features/reviewApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import axios from "axios";

// schema
const schema = Yup.object().shape({
  // name: Yup.string().required().label("Name"),
  // email: Yup.string().required().email().label("Email"),
  comment: Yup.string().required().label("Comment"),
});

const ReviewForm = ({ product_id, orderId }) => {
  console.log("orderId", orderId);

  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [addReview, {}] = useAddReviewMutation();

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // on submit
  const onSubmit = async (data) => {
    // if (!user) {
    //   notifyError("Please login first");
    //   return;
    // } else {
    //   addReview({
    //     userId: user?._id,
    //     productId: product_id,
    //     rating: rating,
    //     comment: data.comment,
    //   }).then((result) => {
    //     if (result?.error) {
    //       notifyError(result?.error?.data?.message);
    //     } else {
    //       notifySuccess(result?.data?.message);
    //     }
    //   });
    // }
    const res1 = await axios.put(`/api/product/${product_id}/review`, {
      rating,
      review: data.comment,
    });
    const res2 = await axios.put(`/api/order/${orderId}/changeIsReview`, {
      productId: product_id,
    });
    notifySuccess("Thêm đánh giá thành công");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-product-details-review-form-rating d-flex align-items-center">
        <p>Đánh Giá Của Bạn :</p>
        <div className="tp-product-details-review-form-rating-icon d-flex align-items-center">
          <Rating
            onClick={handleRating}
            allowFraction
            size={16}
            initialValue={rating}
          />
        </div>
      </div>
      <div className="tp-product-details-review-input-wrapper">
        <div className="tp-product-details-review-input-box">
          <div className="tp-product-details-review-input">
            <textarea
              {...register("comment", { required: `Comment is required!` })}
              id="comment"
              name="comment"
              placeholder="Viết nhận xét của bạn ở đây..."
            />
          </div>
          <div className="tp-product-details-review-input-title">
            <label htmlFor="msg">Nhận Xét Của Bạn</label>
          </div>
          <ErrorMsg msg={errors.name?.comment} />
        </div>
        {/* <div className="tp-product-details-review-input-box">
          <div className="tp-product-details-review-input">
            <input
              {...register("name", { required: `Name is required!` })}
              name="name"
              id="name"
              type="text"
              placeholder="Nhập tên của bạn tại đây"
            />
          </div>
          <div className="tp-product-details-review-input-title">
            <label htmlFor="name">Tên Của Bạn</label>
          </div>
          <ErrorMsg msg={errors.name?.name} />
        </div> */}
        {/* <div className="tp-product-details-review-input-box">
          <div className="tp-product-details-review-input">
            <input
              {...register("email", { required: `Name is required!` })}
              name="email"
              id="email"
              type="email"
              placeholder="Nhập email của bạn tại đây"
            />
          </div>
          <div className="tp-product-details-review-input-title">
            <label htmlFor="email">Email Của Bạn</label>
          </div>
          <ErrorMsg msg={errors.name?.email} />
        </div> */}
      </div>
      <div className="tp-product-details-review-btn-wrapper">
        <button type="submit" className="tp-product-details-review-btn">
          Đánh Giá
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
