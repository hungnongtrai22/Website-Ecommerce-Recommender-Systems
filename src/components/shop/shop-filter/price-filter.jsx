import { useState } from "react";
import InputRange from "@/ui/input-range";
import { useRouter } from "next/router";

const PriceFilter = ({ priceFilterValues, maxPrice }) => {
  // const { priceValue, handleChanges } = priceFilterValues;
  const router = useRouter();

  let priceQuery = router.query.price?.split("_") || "";
  const [priceValue, setPriceValue] = useState([
    parseInt(priceQuery[0]) || 0,
    parseInt(priceQuery[1]) || 0,
  ]);
  const handleChanges = (val) => {
    setPriceValue(val);
  };

  const filter = ({
    search,
    category,
    brand,
    style,
    size,
    color,
    pattern,
    material,
    gender,
    price,
    shipping,
    rating,
    sort,
    page,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    if (size) query.size = size;
    if (color) query.color = color;
    if (pattern) query.pattern = pattern;
    if (material) query.material = material;
    if (gender) query.gender = gender;
    if (price) query.price = price;
    if (shipping) query.shipping = shipping;
    if (rating) query.rating = rating;
    if (sort) query.sort = sort;
    if (page) query.page = page;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const productPriceChange = (min, max) => {
    let newPrice = "";
    newPrice = `${min}_${max}`;
    console.log("newPrice", newPrice);
    filter({ price: newPrice });
  };

  return (
    <>
      <div className="tp-shop-widget mb-35">
        <h3 className="tp-shop-widget-title no-border">Khoảng Giá</h3>

        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-filter">
            <div id="slider-range" className="mb-10">
              <InputRange
                STEP={1}
                MIN={0}
                MAX={100000000}
                values={priceValue}
                handleChanges={handleChanges}
              />
            </div>
            <div className="tp-shop-widget-filter-info d-flex align-items-center justify-content-between">
              <span className="input-range">
                {priceValue[0].toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                -{" "}
                {priceValue[1].toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <button
                className="tp-shop-widget-filter-btn"
                type="button"
                onClick={() => {
                  productPriceChange(priceValue[0], priceValue[1]);
                }}
              >
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
