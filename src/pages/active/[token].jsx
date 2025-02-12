import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import error from "@assets/img/error/error.png";
import shop from "../../../public/assets/img/shop.png";
import { useRouter } from "next/router";
import axios from "axios";

import jwt from "jsonwebtoken";
import { getSession } from "next-auth/react";

const ActivePage = ({ user_id }) => {
  const router = useRouter();

  const activeHandler = async () => {
    console.log("Active", user_id);

    try {
      const { data } = await axios.put("/api/auth/active", {
        user_id,
      });

      router.push("/");

      //   await signIn("credentials", options);
      //   window.location.reload(true);
    } catch (error) {}
  };
  return (
    <Wrapper>
      <SEO pageTitle="404" />
      <HeaderTwo style_2={true} />
      {/* 404 area start */}
      <section className="tp-error-area pt-110 pb-110">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="tp-error-content text-center">
                <div className="tp-error-thumb">
                  <Image
                    src={shop}
                    alt="error img"
                    style={{
                      width: "50%",
                      height: "50%",
                    }}
                  />
                </div>

                <h3 className="tp-error-title mt-5">XÁC THỰC TÀI KHOẢN</h3>
                <p>Vui lòng bấm nút xác nhận để xác thực tài khoản.</p>

                <button
                  href="/"
                  className="tp-error-btn"
                  onClick={activeHandler}
                >
                  XÁC NHẬN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 404 area end */}
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
  const user_id = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);

  return {
    props: {
      user_id: user_id.id,
    },
  };
};

export default ActivePage;
