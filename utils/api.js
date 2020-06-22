import request from "./request.js"

// 获取openid
export function getOpenid(params) {
  return request('/?c=user&a=useropenid&v=app&site=user', params, {
    prompt: false
  }, 1);
}
