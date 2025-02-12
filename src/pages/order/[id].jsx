import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import ReactToPrint from "react-to-print";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
// import logo from "@assets/img/logo/logo.svg";
import logo from "@assets/img/logo/logo.png";

import ErrorMsg from "@/components/common/error-msg";
import { useGetUserOrderByIdQuery } from "@/redux/features/order/orderApi";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import db from "@/utils/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import "dayjs/locale/vi"; // Import Vietnamese locale

const SingleOrder = ({ orderData, paypal_client_id, stripe_public_key }) => {
  dayjs.locale("vi"); // Set locale to Vietnamese

  // const orderId = params.id;
  console.log("orderData", orderData);
  const printRef = useRef();
  // const { data: order, isError } = useGetUserOrderByIdQuery(orderId);
  const isLoading = false;
  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }
  // if (isError) {
  //   content = <ErrorMsg msg="There was an error" />;
  // }
  if (!isLoading) {
    const name = orderData.user.name;
    // const {
    //   name,
    //   country,
    //   city,
    //   contact,
    //   invoice,
    //   createdAt,
    //   cart,
    //   shippingCost,
    //   discount,
    //   totalAmount,
    //   paymentMethod,
    // } = order.order;
    content = (
      <>
        <section className="invoice__area pt-120 pb-120">
          <div className="container">
            <div className="invoice__msg-wrapper">
              <div className="row">
                <div className="col-xl-12">
                  <div className="invoice_msg mb-40">
                    <p className="text-black alert alert-success">
                      Cảm ơn <strong>{name}</strong> Đơn đặt hàng của bạn đã
                      được nhận !{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={printRef}
              className="invoice__wrapper grey-bg-2 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper"
            >
              <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="invoice__header pb-20">
                      <div className="row align-items-end">
                        <div className="col-md-4 col-sm-6">
                          <div className="invoice__left">
                            <Image
                              src={logo}
                              alt="logo"
                              style={{
                                width: "15%",
                                height: "15%",
                              }}
                            />
                            <p>
                              59/12 khu phố 8<br /> phường Tân Hòa, Biên Hòa{" "}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-8 col-sm-6">
                          <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                            <h3 className="text-uppercase font-70 mb-20">
                              HÓA ĐƠN
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice__customer mb-30">
                <div className="row">
                  <div className="col-md-6 col-sm-8">
                    <div className="invoice__customer-details">
                      <h4 className="mb-10 text-uppercase">
                        Tên: {orderData.user.name}
                      </h4>
                      <p className="mb-0 text-uppercase">
                        Quốc Gia: {orderData.shippingAddress.country}
                      </p>
                      <p className="mb-0 text-uppercase">
                        Địa Chỉ:{" "}
                        {orderData.shippingAddress.address1 +
                          " " +
                          orderData.shippingAddress.city +
                          " " +
                          orderData.shippingAddress.state}
                      </p>
                      <p className="mb-0">
                        Số Điện Thoại: {orderData.shippingAddress.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-4">
                    <div className="invoice__details mt-md-0 mt-20 text-md-end">
                      <p className="mb-0">
                        <strong>Mã Đơn Hàng:</strong> #{orderData._id}
                      </p>
                      <p className="mb-0">
                        <strong>Ngày Đặt Hàng:</strong>{" "}
                        {dayjs(orderData.createdAt).format("DD MMMM YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice__order-table pt-30 pb-30 pl-40 pr-40 bg-white mb-30">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Tên Sản Phẩm</th>
                      <th scope="col">Số Lượng</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Tổng Cộng</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {orderData.products.map((item, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>
                          {item.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>
                          {(item.price * item.qty).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        {orderData.totalBeforeDiscount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="invoice__total pt-40 pb-10 alert-success pl-40 pr-40 mb-30">
                <div className="row">
                  <div className="col-lg-3 col-md-4">
                    <div className="invoice__payment-method mb-30">
                      <h5 className="mb-0">Phương Thức Thanh Toán</h5>
                      <p className="tp-font-medium text-uppercase">
                        {orderData.paymentMethod === "cash"
                          ? "COD"
                          : "Thẻ Tín Dụng"}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div className="invoice__shippint-cost mb-30">
                      <h5 className="mb-0">Giá Vận Chuyển</h5>
                      <p className="tp-font-medium">
                        {orderData.shippingPrice.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div className="invoice__discount-cost mb-30">
                      <h5 className="mb-0">Giảm Giá</h5>
                      <p className="tp-font-medium">
                        {(
                          orderData.totalBeforeDiscount - orderData.total
                        ).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div className="invoice__total-ammount mb-30">
                      <h5 className="mb-0">Tổng Cộng </h5>
                      <p className="tp-font-medium text-danger">
                        <strong>
                          {orderData.total.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}{" "}
                          {orderData.isPaid ? "(Đã Thanh Toán)" : ""}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice__print text-end mt-3">
              <div className="row">
                <div className="col-xl-12">
                  <ReactToPrint
                    trigger={() => (
                      <button
                        type="button"
                        className="tp-invoice-print tp-btn tp-btn-black"
                      >
                        <span className="mr-5">
                          <i className="fa-regular fa-print"></i>
                        </span>{" "}
                        In
                      </button>
                    )}
                    content={() => printRef.current}
                    documentTitle="Invoice"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <Wrapper>
        <SEO pageTitle={"Order Details"} />
        <HeaderTwo style_2={true} />
        {/* content */}
        {content}
        {/* content */}
        {/* footer start */}
        <Footer primary_style={true} />
        {/* footer end */}
      </Wrapper>
    </>
  );
};

export const getServerSideProps = async (context) => {
  db.connectDB();
  const { query } = context;
  const id = query.id;
  const order = await Order.findById(id)
    .populate({ path: "user", model: User })
    .populate({
      path: "products.product",
      model: Product,
    })
    .lean();

  let paypal_client_id = process.env.PAYPAL_CLIENT_ID;
  let stripe_public_key = process.env.STRIPE_PUBLIC_KEY;
  db.disconnectDB();

  return {
    props: {
      orderData: JSON.parse(JSON.stringify(order)),
      paypal_client_id,
      stripe_public_key,
    },
  };
};

export default SingleOrder;
