import { getOptions } from '../../utils/util'
import { getOneOrder, addGoodsCart, createOrder } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

  // 页面的初始数据
  data: {
    orderInfo: {},
    address: '',
    userName: '',
    userTel: ''
  },

  onShow(){
    this.getList()
  },

  getList(){
    const _this = this
    const { d: order_id } = getOptions()
    const wx_openid = app.globalData.openid
    getOneOrder({order_id, wx_openid}).then(res => {
      const addressArr = res.address.split(' ')
      _this.setData({
        orderInfo: res,
        address: addressArr.slice(0, 4).join(''),
        userName: addressArr[4],
        userTel: addressArr[5]
      })
    }).catch(err => Toast(err))
  },

  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none'
            })
          }
        })
      }
    })
  }
  
})