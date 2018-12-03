import Vue from 'vue'
import Router from 'vue-router'
import Blank from '@/views/Blank'
import BookingResult from '@/views/BookingResult'
import Home from '@/views/Home'
import Shop from '@/views/Shop'
import Staffs from '@/views/Staffs'
import Products from '@/views/Products'
import Product from '@/views/Product'
import Order from '@/views/Order'
import Me from '@/views/Me'
import Pay from '@/views/Pay'
import PayOK from '@/views/PayOK'
import PayFail from '@/views/PayFail'
import MyOrder from '@/views/MyOrder'
import MyBooking from '@/views/MyBooking'
import MyTicket from '@/views/MyTicket'
import HairPhotos from '@/views/HairPhotos'
import ProductGroup from '@/views/ProductGroup'
import Coupon from '@/views/Coupon'
import CouponCenter from '@/views/CouponCenter'
import QrcodeCouponCenter from '@/views/QrcodeCouponCenter'
import CouponShare from '@/views/CouponShare'
import Ratings from '@/views/Ratings'
import RateForm from '@/views/RateForm'
import RateOK from '@/views/RateOK'
import PayNotification from '@/views/PayNotification'
import Redirect from '@/views/Redirect'
import StaffIntro from '@/views/StaffIntro'
import StaffRatings from '@/views/StaffRatings'
import ShopHairPhotos from '@/views/ShopHairPhotos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shop/:id',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/shop/:shopId/category/:cateId/staffs',
      name: 'Staffs',
      component: Staffs
    },
    {
      path: '/shop/:shopId/ratings/',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/rateForm/:shopId/:apmId',
      name: 'RateForm',
      component: RateForm
    },
    {
      path: '/rateok/:shopId',
      name: 'RateOK',
      component: RateOK
    },
    // {
    //   path: '/shop/:shopId/category/:cateId/products',
    //   name: 'Products',
    //   component: Products
    // },
    {
      path: '/shop/:shopId/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/shop/:shopId/category/:cateId/product-groups',
      name: 'ProductGroup',
      component: ProductGroup
    },
    // {
    //   path: '/shop/:shopId/category/:cateId/staff/:staffId',
    //   name: 'Product',
    //   component: Product
    // },
    {
      path: '/shop/:shopId/products/:prodId',
      name: 'Product',
      component: Product
    },
    {
      path: '/shop/:shopId/products/:prodId/order',
      props: true,
      name: 'Order',
      component: Order
    },
    {
      path: '/bkresult/:bookId',
      name: 'BookingResult',
      component: BookingResult
    },
    {
      path: '/pay/:orderId',
      props: true,
      name: 'Pay',
      component: Pay
    },
    {
      path: '/payok',
      name: 'PayOK',
      component: PayOK
    },
    {
      path: '/payfail',
      name: 'PayFail',
      component: PayFail
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path: '/me/bookings',
      name: 'MyBooking',
      component: MyBooking
    },
    {
      path: '/me/orders',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/me/tickets',
      name: 'MyTicket',
      component: MyTicket
    },
    {
      path: '/me/hair-photos',
      name: 'HairPhotos',
      component: HairPhotos
    },
    {
      path: '/me/coupon',
      name: 'Coupon',
      component: Coupon
    },
    {
      path: '/coupon-center/:shopId',
      name: 'CouponCenter',
      component: CouponCenter
    },
    {
      path: '/qrcode-coupon-center/:shopId',
      name: 'QrcodeCouponCenter',
      component: QrcodeCouponCenter
    },
    {
      path: '/coupon-share/:couponId',
      name: 'CouponShare',
      component: CouponShare
    },
    {
      path: '/pay-notification',
      name: 'PayNotification',
      component: PayNotification
    },
    {
      path: '/redirect',
      name: 'Redirect',
      component: Redirect
    },
    {
      path: '/shop/:shopId/staff-intro/:staffId',
      name: 'StaffIntro',
      component: StaffIntro
    },
    {
      path: '/shop/:shopId/staff-ratings:staffId/',
      name: 'StaffRatings',
      component: StaffRatings
    },
    {
      path: '/shop/:shopId/shop-hair-photos',
      name: 'ShopHairPhotos',
      component: ShopHairPhotos
    },
    {
      path: '/blank',
      name: 'Blank',
      component: Blank
    }
  ]
})
