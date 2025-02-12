import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import Footer from "@/layout/footers/footer";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import db from "@/utils/db";
import Product from "@/models/Product";
import { filterArray, randomize, removeDuplicates } from "@/utils/arrays_utils";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import CategoryFilter from "@/components/shop/shop-filter/category-filter";
import axios from "axios";

const ShopPage = ({
  query,
  categories,
  country,
  products,
  subCategories,
  sizes,
  colors,
  brands,
  stylesData,
  patterns,
  materials,
  paginationCount,
  productsFeatured,
  recommend,
}) => {
  const { data, isError, isLoading } = useGetAllProductsQuery();
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);
  // console.log("categoriesTest", categories);
  // Load the maximum price once the products have been loaded
  // useEffect(() => {
  //   if (!isLoading && !isError && products?.data?.length > 0) {
  //     const maxPrice = products.data.reduce((max, product) => {
  //       return product.price > max ? product.price : max;
  //     }, 0);
  //     setPriceValue([0, maxPrice]);
  //   }
  // }, [isLoading, isError, products]);

  // handleChanges
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  // selectHandleFilter
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  // other props
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = (
      <div className="pb-80 text-center">
        <ErrorMsg msg="There was an error" />
      </div>
    );
  }
  // if (products?.length === 0) {
  //   content = <ErrorMsg msg="No Products found!" />;
  // }
  if (products?.length >= 0) {
    // products
    let product_items = products;
    // select short filtering
    if (selectValue) {
      if (selectValue === "Default Sorting") {
        product_items = products;
      } else if (selectValue === "Low to High") {
        product_items = products
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === "High to Low") {
        product_items = products
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === "New Added") {
        product_items = products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === "On Sale") {
        product_items = products.filter((p) => p.discount > 0);
      } else {
        product_items = products;
      }
    }
    // price filter
    // product_items = product_items.filter(
    //   (p) => p.price >= priceValue[0] && p.price <= priceValue[1]
    // );

    // status filter
    if (query.status) {
      if (query.status === "on-sale") {
        product_items = product_items.filter((p) => p.discount > 0);
      } else if (query.status === "in-stock") {
        product_items = product_items.filter((p) => p.status === "in-stock");
      }
    }

    // category filter
    // if (query.category) {
    //   product_items = product_items.filter(
    //     (p) =>
    //       p.parent.toLowerCase().replace("&", "").split(" ").join("-") ===
    //       query.category
    //   );
    // }

    // category filter
    if (query.subCategory) {
      product_items = product_items.filter(
        (p) =>
          p.children.toLowerCase().replace("&", "").split(" ").join("-") ===
          query.subCategory
      );
    }

    // color filter
    // if (query.color) {
    //   product_items = product_items.filter((product) => {
    //     for (let i = 0; i < product.imageURLs.length; i++) {
    //       const color = product.imageURLs[i]?.color;
    //       if (
    //         color &&
    //         color?.name.toLowerCase().replace("&", "").split(" ").join("-") ===
    //           query.color
    //       ) {
    //         return true; // match found, include product in result
    //       }
    //     }
    //     return false; // no match found, exclude product from result
    //   });
    // }

    // brand filter
    // if (query.brand) {
    //   product_items = product_items.filter(
    //     (p) =>
    //       p.brand.name.toLowerCase().replace("&", "").split(" ").join("-") ===
    //       query.brand
    //   );
    // }

    content = (
      <>
        <ShopArea
          all_products={products}
          products={product_items}
          otherProps={otherProps}
          categories={categories}
          sizes={sizes}
          colors={colors}
          productsFeatured={productsFeatured.slice(0, 3)}
          brands={brands}
          recommend={recommend}
        />
        <ShopFilterOffCanvas
          all_products={products}
          otherProps={otherProps}
          categories={categories}
          sizes={sizes}
          colors={colors}
          productsFeatured={productsFeatured.slice(0, 3)}
          brands={brands}
        />
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb
        title="Danh Sách Sản Phẩm"
        subtitle="Danh Sách Sản Phẩm"
      />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopPage;

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;

  const searchQuery = query.search || "";
  const categoryQuery = query.category || "";
  const genderQuery = query.gender || "";
  const priceQuery = query.price?.split("_") || "";
  const shippingQuery = query.shipping || 0;
  const ratingQuery = query.rating || "";
  const sortQuery = query.sort || "";
  const pageSize = 10;
  const page = query.page || 1;

  //---------------
  const brandQuery = query.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);
  //---------------
  const styleQuery = query.style?.split("_") || "";
  const styleRegex = `^${styleQuery[0]}`;
  const styleSearchRegex = createRegex(styleQuery, styleRegex);
  //-----------
  const patternQuery = query.pattern?.split("_") || "";
  const patternRegex = `^${patternQuery[0]}`;
  const patternSearchRegex = createRegex(patternQuery, patternRegex);

  const materialQuery = query.material?.split("_") || "";
  const materialRegex = `^${materialQuery[0]}`;
  const materialSearchRegex = createRegex(materialQuery, materialRegex);

  const sizeQuery = query.size?.split("_") || "";
  const sizeRegex = `^${sizeQuery[0]}`;
  const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);

  const colorQuery = query.color?.split("_") || "";
  const colorRegex = `^${colorQuery[0]}`;
  const colorSearchRegex = createRegex(colorQuery, colorRegex);

  const search =
    searchQuery && searchQuery !== ""
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const category =
    categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};
  const style =
    styleQuery && styleQuery !== ""
      ? {
          "details.value": {
            $regex: styleSearchRegex,
            $options: "i",
          },
        }
      : {};
  const size =
    sizeQuery && sizeQuery !== ""
      ? {
          "subProducts.sizes.size": {
            $regex: sizeSearchRegex,
            $options: "i",
          },
        }
      : {};
  const color =
    colorQuery && colorQuery !== ""
      ? {
          "subProducts.color.color": {
            $regex: colorSearchRegex,
            $options: "i",
          },
        }
      : {};
  const brand =
    brandQuery && brandQuery !== ""
      ? {
          brand: {
            $regex: brandSearchRegex,
            $options: "i",
          },
        }
      : {};
  const pattern =
    patternQuery && patternQuery !== ""
      ? {
          "details.value": {
            $regex: patternSearchRegex,
            $options: "i",
          },
        }
      : {};
  const material =
    materialQuery && materialQuery !== ""
      ? {
          "details.value": {
            $regex: materialSearchRegex,
            $options: "i",
          },
        }
      : {};
  const gender =
    genderQuery && genderQuery !== ""
      ? {
          "details.value": {
            $regex: genderQuery,
            $options: "i",
          },
        }
      : {};
  const price =
    priceQuery && priceQuery !== ""
      ? {
          "subProducts.sizes.price": {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};
  const shipping = shippingQuery && shippingQuery == "0" ? { shipping: 0 } : {};
  const rating =
    ratingQuery && ratingQuery !== ""
      ? {
          rating: {
            $gte: Number(ratingQuery),
          },
        }
      : {};
  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "popular"
      ? { rating: -1, "subProducts.sold": -1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReviewed"
      ? { rating: -1 }
      : sortQuery == "priceHighToLow"
      ? { "subProducts.sizes.price": -1 }
      : sortQuery == "priceLowToHigh"
      ? { "subProducts.sizes.price": 1 }
      : {};
  function createRegex(data, styleRegex) {
    if (data.length > 1) {
      for (var i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }
  db.connectDB();

  let productDb = await Product.find({
    "subProducts.isDisabled": false,
    ...search,
    ...category,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...pattern,
    ...material,
    ...gender,
    ...price,
    ...shipping,
    ...rating,
  })
    .populate({ path: "subCategories", model: SubCategory })
    // .skip(pageSize * (page - 1))
    // .limit(pageSize)
    .sort(sort)
    .lean();
  let products =
    sortQuery && sortQuery !== "" ? productDb : randomize(productDb);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();
  let colors = await Product.find({ ...category }).distinct(
    "subProducts.color.color"
  );
  let brandsDb = await Product.find({ ...category }).distinct("brand");
  let sizes = await Product.find({ ...category }).distinct(
    "subProducts.sizes.size"
  );
  let details = await Product.find({ ...category }).distinct("details");
  let stylesDb = filterArray(details, "Phong Cách");
  let patternsDb = filterArray(details, "Loại Mẫu");
  let materialsDB = filterArray(details, "Chất Liệu");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDB);
  let brands = removeDuplicates(brandsDb);
  let totalProducts = await Product.countDocuments({
    ...search,
    ...category,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...pattern,
    ...material,
    ...gender,
    ...price,
    ...shipping,
    ...rating,
  });
  const productsFeatured = await Product.find()
    .sort({ rating: -1 })
    .lean()
    .populate({
      path: "category",
      model: Category,
    });
  let recommend = [];
  if (searchQuery) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/recommend/description",
        {
          keyword: searchQuery,
        }
      );
      recommend = data.products;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return {
    props: {
      query,
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      recommend: JSON.parse(JSON.stringify(recommend)),
      productsFeatured: JSON.parse(JSON.stringify(productsFeatured)),
      sizes,
      colors,
      brands,
      stylesData: styles,
      patterns,
      materials,
      paginationCount: Math.ceil(totalProducts / pageSize),
    },
  };
};
