import React, { useState } from "react";
import { useDispatch } from "react-redux";
// internal
import { Filter } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import { handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";
import { useRouter } from "next/router";

const ShopTopRight = ({ selectHandleFilter }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [sort, setSort] = useState("");
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
  const sortHandler = (sort) => {
    if (sort == "") {
      filter({ sort: {} });
    } else {
      filter({ sort });
    }
  };
  const options = [
    { value: "", text: "Gợi ý" },
    { value: "popular", text: "Phổ Biến Nhất" },
    { value: "newest", text: "Mới Cập Nhập" },
    { value: "topSelling", text: "Bán Chạy Nhất" },
    { value: "topReviewed", text: "Đánh Giá Cao" },
    { value: "priceLowToHigh", text: "Giá (thấp đến cao)" },
    { value: "priceHighToLow", text: "Giá (cao đến thấp)" },
  ];
  const defaultCurrent = () => {
    const sortQuery = router.query.sort || "";
    if (sortQuery == "") {
      return 0;
    }
    for (let i = 0; i < options.length; i++) {
      if (sortQuery == options[i].value) {
        return i;
      }
    }
    return 0;
  };
  return (
    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
      <div className="tp-shop-top-select">
        <NiceSelect
          options={options}
          defaultCurrent={defaultCurrent()}
          onChange={(e) => sortHandler(e.value)}
          name="Default Sorting"
        />
      </div>
      <div className="tp-shop-top-filter">
        <button
          onClick={() => dispatch(handleFilterSidebarOpen())}
          type="button"
          className="tp-filter-btn"
        >
          <span>
            <Filter />
          </span>{" "}
          Lọc
        </button>
      </div>
    </div>
  );
};

export default ShopTopRight;
