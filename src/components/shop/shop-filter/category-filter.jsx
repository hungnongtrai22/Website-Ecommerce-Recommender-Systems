import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";

const CategoryFilter = ({ shop_right = false, categories }) => {
  const { data, isLoading, isError } = useGetShowCategoryQuery();
  console.log("categoriesTest", categories);
  const router = useRouter();
  const dispatch = useDispatch();

  // const dataTest = [
  //   {
  //     _id: "62c46ff0062128444ad59193",
  //     name: "Thời Trang Nữ",
  //     slug: "women's-clothing",
  //     createdAt: "2022-07-05T17:08:00.067Z",
  //     updatedAt: "2022-07-05T17:08:00.067Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "62cfeb1e119f0cd432b478d6",
  //     name: "Thời Trang Nam",
  //     slug: "men's-clothing",
  //     createdAt: "2022-07-14T10:08:30.799Z",
  //     updatedAt: "2022-07-14T10:08:30.799Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "62d69f9e60276c9915a995b8",
  //     name: "Thời Trang Nữ",
  //     slug: "women-clothing",
  //     createdAt: "2022-07-19T12:12:14.124Z",
  //     updatedAt: "2022-07-19T12:12:14.124Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "653142d7e4363e03eb9e88a4",
  //     name: "Điện Thoại & Phụ Kiện",
  //     slug: "dien-thoai-and-phu-kien",
  //     createdAt: "2023-10-19T14:53:11.426Z",
  //     updatedAt: "2023-10-19T14:53:11.426Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65314327e4363e03eb9e88ac",
  //     name: "Thiết Bị Điện Tử",
  //     slug: "thiet-bi-djien-tu",
  //     createdAt: "2023-10-19T14:54:31.789Z",
  //     updatedAt: "2023-10-19T14:54:31.789Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "653206d84b802a99a5fa0aa7",
  //     name: "Máy Tính",
  //     slug: "may-tinh",
  //     createdAt: "2023-10-20T04:49:28.443Z",
  //     updatedAt: "2023-10-20T04:50:10.875Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "653206f74b802a99a5fa0ab1",
  //     name: "Máy Ảnh & Máy Quay Phim",
  //     slug: "may-anh",
  //     createdAt: "2023-10-20T04:49:59.877Z",
  //     updatedAt: "2023-10-20T04:50:31.769Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65631d0237abf468528a61b1",
  //     name: "Đá Quý & Đồng Hồ",
  //     slug: "dja-quy-and-djong-ho",
  //     createdAt: "2023-11-26T10:25:06.552Z",
  //     updatedAt: "2023-11-26T10:25:06.552Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6569d2c92cc4299f2966103c",
  //     name: "Sắc Đẹp, Sức Khỏe & Tóc",
  //     slug: "sac-djep-suc-khoe-and-toc",
  //     createdAt: "2023-12-01T12:34:17.255Z",
  //     updatedAt: "2023-12-01T12:34:17.255Z",
  //     __v: 0,
  //   },
  // ];

  // handle category route
  const handleCategoryRoute = (title) => {
    setCurrPage(1);
    router.push(
      `/${shop_right ? "shop-right-sidebar" : "shop"}?category=${title
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    );
    dispatch(handleFilterSidebarClose());
  };
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
  const categoryHandler = (category) => {
    filter({ category });
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.length > 0) {
    // content = categories.map((item) => {
    //   return (
    //     <li key={item._id}>
    //       <a
    //         // onClick={() => handleCategoryRoute(item.parent)}
    //         style={{ cursor: "pointer" }}
    //         // className={
    //         //   router.query.category === item.name.toLowerCase() ? "active" : ""
    //         // }
    //         // className={"active"}
    //       >
    //         {/* {item.name} <span>{0}</span> */}
    //         asdasd
    //       </a>
    //     </li>
    //   );
    // });
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Danh Mục</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>
              {categories &&
                categories.map((item) => (
                  <li key={item._id}>
                    <a
                      onClick={() => categoryHandler(item._id)}
                      style={{ cursor: "pointer" }}
                      className={
                        router.query.category === item._id ? "active" : ""
                      }
                      // className={"active"}
                    >
                      {item.name} <span>{0}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
