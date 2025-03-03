import React, { useRef, useEffect } from "react";
import ReviewForm from "../forms/review-form";
import ReviewItem from "./review-item";
import { useSession } from "next-auth/react";

const DetailsTabNav = ({ product, isReview, orderId }) => {
  console.log("orderId", orderId);

  const { _id, description, details, reviews } = product || {};
  const activeRef = useRef(null);
  const marker = useRef(null);
  const { data: session } = useSession();

  // handleActive
  const handleActive = (e) => {
    if (e.target.classList.contains("active")) {
      marker.current.style.left = e.target.offsetLeft + "px";
      marker.current.style.width = e.target.offsetWidth + "px";
    }
  };
  useEffect(() => {
    if (activeRef.current?.classList.contains("active")) {
      marker.current.style.left = activeRef.current.offsetLeft + "px";
      marker.current.style.width = activeRef.current.offsetWidth + "px";
    }
  }, []);
  // nav item
  function NavItem({ active = false, id, title, linkRef }) {
    return (
      <button
        ref={linkRef}
        className={`nav-link ${active ? "active" : ""}`}
        id={`nav-${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#nav-${id}`}
        type="button"
        role="tab"
        aria-controls={`nav-${id}`}
        aria-selected={active ? "true" : "false"}
        tabIndex="-1"
        onClick={(e) => handleActive(e)}
      >
        {title}
      </button>
    );
  }

  return (
    <>
      <div className="tp-product-details-tab-nav tp-tab">
        <nav>
          <div
            className="nav nav-tabs justify-content-center p-relative tp-product-tab"
            id="navPresentationTab"
            role="tablist"
          >
            <NavItem
              active={true}
              linkRef={activeRef}
              id="desc"
              title="Mô Tả"
            />
            <NavItem id="additional" title="Thông tin thêm" />
            <NavItem id="review" title={`Đánh Giá (${reviews.length})`} />

            <span
              ref={marker}
              id="productTabMarker"
              className="tp-product-details-tab-line"
            ></span>
          </div>
        </nav>
        <div className="tab-content" id="navPresentationTabContent">
          {/* nav-desc */}
          <div
            className="tab-pane fade show active"
            id="nav-desc"
            role="tabpanel"
            aria-labelledby="nav-desc-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-desc-wrapper pt-60">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-product-details-desc-item">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="tp-product-details-desc-content">
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* addInfo */}
          <div
            className="tab-pane fade"
            id="nav-additional"
            role="tabpanel"
            aria-labelledby="nav-additional-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-additional-info ">
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <table>
                    <tbody>
                      {details?.map((item, i) => (
                        <tr key={i}>
                          <td>{item.name}</td>
                          <td>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* review */}
          <div
            className="tab-pane fade"
            id="nav-review"
            role="tabpanel"
            aria-labelledby="nav-review-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-review-wrapper pt-60">
              <div className="row">
                <div className="col-lg-6">
                  <div className="tp-product-details-review-statics">
                    {/* reviews */}
                    <div className="tp-product-details-review-list pr-110">
                      <h3 className="tp-product-details-review-title">
                        Xếp Hạng & Đánh Giá
                      </h3>
                      {reviews.length === 0 && (
                        <h3 className="tp-product-details-review-title">
                          Hiện tại không có đánh giá nào.
                        </h3>
                      )}
                      {reviews.length > 0 &&
                        reviews.map((item) => (
                          <ReviewItem key={item._id} review={item} />
                        ))}
                    </div>
                  </div>
                </div>
                {session && isReview === false ? (
                  <div className="col-lg-6">
                    <div className="tp-product-details-review-form">
                      <h3 className="tp-product-details-review-form-title">
                        Đánh giá sản phẩm này
                      </h3>
                      <p>
                        Địa chỉ email của bạn sẽ không được công bố. Phần bắt
                        buộc được đánh dấu *
                      </p>
                      {/* form start */}
                      <ReviewForm product_id={_id} orderId={orderId} />
                      {/* form end */}
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-6">
                    <div className="tp-product-details-review-form">
                      <h3 className="tp-product-details-review-form-title">
                        Bạn đã đánh giá sản phẩm này
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTabNav;
