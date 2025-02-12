import React, { useEffect } from "react";
import dayjs from "dayjs";
import CopyToClipboard from "react-copy-to-clipboard";
import Image from "next/image";
// internal
import OfferTimer from "./offer-timer";
import { InfoDetails } from "@/svg";
import "dayjs/locale/vi"; // Load Vietnamese locale

const CouponItem = ({ coupon, handleCopied, copiedCode, copied }) => {
  useEffect(() => {
    dayjs.locale("vi");
  }, []);
  return (
    <div className="tp-coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center">
      <span className="tp-coupon-border"></span>
      <div className="tp-coupon-item-left d-sm-flex align-items-center">
        <div className="tp-coupon-thumb">
          <a href="#">
            <Image
              src={"https://i.ibb.co/ThxGY6N/clothing-13.png"}
              alt="logo"
              width={120}
              height={120}
            />
          </a>
        </div>
        <div className="tp-coupon-content">
          <h3 className="tp-coupon-title">{coupon.coupon}</h3>
          <p className="tp-coupon-offer mb-15">
            Giảm Giá <span>{coupon.discount}%</span>
          </p>
          <div className="tp-coupon-countdown">
            {dayjs().isAfter(dayjs(coupon.endDate)) ? (
              <div className="tp-coupon-countdown-inner">
                <ul>
                  <li>
                    <span>{0}</span> Ngày
                  </li>
                  <li>
                    <span>{0}</span> Giờ
                  </li>
                  <li>
                    <span>{0}</span> Phút
                  </li>
                  <li>
                    <span>{0}</span> Giây
                  </li>
                </ul>
              </div>
            ) : (
              <OfferTimer expiryTimestamp={new Date(coupon.endDate)} />
            )}
          </div>
        </div>
      </div>
      <div className="tp-coupon-item-right pl-20">
        <div className="tp-coupon-status mb-10 d-flex align-items-center">
          <h4>
            Coupon{" "}
            <span
              className={
                dayjs().isAfter(dayjs(coupon.endDate)) ? "in-active" : "active"
              }
            >
              {dayjs().isAfter(dayjs(coupon.endDate)) ? "Hết Hạn" : "Còn Hạn"}
            </span>
          </h4>
          <div className="tp-coupon-info-details">
            <span>
              <InfoDetails />
            </span>
            <div className="tp-coupon-info-tooltip transition-3">
              <p>
                *This coupon code will apply on{" "}
                <span>Grocery type products</span> and when you shopping more
                than <span>${coupon.minimumAmount || 0}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="tp-coupon-date">
          <CopyToClipboard
            text={coupon.coupon}
            onCopy={() => handleCopied(coupon.coupon)}
          >
            <button>
              {copied && coupon.coupon === copiedCode ? (
                <span>Copied!</span>
              ) : (
                <span>{coupon.coupon}</span>
              )}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default CouponItem;
