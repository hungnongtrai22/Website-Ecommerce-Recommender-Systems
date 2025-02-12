import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import ProfileArea from "@/components/my-account/profile-area";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import Loader from "@/components/loader/loader";
import { getSession } from "next-auth/react";
import Order from "@/models/Order";
import User from "@/models/User";

const ProfilePage = ({ user, orders }) => {
  const router = useRouter();
  console.log("profile", orders);
  const { data: orderData, isError, isLoading } = useGetUserOrdersQuery();
  // useEffect(() => {
  //   const isAuthenticate = Cookies.get("userInfo");
  //   if (!isAuthenticate) {
  //     router.push("/login");
  //   }
  // }, [router]);

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Hồ Sơ" />
      <HeaderTwo style_2={true} />
      <ProfileArea orderData={orders} user={user} />
      <Footer style_2={true} />
    </Wrapper>
  );
};

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const session = await getSession({ req });

  const orders = await Order.find({ user: session?.user.id })
    .sort({
      createdAt: -1,
    })
    .lean();

  const user = await User.findById(session?.user.id);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

export default ProfilePage;
