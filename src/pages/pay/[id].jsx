import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import error from "@assets/img/product/cartmini/empty-cart.png";
import { getSession } from "next-auth/react";
import axios from "axios";
const payOrderPage = ({ id }) => {
  useEffect(() => {
    const payOrder = async () => {
      const res = await axios.put(`/api/order/${id}/pay`, {
        id: "",
        status: "",
        email_address: "",
      });
    };
    payOrder();
  }, []);
  return (
    <Wrapper>
      <SEO pageTitle="404" />
      <HeaderTwo style_2={true} />
      <section className="tp-error-area pt-110 pb-110">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="tp-error-content text-center">
                <div className="tp-error-thumb">
                  <Image src={error} alt="error img" />
                </div>

                <h3 className="tp-error-title">Thanh Toán Thành Công</h3>
                <p>Cảm ơn quý khách đã đặt hàng</p>

                <Link href="/" className="tp-error-btn">
                  Quay Lại Trang Chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export const getServerSideProps = async (context) => {
  const { query, req } = context;

  const id = query.id;

  return {
    props: { id },
  };
};

export default payOrderPage;
