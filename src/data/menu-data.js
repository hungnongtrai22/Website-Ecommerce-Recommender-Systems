import home_1 from "@assets/img/menu/menu-home-1.jpg";
import home_2 from "@assets/img/menu/menu-home-2.jpg";
import home_3 from "@assets/img/menu/menu-home-3.jpg";
import home_4 from "@assets/img/menu/menu-home-4.jpg";

const menu_data = [
  {
    id: 1,
    homes: true,
    title: "Sản Phẩm",
    link: "/",
    home_pages: [
      {
        img: home_1,
        title: "Electronics",
        link: "/",
      },
      {
        img: home_2,
        title: "Fashion",
        link: "/home-2",
      },
      {
        img: home_3,
        title: "Beauty",
        link: "/home-3",
      },
      {
        img: home_4,
        title: "Jewelry",
        link: "/home-4",
      },
    ],
  },
  {
    id: 2,
    products: true,
    title: "Điện Thoại",
    link: "/shop",
    product_pages: [
      {
        title: "Hãng Sản Xuất",
        link: "/shop",
        mega_menus: [
          { title: "Apple", link: "/shop?brand=Apple" },
          { title: "Samsung", link: "/shop?brand=Samsung" },
          { title: "Oppo", link: "/shop?brand=Oppo" },
          { title: "Xiaomi", link: "/shop?brand=Xiaomi" },
        ],
      },
      {
        title: "Mức Giá",
        link: "/shop",
        mega_menus: [
          {
            title: "Dưới 2 triệu",
            link: "/shop?category=653142d7e4363e03eb9e88a4&price=0_2000000",
          },
          {
            title: "Từ 2 - 4 triệu",
            link: "/shop?category=653142d7e4363e03eb9e88a4&price=2000000_4000000",
          },
          {
            title: "Từ 4 - 7 triệu",
            link: "/shop?category=653142d7e4363e03eb9e88a4&price=4000000_7000000",
          },
          {
            title: "Từ 7 - 13 triệu",
            link: "/shop?category=653142d7e4363e03eb9e88a4&price=7000000_13000000",
          },
          {
            title: "Trên 13 triệu",
            link: "/shop?category=653142d7e4363e03eb9e88a4&price=13000000_100000000",
          },
        ],
      },
      // {
      //   title: "Đồng Hồ Thông Minh",
      //   link: "/shop",
      //   mega_menus: [
      //     { title: "Apple watch", link: "/cart" },
      //     { title: "Compare", link: "/compare" },
      //     { title: "Wishlist", link: "/wishlist" },
      //     { title: "Checkout", link: "/checkout" },
      //     { title: "My account", link: "/profile" },
      //   ],
      // },
      // {
      //   title: "More Pages",
      //   link: "/shop",
      //   mega_menus: [
      //     { title: "Login", link: "/login" },
      //     { title: "Register", link: "/register" },
      //     { title: "Forgot Password", link: "/forgot" },
      //     { title: "404 Error", link: "/404" },
      //   ],
      // },
    ],
  },
  // {
  //   id: 3,
  //   sub_menu: true,
  //   title: "Tuyển Dụng",
  //   link: "/careers",
  //   sub_menus: [
  //     { title: "Công Việc", link: "/shop" },
  //     { title: "Thực Tập", link: "/shop-right-sidebar" },
  //   ],
  // },
  {
    id: 4,
    single_link: true,
    title: "Mã Giảm Giá",
    link: "/coupon",
  },
  {
    id: 5,
    single_link: true,
    title: "Blog",
    link: "/blog",
    // sub_menus: [
    //   { title: "Blog Standard", link: "/blog" },
    //   { title: "Blog Grid", link: "/blog-grid" },
    //   { title: "Blog List", link: "/blog-list" },
    //   { title: "Blog Details", link: "/blog-details" },
    //   { title: "Blog Details Full Width", link: "/blog-details-2" },
    // ],
  },
  {
    id: 6,
    single_link: true,
    title: "Liên Hệ",
    link: "/contact",
  },
];

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    homes: true,
    title: "Home",
    link: "/",
    home_pages: [
      {
        img: home_1,
        title: "Electronics",
        link: "/",
      },
      {
        img: home_2,
        title: "Fashion",
        link: "/home-2",
      },
      {
        img: home_3,
        title: "Beauty",
        link: "/home-3",
      },
      {
        img: home_4,
        title: "Jewelry",
        link: "/home-4",
      },
    ],
  },
  {
    id: 2,
    sub_menu: true,
    title: "Products",
    link: "/shop",
    sub_menus: [
      { title: "Shop", link: "/shop" },
      { title: "Right Sidebar", link: "/shop-right-sidebar" },
      { title: "Hidden Sidebar", link: "/shop-hidden-sidebar" },
      { title: "Only Categories", link: "/shop-category" },
      { title: "Product Simple", link: "/product-details" },
      { title: "With Video", link: "/product-details-video" },
      { title: "With Countdown Timer", link: "/product-details-countdown" },
      { title: "Variations Swatches", link: "/product-details-swatches" },
    ],
  },
  {
    id: 3,
    sub_menu: true,
    title: "eCommerce",
    link: "/cart",
    sub_menus: [
      { title: "Shopping Cart", link: "/cart" },
      { title: "Compare", link: "/compare" },
      { title: "Wishlist", link: "/wishlist" },
      { title: "Checkout", link: "/checkout" },
      { title: "My account", link: "/profile" },
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: "More Pages",
    link: "/login",
    sub_menus: [
      { title: "Login", link: "/login" },
      { title: "Register", link: "/register" },
      { title: "Forgot Password", link: "/forgot" },
      { title: "404 Error", link: "/404" },
    ],
  },
  {
    id: 4,
    single_link: true,
    title: "Coupons",
    link: "/coupon",
  },
  {
    id: 5,
    sub_menu: true,
    title: "Blog",
    link: "/blog",
    sub_menus: [
      { title: "Blog Standard", link: "/blog" },
      { title: "Blog Grid", link: "/blog-grid" },
      { title: "Blog List", link: "/blog-list" },
      { title: "Blog Details", link: "/blog-details" },
      { title: "Blog Details Full Width", link: "/blog-details-2" },
    ],
  },
  {
    id: 6,
    single_link: true,
    title: "Contact",
    link: "/contact",
  },
];
