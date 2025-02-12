import React, { useState } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import CompareArea from "@/components/compare/compare-area";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import db from "@/utils/db";
import { getSession, signIn, useSession } from "next-auth/react";
import User from "@/models/User";
import axios from "axios";
import { notifyError, notifySuccess } from "@/utils/toast";
const ComparePage = ({ user }) => {
  const { data: session } = useSession();
  const [compare, setCompare] = useState(user.compare || []);
  const removeProduct = async (id, style, size) => {
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put("/api/user/deleteCompare", {
        product_id: id,
        style: style,
        size: size,
      });
      const newCompare = compare.filter(
        (product) =>
          !(
            product.product._id === id &&
            product.style === style &&
            product.size === size
          )
      );
      setCompare(newCompare);
      notifySuccess("Sản phẩm được xoá khỏi danh sách so sánh thành công");
    } catch (error) {
      notifyError("Lỗi danh sách so sánh: " + error.message);
    }
  };
  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="So Sánh" subtitle="So Sánh" />
      <CompareArea compare={compare} removeProduct={removeProduct} />
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
      path: "compare",
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

export default ComparePage;
