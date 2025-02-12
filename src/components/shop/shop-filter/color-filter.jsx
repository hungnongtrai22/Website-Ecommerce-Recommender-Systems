import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopColorLoader from "@/components/loader/shop/color-filter-loader";

const ColorFilter = ({ setCurrPage, shop_right = false, colors }) => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const router = useRouter();
  const dispatch = useDispatch();
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
  const colorHandler = (color) => {
    filter({ color });
  };
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
  // handle color
  const handleColor = (clr) => {
    setCurrPage(1);
    router.push(
      `/${shop_right ? "shop-right-sidebar" : "shop"}?color=${clr
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
    content = <ShopColorLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data;
    let allColor = [];
    product_items.forEach((product) => {
      let uniqueColor = new Set(product.imageURLs.map((item) => item?.color));
      allColor = [...new Set([...allColor, ...uniqueColor])];
    });

    let uniqueColors = [
      ...new Map(allColor.map((color) => [color?.name, color])).values(),
    ];

    console.log("colors", colors);

    content = colors.map((item, i) => {
      const check = replaceQuery("color", item);
      if (item) {
        return (
          <li key={i}>
            <div className="tp-shop-widget-checkbox-circle">
              <input
                type="checkbox"
                id={item}
                checked={
                  // router.query.color ===
                  // item.toLowerCase().replace("&", "").split(" ").join("-")
                  //   ? "checked"
                  //   : false
                  check.active ? "checked" : false
                }
                readOnly
              />
              <label onClick={() => colorHandler(check.result)} htmlFor={item}>
                {item}
              </label>
              <span
                style={{ backgroundColor: `${item}` }}
                className="tp-shop-widget-checkbox-circle-self"
              ></span>
            </div>
            <span className="tp-shop-widget-checkbox-circle-number">
              {
                product_items
                  .map((p) => p.imageURLs)
                  .flat()
                  .filter((i) => i?.color?.name === item?.name).length
              }
            </span>
          </li>
        );
      }
    });
  }

  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Màu Sắc</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-checkbox-circle-list">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorFilter;
