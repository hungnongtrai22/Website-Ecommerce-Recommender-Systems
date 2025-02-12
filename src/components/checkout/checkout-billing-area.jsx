import React, { useState } from "react";
import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";
import { saveAddress } from "@/requests/user";
import { notifySuccess } from "@/utils/toast";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};
const CheckoutBillingArea = ({ register, errors, setAddresses }) => {
  const { user } = useSelector((state) => state.auth);

  const [shipping, setShipping] = useState(initialValues);
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const addAddressHandler = async () => {
    const res = await saveAddress(shipping);
    setAddresses([...res.addresses, shipping]);
    notifySuccess("Thêm địa chỉ giao hàng mới thành công");
  };
  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Thêm Địa Chỉ Giao Hàng</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  Tên <span>*</span>
                </label>
                <input
                  {...register("firstName", {
                    required: `firstName is required!`,
                  })}
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="Tên"
                  defaultValue={firstName}
                  onChange={handleChange}
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  Họ <span>*</span>
                </label>
                <input
                  {...register("lastName", {
                    required: `lastName is required!`,
                  })}
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Họ"
                  onChange={handleChange}
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Quốc Gia <span>*</span>
                </label>
                <input
                  {...register("country", { required: `country is required!` })}
                  name="country"
                  id="country"
                  type="text"
                  placeholder="Việt Nam (VN)"
                  handleChange={handleChange}
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Địa Chỉ</label>
                <input
                  {...register("address", { required: `Address is required!` })}
                  name="address1"
                  id="address"
                  type="text"
                  placeholder="Số nhà và tên đường"
                  onChange={handleChange}
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Tỉnh Thành</label>
                <input
                  {...register("orderNote", { required: false })}
                  name="state"
                  id="orderNote"
                  type="text"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Thành Phố</label>
                <input
                  {...register("city", { required: `City is required!` })}
                  name="city"
                  id="city"
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                />
                <ErrorMsg msg={errors?.city?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Mã Bưu Chính</label>
                <input
                  {...register("zipCode", { required: `zipCode is required!` })}
                  name="zipCode"
                  id="zipCode"
                  type="text"
                  placeholder="Postcode ZIP"
                  onChange={handleChange}
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Số Điện Thoại <span>*</span>
                </label>
                <input
                  {...register("contactNo", {
                    required: `ContactNumber is required!`,
                  })}
                  name="phoneNumber"
                  id="contactNo"
                  type="text"
                  placeholder="Số Điện Thoại"
                  onChange={handleChange}
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>
            {/* <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  {...register("email", { required: `Email is required!` })}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
                <ErrorMsg msg={errors?.email?.message} />
              </div>
            </div> */}
            <div className="col-md-12">
              <div className="tp-checkout-btn-wrapper">
                <button
                  type="submit"
                  className="tp-checkout-btn w-100"
                  onClick={addAddressHandler}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
