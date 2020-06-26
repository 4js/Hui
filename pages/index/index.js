import { getIndexGoods } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()

Page({
  data: {
    background: [
      'https://img.mukewang.com/5ee24f3000017d0218720764.jpg',
      'https://img.mukewang.com/5ee1d3dd00012d7b18720764.jpg',
      'https://img.mukewang.com/5ee1d46c0001d51318720764.jpg',
      'https://img.mukewang.com/5ee2efe000013f2f18720764.jpg'
    ],
    // 轮播图
    banner_goods: [],
    // 推荐好物
    quality_goods: [],
    // 其他商品
    common_goods: [],
    // 滚动标识
    floorstatus: false
  },

  // 生命周期函数
  onShow(){
    let _this = this
    const wx_openid = app.globalData.openid
    getIndexGoods({ wx_openid }).then(res => {
      console.log(res)
      const { common_goods, banner_goods, quality_goods } = res
      if (res) {
        _this.setData({
          banner_goods,
          quality_goods,
          common_goods
        })
      }
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
  }
})
