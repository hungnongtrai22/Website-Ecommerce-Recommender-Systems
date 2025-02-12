import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Rating } from "react-simple-star-rating";

const ReviewItem = ({ review }) => {
  console.log("Review", review);
  const { review: comment, createdAt, rating, userId } = review || {};
  return (
    <div className="tp-product-details-review-avater d-flex align-items-start">
      <div className="tp-product-details-review-avater-thumb">
        {!review?.reviewBy?.image && (
          <h5 className="review-name">{review.reviewBy.name}</h5>
        )}
        <a href="#">
          {review?.reviewBy?.image && (
            <Image
              src={review?.reviewBy?.image}
              alt="user img"
              width={60}
              height={60}
            />
          )}
        </a>
      </div>
      <div className="tp-product-details-review-avater-content">
        <div className="tp-product-details-review-avater-rating d-flex align-items-center">
          <Rating
            allowFraction
            size={16}
            initialValue={rating}
            readonly={true}
          />
        </div>
        <h3 className="tp-product-details-review-avater-title">
          {review.reviewBy.name || userId?.name}
        </h3>
        <span className="tp-product-details-review-avater-meta">
          {dayjs(createdAt).format("MMMM D, YYYY")}
        </span>

        <div className="tp-product-details-review-avater-comment">
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
