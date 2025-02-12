import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ForgotArea from "@/components/login-register/forgot-area";
import Footer from "@/layout/footers/footer";
import CheckOrderArea from "@/components/login-register/check-order-area";

const CheckOrderPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Kiểm Tra Đơn Hàng"
        subtitle="Kiểm tra đơn hàng"
        center={true}
      />
      <CheckOrderArea />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default CheckOrderPage;
