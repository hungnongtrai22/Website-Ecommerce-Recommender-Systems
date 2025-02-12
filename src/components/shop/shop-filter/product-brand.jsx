import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetActiveBrandsQuery } from "@/redux/features/brandApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopBrandLoader from "@/components/loader/shop/shop-brand-loader";
const ProductBrand = ({ setCurrPage, shop_right = false, brands }) => {
  const { data, isError, isLoading } = useGetActiveBrandsQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  function replaceQuery(queryName, value) {
    const existedQuery = router.query[queryName];
    const valueCheck = existedQuery?.search(value);
    const _check = existedQuery?.search(`_${value}`);
    let result = "";
    if (existedQuery) {
      if (existedQuery == value) {
        result = {};
      } else {
        if (valueCheck !== -1) {
          if (_check !== -1) {
            result = existedQuery?.replace(`_${value}`, "");
          } else if (valueCheck == 0) {
            result = existedQuery?.replace(`${value}_`, "");
          } else {
            result = existedQuery?.replace(value, "");
          }
        } else {
          result = `${existedQuery}_${value}`;
        }
      }
    } else {
      result = value;
    }
    return { result, active: existedQuery && valueCheck !== -1 ? true : false };
  }
  const filter = ({
    search,
    category,
    brand,
    style,
    size,
    color,
    pattern,
    material,
    gender,
    price,
    shipping,
    rating,
    sort,
    page,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    if (size) query.size = size;
    if (color) query.color = color;
    if (pattern) query.pattern = pattern;
    if (material) query.material = material;
    if (gender) query.gender = gender;
    if (price) query.price = price;
    if (shipping) query.shipping = shipping;
    if (rating) query.rating = rating;
    if (sort) query.sort = sort;
    if (page) query.page = page;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const brandHandler = (brand) => {
    filter({ brand });
  };
  // handle brand route
  const handleBrandRoute = (brand) => {
    setCurrPage(1);
    router.push(
      `/${shop_right ? "shop-right-sidebar" : "shop"}?brand=${brand
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    );
    dispatch(handleFilterSidebarClose());
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopBrandLoader loading={isLoading} />;
  } else if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!isLoading && !isError && brands?.length === 0) {
    content = <ErrorMsg msg="No Brands found!" />;
  } else if (!isLoading && !isError && brands?.length > 0) {
    // const all_brands = brands.result;
    // const sortedBrands = all_brands
    //   .slice()
    //   .sort((a, b) => b.products.length - a.products.length);
    // const brand_items = sortedBrands.slice(0, 6);

    content = brands.map((b) => {
      const check = replaceQuery("brand", b);

      return (
        <div key={b._id} className="tp-shop-widget-brand-item">
          <a
            onClick={() => brandHandler(check.result)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={`/images/brands/${b.toLowerCase()}.png`}
              alt="brand"
              width={60}
              height={50}
            />
          </a>
        </div>
      );
    });
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Thương Hiệu Nổi Tiếng</h3>
        <div className="tp-shop-widget-content ">
          <div className="tp-shop-widget-brand-list d-flex align-items-center justify-content-between flex-wrap">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBrand;
