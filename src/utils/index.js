import { getWxMediaUrl } from '../api/api'

export const getTicketQRCodeUrl = (openid, ticketHash) => `/api/wx/user/${openid}/tickets/${ticketHash}/qrcode.png`

export const getFormatDate = (string) => {
  if (!string) return {}
  let date = new Date(string)
  let year = date.getFullYear()
  let month = addZero(date.getMonth() + 1)
  let day = addZero(date.getDate())
  let hour = addZero(date.getHours())
  let min = addZero(date.getMinutes())
  let sec = addZero(date.getSeconds())
  function addZero (n) {
    return n < 10 ? ('0' + n) : n
  }
  return { year, month, day, hour, min, sec }
}

export const wxChooseImage = ({ count, sizeType, sourceType }) => {
  return new Promise((resolve, reject) => {
    /* eslint-disable */
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success: function (res) {
        resolve(res.localIds)
      },
      fail: function (e) {
        reject(e)
      }
    })
  })
}

export const uploadWxImageList = function ({ localIds, resultList }) {
  if (localIds.length === 0) { return resultList }
  return uploadWxImage(localIds.shift())
    .then(result => {
      resultList.push(result)
      return { localIds, resultList }
    })
    .then(uploadWxImageList)
}

export const uploadWxImage = function (localId) {
  return new Promise((resolve, reject) => {
    wx.uploadImage({
      localId: localId,             // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1,        // 默认为1，显示进度提示
      success: function (res) {
        let serverId = res.serverId // 返回图片的服务器端ID
        return resolve(serverId)
      },
      fail: function () {
        resolve('')
      }
    })
  })
}

export const getHairPhotoUrlList = function ({ serverIds, resultList }) {
  if (serverIds.length === 0) { return resultList }
  return getHairPhotoUrl(serverIds.shift())
    .then(result => {
      resultList.push(result)
      return { serverIds, resultList }
    })
    .then(getHairPhotoUrlList)
}

export const getHairPhotoUrl = function (serverId) {
  if (!serverId) { return '' }
  return getWxMediaUrl(serverId).then(data => data.data.url)
}

export const getApmWaitTime = (minutes) => {
  if (minutes == 0) {
    return '有空'
  }

  let hour = Math.floor(minutes / 60)
  let minute = minutes % 60
  return `需等待${hour}小时${minute}分钟`
}

export const getDecimal = (priceNum, len, dir) => {
  if (!priceNum || !len) {
    return ''
  }
  dir = dir || 'f'
  priceNum = parseFloat(priceNum, 10)
  len = parseInt(len, 10)
  if (dir === 'f') {
    let intNumStr = priceNum.toString().split('.')[0]
    let decimalNumStr = priceNum.toString().split('.')[1] || '00'
    if (decimalNumStr.length < 2) {
      decimalNumStr += '0'
    }
    return intNumStr + '.' + decimalNumStr.substring(0, len)
  } else {
    return priceNum.toFixed(len)
  }
}

export const getQueryValueByName = (name) => {
  let url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const getOpenid = () => {
  return window._openid || getQueryValueByName('o')
}

export function getCategoryLabel (code) {
  switch (code) {
    case '1':
      return '洗剪'
    case '2':
      return '净剪'
    case '3':
      return '洗吹'
    case '4':
      return '烫染'
    case '5':
      return '补差价'
  }
}

export function isInWxBrowser () {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1
}

export function getLocation () {
  return new Promise((resolve, reject) => {
    wx.ready(function () {
      wx.getLocation({
        type: 'wgs84',                     // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          // let latitude = res.latitude      // 纬度，浮点数，范围为90 ~ -90
          // let longitude = res.longitude    // 经度，浮点数，范围为180 ~ -180。
          // let speed = res.speed            // 速度，以米/每秒计
          // let accuracy = res.accuracy      // 位置精度
          resolve(res)
        },
        fail: function (e) {
          reject(e)
        }
      })
    })
  })
}
