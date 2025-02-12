import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

const ProductSmItem = ({ product, prd }) => {
  const { _id, img, category, title, price, reviews } = product || {};
  const [ratingVal, setRatingVal] = useState(0);
  const imgProduct = prd ? prd.subProducts[0].images[0].url : null;
  const pricePrd = prd?.subProducts[0]?.sizes
    .map((s) => s.price)
    .sort((a, b) => a - b);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  return (
    <div className="tp-product-sm-item d-flex align-items-center">
      <div className="tp-product-thumb mr-25 fix">
        <Link href={`/product-details/${prd?.slug || _id}?style=0`}>
          <Image
            src={imgProduct || img}
            alt="product img"
            width={140}
            height={140}
          />
        </Link>
      </div>
      <div className="tp-product-sm-content">
        <div className="tp-product-category">
          <a href="#">{prd?.category?.name || category?.name}</a>
        </div>
        <h3 className="tp-product-title">
          <Link href={`/product-details/${prd?.slug}?style=0`}>
            {prd?.name.slice(0, 26) || title}
          </Link>
        </h3>
        <div className="tp-product-rating d-sm-flex align-items-center">
          <div className="tp-product-rating-icon">
            <Rating
              allowFraction
              size={16}
              initialValue={prd?.rating || ratingVal}
              readonly={true}
            />
          </div>
          <div className="tp-product-rating-text">
            (
            {prd?.numReviews ||
              (reviews && reviews.length > 0 ? reviews.length : 0)}{" "}
            Đánh Giá)
          </div>
        </div>
        <div className="tp-product-price-wrapper">
          <span className="tp-product-price">
            {(pricePrd &&
              pricePrd.length > 0 &&
              (
                (pricePrd[0] * (100 - prd?.subProducts[0].discount)) /
                100
              ).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })) ||
              price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductSmItem;
