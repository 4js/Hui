import request from "./request.js"

// 获取openid
export function getOpenid(params) {
  return request('/?c=user&a=useropenid&v=app&site=user', params, {
    prompt: false
  }, 1);
}

// 微信支付
export function openPay(params) {
  return request('/?c=payment&a=wxpay&v=app&site=goods', params, {
    prompt: false
  }, 1);
}
