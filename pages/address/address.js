// pages/address/address.js
import Toast from '@vant/weapp/toast/toast';
import { wxPay } from '../../utils/api';
Page({

  data: {

  },

  onShow: function () {

  },

  toAdd(){
    wx.navigateTo({
      url: '/pages/addDress/addDress'
    })
  }
})