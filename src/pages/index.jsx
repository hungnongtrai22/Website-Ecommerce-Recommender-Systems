import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import ElectronicCategory from "@/components/categories/electronic-category";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import FeatureArea from "@/components/features/feature-area";
import ProductArea from "@/components/products/electronics/product-area";
import BannerArea from "@/components/banner/banner-area";
import OfferProducts from "@/components/products/electronics/offer-products";
import ProductGadgetArea from "@/components/products/electronics/product-gadget-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import ProductSmArea from "@/components/products/electronics/product-sm-area";
import NewArrivals from "@/components/products/electronics/new-arrivals";
import BlogArea from "@/components/blog/electronic/blog-area";
import InstagramArea from "@/components/instagram/instagram-area";
import CtaArea from "@/components/cta/cta-area";
import Footer from "@/layout/footers/footer";
import db from "@/utils/db";
import Product from "../models/Product";
import Category from "../models/Category";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "@/redux/features/cartSlice";
import axios from "axios";

export default function Home({
  products,
  productElestric,
  productsDiscount,
  productsFeatured,
  productsSelling,
  user,
  recommendProducts,
  productSales,
}) {
  // const dispatch = useDispatch();
  // dispatch(emptyCart());
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header user={user} productsFeatured={productsFeatured.slice(0, 4)} />
      <HomeHeroSlider />
      <ElectronicCategory />
      <FeatureArea />
      <ProductArea
        products={products}
        recommendProducts={recommendProducts}
        productsSelling={productsSelling}
      />
      <BannerArea />
      <OfferProducts products={productSales} />
      <ProductGadgetArea productElestric={productElestric} />
      <ProductBanner />
      <NewArrivals products={products.slice(0, 8)} />
      <ProductSmArea
        productsDiscount={productsDiscount.slice(0, 3)}
        productsFeatured={productsFeatured.slice(0, 3)}
        productsSelling={productsSelling.slice(0, 3)}
      />
      <BlogArea />
      <InstagramArea />
      <CtaArea />
      <Footer />
    </Wrapper>
  );
}

export const getServerSideProps = async (ctx) => {
  await db.connectDB();
  const { query, req } = ctx;
  const session = await getSession({ req });

  let products = await Product.find().sort({ createdAt: -1 }).lean().populate({
    path: "category",
    model: Category,
  });
  const productSales = products.filter((product) => product.sale > 0);
  const { data: recommendProducts } = await axios.get(
    "http://localhost:3000/api/recommend/toprating"
  );
  console.log(">>>>>>>>>>>>", recommendProducts);
  const productsDiscount = await Product.find()
    .sort({ "subProducts.discount": -1 })
    .lean()
    .populate({
      path: "category",
      model: Category,
    });
  const productsSelling = await Product.find()
    .sort({ "subProducts.sold": -1 })
    .lean()
    .populate({
      path: "category",
      model: Category,
    });

  const productsFeatured = await Product.find()
    .sort({ rating: -1 })
    .lean()
    .populate({
      path: "category",
      model: Category,
    });

  let productElestric = await Product.find({
    category: "653142d7e4363e03eb9e88a4",
  });

  const user = await User.findById(session?.user?.id)
    .populate({
      path: "wishlist",
      populate: {
        path: "product", // assuming 'product' is a reference to another schema
      },
    })
    .lean();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      productSales: JSON.parse(JSON.stringify(productSales)),
      productsDiscount: JSON.parse(JSON.stringify(productsDiscount)),
      productsFeatured: JSON.parse(JSON.stringify(productsFeatured)),
      productsSelling: JSON.parse(JSON.stringify(productsSelling)),
      productElestric: JSON.parse(JSON.stringify(productElestric)),
      user: JSON.parse(JSON.stringify(user)),
      recommendProducts: JSON.parse(JSON.stringify(recommendProducts)),
    },
  };
};
