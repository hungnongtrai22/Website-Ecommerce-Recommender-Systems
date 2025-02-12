import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import CheckoutArea from "@/components/checkout/checkout-area";
import { useSession } from "next-auth/react";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import User from "../models/User";
import Cart from "../models/Cart";

const CheckoutPage = ({ cart, user }) => {
  const router = useRouter();
  const [addresses, setAddresses] = useState(user?.address || []);
  const { data: session } = useSession();
  const [selectedAddress, setSelectedAddress] = useState("");
  useEffect(() => {
    let check = addresses.find((ad) => ad.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);
  // useEffect(() => {
  //   // const isAuthenticate = Cookies.get("userInfo");
  //   // if(!isAuthenticate){
  //   //   router.push("/login")
  //   // }
  //   if (!session) {
  //     router.push("/login");
  //   }
  // }, [router]);
  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Thanh Toán"
        subtitle="Thanh Toán"
        bg_clr={true}
      />
      <CheckoutArea
        addresses={addresses}
        cart={cart}
        setAddresses={setAddresses}
        selectedAddress={selectedAddress}
      />
      <Footer style_2={true} />
    </Wrapper>
  );
};

export async function getServerSideProps(context) {
  db.connectDB();
  const session = await getSession(context);
  const user = await User.findById(session.user.id);
  const cart = await Cart.findOne({ user: user._id });
  db.disconnectDB();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default CheckoutPage;
