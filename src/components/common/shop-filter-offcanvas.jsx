import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryFilter from "../shop/shop-filter/category-filter";
import ColorFilter from "../shop/shop-filter/color-filter";
import PriceFilter from "../shop/shop-filter/price-filter";
import ProductBrand from "../shop/shop-filter/product-brand";
import StatusFilter from "../shop/shop-filter/status-filter";
import TopRatedProducts from "../shop/shop-filter/top-rated-products";
import {
  handleFilterSidebarClose,
  handleFilterSidebarOpen,
} from "@/redux/features/shop-filter-slice";
import ResetButton from "../shop/shop-filter/reset-button";
import { useRouter } from "next/router";

const ShopFilterOffCanvas = ({
  all_products,
  otherProps,
  right_side = false,
  categories,
  sizes,
  colors,
  productsFeatured,
  brands,
}) => {
  const { priceFilterValues, setCurrPage, priceHandler } = otherProps;
  const { filterSidebar } = useSelector((state) => state.shopFilter);
  const dispatch = useDispatch();
  const maxPrice = 10000000;

  // priceHandler(10, 100);

  // max price
  // const maxPrice = all_products.reduce((max, product) => {
  //   return product.price > max ? product.price : max;
  // }, 0);
  // productPriceChange(0, 1000);

  return (
    <>
      <div
        className={`tp-filter-offcanvas-area ${
          filterSidebar ? "offcanvas-opened" : ""
        }`}
      >
        <div className="tp-filter-offcanvas-wrapper">
          <div className="tp-filter-offcanvas-close">
            <button
              type="button"
              onClick={() => dispatch(handleFilterSidebarOpen())}
              className="tp-filter-offcanvas-close-btn filter-close-btn"
            >
              <i className="fa-solid fa-xmark"></i> Close
            </button>
          </div>
          <div className="tp-shop-sidebar">
            {/* filter */}
            <PriceFilter
              priceFilterValues={priceFilterValues}
              maxPrice={maxPrice}
            />
            {/* status */}
            <StatusFilter
              setCurrPage={setCurrPage}
              shop_right={right_side}
              sizes={sizes}
            />
            {/* categories */}

            <CategoryFilter shop_right={right_side} categories={categories} />
            {/* color */}
            <ColorFilter
              setCurrPage={setCurrPage}
              shop_right={right_side}
              colors={colors}
            />
            {/* product rating */}
            <TopRatedProducts productsFeatured={productsFeatured} />
            {/* brand */}
            <ProductBrand
              setCurrPage={setCurrPage}
              shop_right={right_side}
              brands={brands}
            />
            {/* reset filter */}
            <ResetButton shop_right={right_side} />
          </div>
        </div>
      </div>

      {/* overlay start */}
      <div
        onClick={() => dispatch(handleFilterSidebarClose())}
        className={`body-overlay ${filterSidebar ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default ShopFilterOffCanvas;
