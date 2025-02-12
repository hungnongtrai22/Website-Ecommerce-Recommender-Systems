import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import CouponArea from "@/components/coupon/coupon-area";
import Coupon from "@/models/Coupon";
import db from "@/utils/db";

const CouponPage = ({ coupons }) => {
  console.log("coupons", coupons);
  return (
    <Wrapper>
      <SEO pageTitle="Coupon" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Mã Giảm Giá" subtitle="Mã Giảm Giá" />
      <CouponArea coupons={coupons} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export async function getServerSideProps(context) {
  db.connectDB();
  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
  db.disconnectDB();
  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}

export default CouponPage;
