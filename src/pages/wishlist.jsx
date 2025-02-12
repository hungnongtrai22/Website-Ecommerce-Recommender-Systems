import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import WishlistArea from "@/components/cart-wishlist/wishlist-area";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import User from "@/models/User";
// import wishlist from "./api/user/wishlist";

const WishlistPage = ({ user }) => {
  return (
    <Wrapper>
      <SEO pageTitle="Danh Sách Yêu Thích" />
      <HeaderTwo style_2={true} user={user} />
      <CommonBreadcrumb
        title="Danh Sách Yêu Thích"
        subtitle="Danh Sách Yêu Thích"
      />
      <WishlistArea list={user?.wishlist || []} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export const getServerSideProps = async (ctx) => {
  db.connectDB();
  const { query, req } = ctx;
  const session = await getSession({ req });

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
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default WishlistPage;
