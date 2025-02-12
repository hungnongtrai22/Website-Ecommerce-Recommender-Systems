import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ForgotArea from "@/components/login-register/forgot-area";
import Footer from "@/layout/footers/footer";
import ResetArea from "@/components/login-register/reset-area";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";

const ResetPage = ({ user_id }) => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Đặt Lại Mật Khẩu"
        subtitle="Đặt Lại Mật Khẩu"
        center={true}
      />
      <ResetArea user_id={user_id} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export const getServerSideProps = async (context) => {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

  return {
    props: {
      user_id: user_id.id,
    },
  };
};

export default ResetPage;
