import React from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetTopRatedProductsQuery } from "@/redux/features/productApi";
import ShopTopRatedLoader from "@/components/loader/shop/top-rated-prd-loader";

const TopRatedProducts = ({ productsFeatured }) => {
  const { data: products, isError, isLoading } = useGetTopRatedProductsQuery();
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopTopRatedLoader loading={isLoading} />;
  } else if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data.slice(0, 3);
    console.log("productsFeatured", productsFeatured);
    content = productsFeatured.map((item) => {
      const imgProduct = item ? item.subProducts[0].images[0].url : null;
      const pricePrd = item?.subProducts[0]?.sizes
        .map((s) => s.price)
        .sort((a, b) => a - b);
      return (
        <div
          key={item.slug}
          className="tp-shop-widget-product-item d-flex align-items-center"
        >
          <div className="tp-shop-widget-product-thumb">
            <Link href={`/product-details/${item.slug}`}>
              <Image
                src={imgProduct}
                alt="product img"
                width={70}
                height={70}
              />
            </Link>
          </div>
          <div className="tp-shop-widget-product-content">
            <div className="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
              <div className="tp-shop-widget-product-rating">
                <Rating
                  allowFraction
                  size={16}
                  initialValue={item.rating}
                  readonly={true}
                />
              </div>
              <div className="tp-shop-widget-product-rating-number">
                <span>({item.rating})</span>
              </div>
            </div>
            <h4 className="tp-shop-widget-product-title">
              <Link href={`/product-details/${item.slug}`}>
                {item.name.substring(0, 20)}...
              </Link>
            </h4>
            <div className="tp-shop-widget-product-price-wrapper">
              <span className="tp-shop-widget-product-price">
                {pricePrd &&
                  pricePrd.length > 0 &&
                  (
                    (pricePrd[0] * (100 - item?.subProducts[0].discount)) /
                    100
                  ).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
              </span>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Sản Phẩm Được Đánh Giá Cao</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-product">{content}</div>
        </div>
      </div>
    </>
  );
};

export default TopRatedProducts;
