//index.js
//获取应用实例
const app = getApp()
// import { getCityList, getMasterList, getCate } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    background: [
      'https://img.mukewang.com/5ee24f3000017d0218720764.jpg',
      'https://img.mukewang.com/5ee1d3dd00012d7b18720764.jpg',
      'https://img.mukewang.com/5ee1d46c0001d51318720764.jpg',
      'https://img.mukewang.com/5ee2efe000013f2f18720764.jpg'
    ]
  },

  onLoad(){
  },

  onShow(){
    const token = wx.getStorageSync('token')
    this.setData({token})
  },


})
