// pages/log/log.js
import { payLog } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    floorstatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(1)
  },

  getData(page){
    payLog({limit: 20, page}).then(res => {
      let arr = this.data.list
      this.setData({
        list: page === 1 ? res.info.list : arr.concat(res.info.list || []),
        page: page + 1
      })
    }).catch(err => {
      Toast(err)
    })
  },

  // 页面滚动事件
  onPageScroll: function (e) {
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData(this.data.page)
  }
})