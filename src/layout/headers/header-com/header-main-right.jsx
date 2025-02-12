import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import { CartTwo, Compare, Menu, User, Wishlist } from "@/svg";
import { openCartMini } from "@/redux/features/cartSlice";
import { useSession } from "next-auth/react";

const HeaderMainRight = ({ setIsCanvasOpen, wishlist }) => {
  const { user: userInfo } = useSelector((state) => state.auth);
  // const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => ({ ...state }));
  const quantity = cart?.cart_products?.length || 0;
  const { data: session } = useSession();

  const dispatch = useDispatch();
  return (
    <div className="tp-header-main-right d-flex align-items-center justify-content-end">
      <div className="tp-header-login d-none d-lg-block">
        <div className="d-flex align-items-center">
          <div className="tp-header-login-icon">
            <span>
              {(session && session.user.image) || userInfo?.imageURL ? (
                <Link href="/profile">
                  <Image
                    src={session.user.image || userInfo.imageURL}
                    alt="user img"
                    width={35}
                    height={35}
                  />
                </Link>
              ) : (session && session.user.name) || userInfo?.name ? (
                <Link href="/profile">
                  <h2 className="text-uppercase login_text">
                    {session.user.name || userInfo?.name[0]}
                  </h2>
                </Link>
              ) : (
                <User />
              )}
            </span>
          </div>
          <div className="tp-header-login-content d-none d-xl-block">
            {!session && !userInfo?.name && (
              <Link href="/login">
                <span>Xin chào,</span>
              </Link>
            )}
            {(session && session.user.name) ||
              (userInfo?.name && (
                <span>Xin chào, {ession.user.name || userInfo?.name}</span>
              ))}
            <div className="tp-header-login-title">
              {!session && !userInfo?.name && (
                <Link href="/login">Đăng Nhập</Link>
              )}
              {(session || userInfo?.name) && (
                <Link href="/profile">Tài Khoản Của Bạn</Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="tp-header-action d-flex align-items-center ml-50">
        <div className="tp-header-action-item d-none d-lg-block">
          <Link href="/compare" className="tp-header-action-btn">
            <Compare />
          </Link>
        </div>
        <div className="tp-header-action-item d-none d-lg-block">
          <Link href="/wishlist" className="tp-header-action-btn">
            <Wishlist />
            <span className="tp-header-action-badge">{wishlist.length}</span>
          </Link>
        </div>
        <div className="tp-header-action-item">
          <button
            onClick={() => dispatch(openCartMini())}
            type="button"
            className="tp-header-action-btn cartmini-open-btn"
          >
            <CartTwo />
            <span className="tp-header-action-badge">{quantity}</span>
          </button>
        </div>
        <div className="tp-header-action-item d-lg-none">
          <button
            onClick={() => setIsCanvasOpen(true)}
            type="button"
            className="tp-header-action-btn tp-offcanvas-open-btn"
          >
            <Menu />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMainRight;
