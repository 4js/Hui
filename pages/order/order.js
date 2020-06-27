import { getOptions } from '../../utils/util'
import { getOrderList, addGoodsCart, createOrder } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()

// const status = {
//   '1': 0,
//   '2': 1,
//   '3': 4,
//   '4': 2,
//   '5': 3
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: []
  },

  onShow(){
    const { t } = getOptions()
    this.setData({
      active: t
    })
    this.getList(t)
  },

  getList(status){
    const _this = this
    const wx_openid = app.globalData.openid
    getOrderList({ order_status: status, wx_openid }).then(res => {
      console.log(res)
      _this.setData({
        list: res ? res : []
      })
    }).catch(err => Toast(err))
  },

  onChange(e){
    const type = e.detail.name
    this.setData({
      active: type
    })
    this.getList(type)
  }

})