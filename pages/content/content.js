/*
 * @Author: your name
 * @Date: 2020-07-13 14:58:26
 * @LastEditTime: 2020-07-13 15:08:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Hui\pages\content\content.js
 */ 
import { getOptions } from '../../utils/util'
import { getOneGoods, addGoodsCart, createOrder } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

  // 页面的初始数据
  data: {
    openid: '',
    goods_id: '',
    goodInfo: {},
    detail_top_img: [],
    detail_img: [],
    number: 1
  },

  // 生命周期函数--监听页面加载
  onShow: function () {
    this.getList()
  },

  // 初始化数据
  getList(){
    const _this = this
    const options = getOptions()
    const wx_openid = app.globalData.openid
    getOneGoods({ goods_id: options.d, wx_openid }).then(resp => {
      _this.setData({
        openid: wx_openid,
        goods_id: options.d,
        detail_top_img: resp.detail_top_img.split(','),
        detail_img: resp.detail_img.split(','),
        goodInfo: resp
      })
    }).catch(err => Toast(err))
    wx.stopPullDownRefresh()
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.getList()
  },

  addCart(){
    const { goods_id, number: goods_count, 'openid': wx_openid } = this.data
    addGoodsCart({goods_id, wx_openid, goods_count}).then(res => {
      Toast('添加成功')
    }).catch(err => Toast(err))
  },

  // 改变商品的数量
  onChangeNum(e){
    this.setData({
      number: e.detail
    })
  },

  goPurchase() {
    Toast.loading({
      mask: true,
      message: '下单中...',
    });
    const { goods_id, number, 'openid': wx_openid } = this.data
    createOrder({wx_openid, goods_list: JSON.stringify([{ 'goods_id': goods_id, 'goods_count': number }])}).then(res => {
      if (res && res.order_id) {
        setTimeout(function(){
          Toast.clear()
          wx.removeStorageSync('selectAddress')
          wx.navigateTo({
            url: '/pages/confirm/confirm?d=' + res.order_id
          })
        }, 1000)
      } else { Toast.clear()}
    }).catch(err => {
      Toast.clear()
      Toast(err)
    })
  },

  // 切换到购物车页面
  goCart(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  }
})