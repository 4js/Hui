// pages/home/home.js
import Toast from '@vant/weapp/toast/toast';
import { openPay, getOpenid } from '../../utils/api'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ''
  },

  onShow(){
    let _this = this
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          getOpenid({code: res.code}).then(resp => {
            app.globalData.openid = resp.openid // 存到全局数据里
            _this.setData({
              openid: resp.openid
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  pay(){
    const { openid } = this.data
    openPay({
      order_id: 82,
      wx_openid: openid
    }).then(response => {
      wx.requestPayment({
        timeStamp: response.timeStamp,
        nonceStr: response.nonceStr,
        package: response.package,
        signType: response.signType,
        paySign: response.paySign,
        success (res) { 
          Toast('支付成功')
        },
        fail (res) {
          Toast('支付失败')
        }
      })
    })
  }
  
})