import { getOptions } from '../../utils/util'
import { getOneGoods, addGoodsCart } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

  // 页面的初始数据
  data: {
    openid: '',
    goods_id: '',
    goodInfo: {},
    cover_img: [],
    detail_img: []
  },

  // 生命周期函数--监听页面加载
  onShow: function () {
    const _this = this
    const options = getOptions()
    const wx_openid = app.globalData.openid
    getOneGoods({ goods_id: options.d, wx_openid }).then(resp => {
      console.log(resp)
      _this.setData({
        openid: wx_openid,
        goods_id: options.d,
        cover_img: resp.cover_img.split(','),
        detail_img: resp.detail_img.split(','),
        goodInfo: resp
      })
    })
  },

  addCart(){
    const { goods_id, 'openid': wx_openid } = this.data
    addGoodsCart({goods_id, wx_openid}).then(res => {
      console.log(res)
      Toast('添加成功')
    }).catch(err => Toast(err))
  },

  onClickButton() {
    Toast('点击按钮');
  }

})