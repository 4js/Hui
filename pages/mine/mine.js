import { getUserCenter } from '../../utils/api'
const app = getApp()

Page({

  // 页面的初始数据
  data: {
    userInfo: {}
  },

  // 生命周期函数--监听页面加载
  onShow: function () {
    const _this = this
    const wx_openid = app.globalData.openid
    getUserCenter({ wx_openid }).then(resp => {
      console.log(resp)
      _this.setData({
        userInfo: resp
      })
    })
  },

  goOrderList(e){
    wx.navigateTo({
      url: '/pages/order/order?t=' + e.currentTarget.dataset.t
    })
  }

})