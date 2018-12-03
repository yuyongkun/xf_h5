import axios from 'axios'

// const base = process.env.NODE_ENV === 'development' ? '/api/wx' : '/shop-home/api/wx'
// const base = '/shop-home/api/wx'
const base = '/api/wx'

export const listShop = (params) => {
  return axios({
    method: 'get',
    url: `${base}/shops`,
    params
  }).then(resp => resp.data)
}

export const getShop = (shopId) => { return axios.get(`${base}/shops/${shopId}`).then(resp => resp.data) }

export const listProductByCategory = (shopId, cateId) => { return axios.get(`${base}/shops/${shopId}/category/${cateId}/products`).then(resp => resp.data) }

export const listProductByShop = (shopId) => {
  return axios.get(`${base}/shops/${shopId}/products`).then(resp => resp.data)
}

export const listProductGroup = (shopId, cateId) => { return axios.get(`${base}/shops/${shopId}/category/${cateId}/product-groups`).then(resp => resp.data) }

export const getProduct = (prodId) => { return axios.get(`${base}/products/${prodId}`).then(resp => resp.data) }

// export const getUserInfo = () => { return axios.get(`${base}/user-info`).then(resp => resp.data) }
export const getUserInfo2 = (code, cb) => { return axios.get(`${base}/user-info2?code=${code}`).then(resp => cb(resp.data)) }

export const getCouponsByOrder = ({product, openid, shopId}) => {
  return axios({
    method: 'post',
    url: `${base}/order-coupon`,
    data: {product, openid, shopId}
  }).then(resp => resp.data)
}
export const getCouponsByPayNotify = ({price, categories, apmId, shopId}) => {
  return axios({
    method: 'post',
    url: `${base}/paynotify-coupon`,
    data: {price, shopId, apmId, categories}
  }).then(resp => resp.data)
}
export const createOrder = (order) => {
  return axios({
    method: 'post',
    url: `${base}/orders`,
    data: order
  }).then(resp => resp.data)
}

export const getOrder = (orderId) => { return axios.get(`${base}/orders/${orderId}`).then(resp => resp.data) }

export const listOrderByOpenid = () => { return axios.get(`${base}/user-orders`).then(resp => resp.data) }

export const onOrderPaySuccess = orderId => {
  return axios({
    method: 'post',
    url: `${base}/order-pay-ok/${orderId}`
  }).then(resp => resp.data)
}

export const onApmPaySuccess = orderId => {
  return axios({
    method: 'post',
    url: `${base}/apm-pay-ok/${orderId}`
  }).then(resp => resp.data)
}

export const listTicketsByOpenid = openid => { return axios.get(`${base}/user/${openid}/tickets`).then(resp => resp.data) }

export const getWxMediaUrl = (mediaId) => { return axios.get(`${base}/user/${window._openid}/wx-media/${mediaId}`).then(resp => resp.data) }

export const updateUserHairPhotos = (hairPhotos) => {
  return axios({
    method: 'post',
    url: `${base}/user-hair-photos`,
    data: { hairPhotos }
  }).then(resp => resp.data)
}

export const listCategory = () => {
  return axios({
    method: 'get',
    url: `${base}/categories`
  }).then(resp => resp.data)
}

export const listStaff = (shopId, category) => {
  return axios({
    method: 'get',
    url: `${base}/shops/${shopId}/staffs`,
    params: {
      category
    }
  }).then(resp => resp.data)
}

export const addComment = (data) => {
  return axios({
    method: 'post',
    url: `${base}/shops/${data.shopId}/add-comment`,
    data: data
  }).then(resp => resp.data)
}
export const listComment = (shopId, page, row = 10, status = 1) => {
  return axios({
    method: 'post',
    url: `${base}/shops/${shopId}/comments`,
    data: {page, row, status}
  }).then(resp => resp.data)
}
export const getComment = (apmId) => {
  return axios({
    method: 'get',
    url: `${base}/user-comments`,
    params: { apmId }
  }).then(resp => resp.data)
}
export const getStaff = (staffId, category) => {
  return axios({
    method: 'get',
    url: `${base}/staff/${staffId}`,
    params: { category }
  }).then(resp => resp.data)
}

export const getApmCase = (apmId) => {
  return axios({
    method: 'get',
    url: `${base}/appointments/${apmId}/cases`
  }).then(resp => resp.data)
}

export const makeAppointment = (shopId, staffId, category) => {
  return axios({
    method: 'post',
    url: `${base}/shops/${shopId}/staffs/${staffId}/appointment`,
    data: { category }
  }).then(resp => resp.data)
}

export const cancelAppointment = (apmId) => {
  return axios({
    method: 'delete',
    url: `${base}/appointments/${apmId}`
  }).then(resp => resp.data)
}
export const listAppointments = (status, offset, limit) => {
  return axios({
    method: 'get',
    url: `${base}/appointments`,
    params: { status, offset, limit }
  }).then(resp => resp.data)
}
export const getStaffProductOption = (shopId, staffId) => {
  return axios({
    method: 'get',
    url: `${base}/shops/${shopId}/staffs/${staffId}/product-option`
  }).then(resp => resp.data)
}

export const getPrimaryProduct = (shopId, category) => {
  return axios({
    method: 'get',
    url: `${base}/shops/${shopId}/primary-product/${category}`
  }).then(resp => resp.data)
}

export const listCouponByShop = (shopId, getByQrcode) => {
  return axios({
    method: 'get',
    url: `${base}/coupon`,
    params: { shopId, qrcode: getByQrcode || 0 }
  }).then(resp => resp.data)
}

export const getCouponByCouponId = (couponId) => {
  return axios({
    method: 'get',
    url: `${base}/coupon/${couponId}`
  }).then(resp => resp.data)
}

export const addUserCoupon = (couponId) => {
  return axios({
    method: 'post',
    url: `${base}/user-coupons/${couponId}`
  }).then(resp => resp.data)
}
export const getUserCoupon = (couponId) => {
  return axios({
    method: 'get',
    url: `${base}/user-coupons/${couponId}`
  }).then(resp => resp.data)
}

export const listUserCoupon = () => {
  return axios({
    method: 'get',
    url: `${base}/user-coupons`
  }).then(resp => resp.data)
}

export const getWxConfig = (openid) => {
  return axios({
    method: 'get',
    url: `${base}/wxjsconfig`
  }).then(resp => resp.data)
}

export const getPayMsg = (msgId) => {
  return axios({
    method: 'get',
    url: `${base}/pay-msg/${msgId}`
  }).then(resp => resp.data)
}

export const listUserByCouponId = (couponId) => {
  return axios({
    method: 'get',
    url: `${base}/coupons/${couponId}/users`
  }).then(resp => resp.data)
}

export const getShopEntryConfig = (shopId) => {
  return axios({
    method: 'get',
    url: `${base}/shops/${shopId}/entry-config`
  }).then(resp => resp.data)
}

export const getShopHairPhoto = (shopId) => {
  return axios({
    method: 'get',
    url: `${base}/shops/${shopId}/hair-photos`
  }).then(resp => resp.data)
}

export const getStaffCommentStats = (staffId) => {
  return axios({
    method: 'get',
    url: `${base}/staff/${staffId}/comment-stats`
  }).then(resp => resp.data)
}

export const getOrderByMsgId = (msgId) => {
  return axios({
    method: 'get',
    url: `${base}/order-msg/${msgId}`
  }).then(resp => resp.data)
}
