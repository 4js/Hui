import request from "./request.js"

//获取城市列表
export function getCityList(params) {
  return request('/tool/tool/getCity', params, {
    prompt: false
  }, 1);
}

// 获取师傅列表
export function getMasterList(params) {
  return request('/tool/ygwApi/wxMasterList', params, {
    prompt: false
  }, 1);
}

// 获取师傅详情
export function getMasterContent(params) {
  return request('/tool/ygwApi/masterDetail', params, {
    prompt: false
  }, 1);
}

// 用户登录
export function userLogin(params) {
  return request('/tool/ygwApi/wxLogin', params, {
    prompt: false
  }, 1);
}

// 用户注册
export function userRegister(params) {
  return request('/tool/ygwApi/wxRegister', params, {
    prompt: false
  }, 1);
}

// 手机验证码
export function msgCode(params) {
  return request('/tool/ygwApi/sendVerifyCode', params, {
    prompt: false
  }, 1);
}

// 重制密码
export function resetPassword(params) {
  return request('/tool/ygwApi/resetPassword', params, {
    prompt: false
  }, 1);
}

// 忘记密码
export function forgetPassword(params) {
  return request('/tool/ygwApi/forgetPassword', params, {
    prompt: false
  }, 1);
}

// 退出登录
export function loginout(params) {
  return request('/tool/ygwApi/wxLoginOut', params, {
    prompt: false
  }, 1);
}

// 修改用户名称
export function editUserName(params) {
  return request('/tool/ygwApi/wxEditUserDetail', params, {
    prompt: false
  }, 1);
}

// 获取用户信息
export function getUserInfo() {
  return request('/tool/ygwApi/wxGetUserDetail', {}, {
    prompt: false
  }, 1);
}

// 用户中心
export function getUserCenter(params) {
  return request('/tool/ygwApi/vipCenter', params, {
    prompt: false
  }, 1);
}

// 微信支付
export function wxPay(params) {
  return request('/tool/ygwApi/prePay', params, {
    prompt: false
  }, 1);
}

// 充值记录
export function payLog(params) {
  return request('/tool/ygwApi/oldOrderList', params, {
    prompt: false
  }, 1);
}

// 充值列表
export function payList() {
  return request('/tool/ygwApi/payList', {}, {
    prompt: false
  }, 1);
}

// 获取openid
export function getOpenid(params) {
  return request('/tool/ygwApi/getOpenid', params, {
    prompt: false
  }, 1);
}

// 获取师傅电话号码
export function getMasterPhone(params) {
  return request('/tool/ygwApi/getMasterPhone', params, {
    prompt: false
  }, 1);
}

// 校验是否注册过
export function checkUserPhone(params) {
  return request('/tool/ygwApi/checkUserPhone', params, {
    prompt: false
  }, 1);
}

// 用户评论接口
export function getUserComments(params) {
  return request('/tool/ygwApi/getEvals', params, {
    prompt: false
  }, 1);
}

// 类别接口
export function getCate(params) {
  return request('/tool/ygwApi/getCate', params, {
    prompt: false
  }, 1);
}