import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
// import logo from "@assets/img/logo/logo.svg";
import logo from "@assets/img/logo/logo.png";

import pay from "@assets/img/footer/footer-pay.png";
import social_data from "@/data/social-data";
import { Email, Location } from "@/svg";

const Footer = ({
  style_2 = false,
  style_3 = false,
  primary_style = false,
}) => {
  return (
    <footer>
      <div
        className={`tp-footer-area ${
          primary_style
            ? "tp-footer-style-2 tp-footer-style-primary tp-footer-style-6"
            : ""
        } ${
          style_2
            ? "tp-footer-style-2"
            : style_3
            ? "tp-footer-style-2 tp-footer-style-3"
            : ""
        }`}
        data-bg-color={`${style_2 ? "footer-bg-white" : "footer-bg-grey"}`}
      >
        <div className="tp-footer-top pt-95 pb-40">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-50">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <Image
                          src={logo}
                          alt="logo"
                          style={{
                            width: "15%",
                            height: "15%",
                          }}
                        />
                      </Link>
                    </div>
                    <p className="tp-footer-desc">
                      Chúng tôi là một nhóm năng động gồm các nhà phát triển và
                      thiết kế full stack tạo ra các ứng dụng web chất lượng cao
                    </p>
                    <div className="tp-footer-social">
                      {social_data.map((s) => (
                        <a href={s.link} key={s.id} target="_blank">
                          <i className={s.icon}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4 className="tp-footer-widget-title">Tài Khoản Của Tôi</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a href="/checkorder">Kiểm Tra Đơn Hàng</a>
                      </li>
                      <li>
                        <a href="#">Vận Chuyển</a>
                      </li>
                      <li>
                        <a href="#">Danh Sách Yêu Thích</a>
                      </li>
                      <li>
                        <a href="#">Tài Khoản</a>
                      </li>
                      <li>
                        <a href="#">Lịch Sử Đơn Hàng</a>
                      </li>
                      <li>
                        <a href="#">Hoàn Trả</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4 className="tp-footer-widget-title">Thông Tin</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <a href="#">Về Chúng Tôi</a>
                      </li>
                      <li>
                        <a href="#">Nghề Nghiệp</a>
                      </li>
                      <li>
                        <a href="#">Chính Sách Bảo Mật</a>
                      </li>
                      <li>
                        <a href="#">Điều Khoản Và Điều Kiện</a>
                      </li>
                      <li>
                        <a href="#">Tin Mới Nhất</a>
                      </li>
                      <li>
                        <a href="#">Liên Hệ Chúng Tôi</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4 className="tp-footer-widget-title">
                    Liên Hệ Với Chúng Tôi
                  </h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-20">
                      <span>Có câu hỏi nào không? Gọi cho chúng tôi</span>
                      <h4>
                        <a href="tel:84-908-817-613">+84 908 817 613</a>
                      </h4>
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Email />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a href="mailto:vuquochung2204@gmail.com">
                              vuquochung2204@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p>
                            <a
                              href="https://www.google.com/maps/place/Sleepy+Hollow+Rd,+Gouverneur,+NY+13642,+USA/@44.3304966,-75.4552367,17z/data=!3m1!4b1!4m6!3m5!1s0x4cccddac8972c5eb:0x56286024afff537a!8m2!3d44.3304928!4d-75.453048!16s%2Fg%2F1tdsjdj4"
                              target="_blank"
                            >
                              59/12 khu phố 8<br /> Biên Hòa, Đồng Nai
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-footer-copyright">
                    <p>
                      © {new Date().getFullYear()} All Rights Reserved | Next js
                      Template by
                      <Link href="/"> Hung</Link>.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tp-footer-payment text-md-end">
                    <p>
                      <Image src={pay} alt="pay" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
