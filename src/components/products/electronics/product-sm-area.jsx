import React from "react";
// internal
import { ShapeLineSm } from "@/svg";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import ProductSmItem from "./product-sm-item";
import HomeSmPrdLoader from "@/components/loader/home/home-sm-prd-loader";

const ProductSmArea = ({
  productsDiscount,
  productsFeatured,
  productsSelling,
}) => {
  const {
    data: products,
    isError,
    // isLoading,
    refetch,
  } = useGetProductTypeQuery({ type: "electronics" });
  // decide what to render
  let content = null;
  const isLoading = false;

  if (isLoading) {
    content = <HomeSmPrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (productsDiscount?.length > 0) {
    // const discount_prd = products.data
    //   .filter((p) => p.discount > 0)
    //   .slice(0, 3);
    // const featured_prd = products.data.filter((p) => p.featured).slice(0, 3);
    // const selling_prd = products.data
    //   .slice()
    //   .sort((a, b) => b.sellCount - a.sellCount)
    //   .slice(0, 3);
    content = (
      <div className="row">
        <div className="col-xl-4 col-md-6">
          <div className="tp-product-sm-list mb-50">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title tp-section-title-sm">
                Sản Phẩm Giảm Giá
                {/* <ShapeLineSm /> */}
              </h3>
            </div>
            <div className="tp-product-sm-wrapper mr-20">
              {productsDiscount.map((item) => (
                <ProductSmItem key={item._id} product={item} prd={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6">
          <div className="tp-product-sm-list mb-50">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title tp-section-title-sm">
                Sản Phẩm Nổi Bật
                {/* <ShapeLineSm /> */}
              </h3>
            </div>

            <div className="tp-product-sm-wrapper mr-20">
              {productsFeatured.map((item) => (
                <ProductSmItem key={item._id} product={item} prd={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6">
          <div className="tp-product-sm-list mb-50">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title tp-section-title-sm">
                Sản Phẩm Bán Chạy
                {/* <ShapeLineSm /> */}
              </h3>
            </div>

            <div className="tp-product-sm-wrapper mr-20">
              {productsSelling.map((item) => (
                <ProductSmItem key={item._id} product={item} prd={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section className="tp-product-sm-area">
      <div className="container">{content}</div>
    </section>
  );
};

export default ProductSmArea;
