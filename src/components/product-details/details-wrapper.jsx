import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import {
  add_cart_product,
  addToCart,
  updateCart,
} from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
// import { addToCart, updateCart } from "../../../store/cartSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { signIn, useSession } from "next-auth/react";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
  productModal = false,
  styleModal,
  styleChangeHandler,
  sizeChangeHandler,
  sizeModal,
}) => {
  const router = useRouter();
  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => ({ ...state }));
  const { data: session } = useSession();

  useEffect(() => {
    setSize("");
    setQty(1);
  }, [router.query.style]);
  useEffect(() => {
    if (qty > productItem.quantity) {
      setQty(productItem.quantity);
    }
  }, [router.query.size]);

  const increaseQtyHandler = () => {
    if (productModal && sizeModal >= 0 && styleModal >= 0) {
      console.log(productModal, sizeModal, styleModal);

      qty < productItem.subProducts[styleModal].sizes[sizeModal].qty &&
        setQty((pre) => pre + 1);
    } else {
      qty < productItem.quantity && setQty((pre) => pre + 1);
    }
  };

  const decreaseQtyHandler = () => {
    qty > 1 && setQty((pre) => pre - 1);
  };
  const addToCartHandler = async () => {
    if (productModal == true && sizeModal == null) {
      return;
    }
    if (!router.query.size && productModal == false) {
      // setError("Vui lòng chọn một kích thước");
      return;
    }
    const { data } = await axios.get(
      `/api/product/${productItem._id}?style=${
        productModal ? styleModal : productItem.style
      }&size=${productModal ? sizeModal : router.query.size}`
    );
    if (qty > data.quantity) {
      // setError(
      //   "Số lượng bạn đã chọn còn nhiều hơn số lượng có sẵn. Hãy thử và giảm số lượng"
      // );
    } else if (data.quantity < 1) {
      // setError("Sản phẩm này đã hết hàng");
      return;
    } else {
      let _uid = `${data._id}_${
        productModal ? styleModal : productItem.style
      }_${productModal ? sizeModal : router.query.size}`;
      let exist = cart.cart_products.find((p) => p._uid === _uid);
      if (exist) {
        let newCart = cart.cart_products.map((p) => {
          if (p._uid == exist._uid) {
            return { ...p, qty: p.qty + qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(
          addToCart({
            ...data,
            qty,
            size: data.size,
            _uid,
          })
        );
      }
      // toast.success(`Thêm ${qty} ${data.name} thành công.`);
      notifySuccess(`Thêm ${qty} ${data.name} thành công.`);
    }
  };

  const handleWishlist = async () => {
    try {
      if (!session) {
        return signIn();
      }
      // socket.emit("sendNotification", {
      //   senderName: session.user.name,
      //   receiverName: "Admin Shop 01",
      //   type: "like",
      //   productName: product.name,
      //   image: session.user.image,
      // });
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: productItem._id,
        style: router.query.style,
      });
      // dispatch(
      //   showDialog({
      //     header: "Sản phẩm được thêm vào danh sách yêu thích thành công",
      //     msgs: [
      //       {
      //         msg: data.message,
      //         type: "success",
      //       },
      //     ],
      //   })
      // );
      notifySuccess("Sản phẩm được thêm vào danh sách yêu thích thành công");
    } catch (error) {
      // dispatch(
      //   showDialog({
      //     header: "Lỗi danh sách yêu thích",
      //     msgs: [
      //       {
      //         msg: error.response.data.message,
      //         type: "error",
      //       },
      //     ],
      //   })
      // );
      notifyError(error.response.data.message);
    }
  };

  const handleCompare = async () => {
    try {
      if (!session) {
        return signIn();
      }
      // socket.emit("sendNotification", {
      //   senderName: session.user.name,
      //   receiverName: "Admin Shop 01",
      //   type: "like",
      //   productName: product.name,
      //   image: session.user.image,
      // });
      const { data } = await axios.put("/api/user/compare", {
        product_id: productItem._id,
        style: router.query.style,
        size: router.query.size,
      });
      // dispatch(
      //   showDialog({
      //     header: "Sản phẩm được thêm vào danh sách yêu thích thành công",
      //     msgs: [
      //       {
      //         msg: data.message,
      //         type: "success",
      //       },
      //     ],
      //   })
      // );
      notifySuccess("Sản phẩm được thêm vào danh sách so sánh thành công");
    } catch (error) {
      // dispatch(
      //   showDialog({
      //     header: "Lỗi danh sách yêu thích",
      //     msgs: [
      //       {
      //         msg: error.response.data.message,
      //         type: "error",
      //       },
      //     ],
      //   })
      // );
      notifyError(error.response.data.message);
    }
  };

  const {
    sku,
    img,
    title,
    imageURLs,
    category,
    description,
    discount,
    price,
    status,
    reviews,
    tags,
    offerDate,
  } = productItem || {};
  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const sale =
    productItem?.endDate && new Date(productItem.endDate) >= new Date()
      ? (100 - productItem.sale) / 100
      : 1;
  let subProduct =
    productItem.subProducts[router.query.style || styleModal || 0];
  console.log("Sub", subProduct);
  let prices = subProduct.sizes
    .map((s) => s.price * sale)
    .sort((a, b) => a - b);
  let colors = productItem.subProducts.map((p) => p.color);
  const priceRange = subProduct.discount
    ? `${(prices[0] - (prices[0] * subProduct.discount) / 100).toLocaleString(
        "it-IT",
        {
          style: "currency",
          currency: "VND",
        }
      )}`
    : `${prices[0].toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })}`;
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{productItem?.category?.name || category.name}</span>
      </div>
      <h3 className="tp-product-details-title">{productItem?.name || title}</h3>

      {/* inventory details */}
      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}Còn Hàng</span>
        </div>
        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating
              allowFraction
              size={16}
              initialValue={productItem?.rating || ratingVal}
              readonly={true}
            />
          </div>
          <div className="tp-product-details-reviews">
            <span>
              ({reviews && reviews.length > 0 ? reviews.length : 0} Đánh Giá)
            </span>
          </div>
        </div>
      </div>
      <p>
        {textMore
          ? productItem?.description || description
          : `${
              productItem?.description.substring(0, 100) ||
              description.substring(0, 100)
            }...`}
        <span onClick={() => setTextMore(!textMore)}>
          {textMore ? "See less" : "See more"}
        </span>
      </p>

      {/* price */}
      <div className="tp-product-details-price-wrapper mb-20">
        {productItem.discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">
              {productItem.priceBefore}
            </span>
            <span className="tp-product-details-price new-price">
              {!size ? (
                <h2>{productItem.priceRange}</h2>
              ) : (
                <h1>{productItem.price}</h1>
              )}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            {priceRange || price.toFixed(2)}
          </span>
        )}
      </div>

      {/* variations */}
      {/* {imageURLs.some((item) => item?.color && item?.color?.name) && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Color :</h4>
            <div className="tp-product-details-variation-list">
              {imageURLs.map((item, i) => (
                <button
                  onClick={() => handleImageActive(item)}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item.img === activeImg ? "active" : ""
                  }`}
                >
                  <span
                    data-bg-color={`${item.color.clrCode}`}
                    style={{ backgroundColor: `${item.color.clrCode}` }}
                  ></span>
                  {item.color && item.color.name && (
                    <span className="tp-color-variation-tootltip">
                      {item.color.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {subProduct.sizes.length > 0 && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Kích Thước :</h4>
            <div className="tp-product-details-variation-list">
              {subProduct.sizes.map((item, i) => {
                if (productModal) {
                  return (
                    <button
                      onClick={() => sizeChangeHandler(i)}
                      key={i}
                      type="button"
                      className={`color tp-color-variation-btn ${
                        i == sizeModal ? "active" : ""
                      }`}
                      // className={`color tp-color-variation-btn ${"active"}`}
                    >
                      <span
                        data-bg-color={`#DFF5FF`}
                        style={{
                          backgroundColor: `#DFF5FF`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.size}
                      </span>
                      {item.size && (
                        <span className="tp-color-variation-tootltip">
                          {item.size}
                        </span>
                      )}
                    </button>
                  );
                }
                return (
                  <Link
                    key={productItem.slug}
                    href={`//product-details/${productItem.slug}?style=${router.query.style}&size=${i}`}
                  >
                    <button
                      // onClick={() => handleImageActive(item)}
                      key={i}
                      type="button"
                      className={`color tp-color-variation-btn ${
                        i == router.query.size ? "active" : ""
                      }`}
                      // className={`color tp-color-variation-btn ${"active"}`}
                    >
                      <span
                        data-bg-color={`#DFF5FF`}
                        style={{
                          backgroundColor: `#DFF5FF`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.size}
                      </span>
                      {item.size && (
                        <span className="tp-color-variation-tootltip">
                          {item.size}
                        </span>
                      )}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Màu sắc :</h4>
            <div className="tp-product-details-variation-list">
              {colors.map((item, i) => {
                if (productModal) {
                  return (
                    <button
                      onClick={() => styleChangeHandler(i)}
                      key={i}
                      type="button"
                      className={`color tp-color-variation-btn ${
                        i == styleModal ? "active" : ""
                        // "active"
                      }`}
                      onMouseOver={() =>
                        handleImageActive(
                          productItem.subProducts[i].images[0].url
                        )
                      }
                      onMouseLeave={() => handleImageActive("")}
                      // className={`color tp-color-variation-btn ${"active"}`}
                    >
                      <span
                        data-bg-color={`#fff`}
                        style={{ backgroundColor: `#fff` }}
                      >
                        <img
                          src={item.image}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </span>
                      {item.size && (
                        <span className="tp-color-variation-tootltip">asd</span>
                      )}
                    </button>
                  );
                }
                return (
                  <Link
                    key={productItem.slug}
                    href={`/product-details/${productItem.slug}?style=${i}`}
                  >
                    <button
                      // onClick={() => handleImageActive(item)}
                      key={i}
                      type="button"
                      className={`color tp-color-variation-btn ${
                        i == router.query.style ? "active" : ""
                        // "active"
                      }`}
                      onMouseOver={() =>
                        handleImageActive(
                          productItem.subProducts[i].images[0].url
                        )
                      }
                      onMouseLeave={() => handleImageActive("")}
                      // className={`color tp-color-variation-btn ${"active"}`}
                    >
                      <span
                        data-bg-color={`#fff`}
                        style={{ backgroundColor: `#fff` }}
                      >
                        <img
                          src={item.image}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </span>
                      {item.size && (
                        <span className="tp-color-variation-tootltip">asd</span>
                      )}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* if ProductDetailsCountdown true start */}
      {productItem?.endDate && new Date(productItem.endDate) >= new Date() && (
        <ProductDetailsCountdown offerExpiryTime={productItem?.endDate} />
      )}
      {/* if ProductDetailsCountdown true end */}

      {/* actions */}
      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">Số Lượng</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          {/* product quantity */}
          <ProductQuantity
            increaseQtyHandler={increaseQtyHandler}
            decreaseQtyHandler={decreaseQtyHandler}
            qty={qty}
          />
          {/* product quantity */}
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => addToCartHandler()}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
            >
              Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
        <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-product-details-buy-now-btn w-100">
            Mua Ngay
          </button>
        </Link>
      </div>
      {/* product-details-action-sm start */}
      <div className="tp-product-details-action-sm">
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleCompare()}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <CompareTwo />
          So Sánh
        </button>
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleWishlist()}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <WishlistTwo />
          Thêm vào danh sách yêu thích
        </button>
        <button type="button" className="tp-product-details-action-sm-btn">
          <AskQuestion />
          Đặt câu hỏi
        </button>
      </div>
      {/* product-details-action-sm end */}

      {detailsBottom && (
        <DetailsBottomInfo
          category={category?.name}
          sku={sku}
          // tag={tags[0]}
          tag={
            productItem.subCategories.length > 0
              ? productItem.subCategories[0].name
              : ""
          }
        />
      )}
    </div>
  );
};

export default DetailsWrapper;
