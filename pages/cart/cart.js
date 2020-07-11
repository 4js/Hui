import { getCartList, deleteOneFromCart, addGoodsCart } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
const app = getApp()

Page({

  // 页面的初始数据
  data: {
    checkedAll: false,
    checkList: '',
    list: [],
    total: 0
  },

  // 生命周期函数--监听页面加载
  onShow: function () {
    this.getList()
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.getList()
  },

  // 初始化数据
  getList(){
    const _this = this
    const wx_openid = app.globalData.openid
    getCartList({ wx_openid }).then(resp => {
      const cartList = resp.list.map(item => { return Object.assign(item, {cover_img: item.cover_img.split(',')[0]}) })
      _this.setData({
        list: cartList
      }, () => {
        _this.calcueTotal()
      })
    }).catch(err => Toast(err))
    wx.stopPullDownRefresh()
  },

  // changeAll(e){
  //   const { list } = this.data
  //   this.setData({
  //     checkedAll: e.detail,
  //     checkList: e.detail ? list.map(item => item.shop_cart_id) : []
  //   }, function(){
  //     this.calcueTotal()
  //   })
  // },

  // 选择单个商品
  singleChange(e){
    this.setData({
      checkList: e.detail
    }, function(){
      this.calcueTotal()
    })
  },

  // 删除单个商品
  delete(event){
    const wx_openid = app.globalData.openid
    const { id: shop_cart_ids } = event.currentTarget.dataset
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close()
        break
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          deleteOneFromCart({wx_openid, shop_cart_ids}).then(res => {
            Toast('删除成功')
            this.getList()
          }).catch(err => Toast(err))
          instance.close()
        }).catch(() => {
          instance.close()
        })
        break
    }
  },

  // 去下单
  goPurchase() {
    const { list, checkList } = this.data
    const wx_openid = app.globalData.openid

    if (checkList.length===0) {
      Toast('请选择要购买的商品')
      return false
    }

    Toast.loading({
      mask: true,
      message: '下单中...',
    })
    // 处理商品数组
    console.log(checkList)
    // const goods_list = checkList
    //   .map(id => list.find(item => item.shop_cart_id === id))
    //   .map(goods => { return {goods_id: goods.goods_id, goods_count: goods.goods_count} })
    // createOrder({wx_openid, goods_list: JSON.stringify(goods_list)}).then(res => {
    //   if (res && res.order_id) {
    //     setTimeout(function(){
    //       Toast.clear()
    //       wx.navigateTo({
    //         url: '/pages/confirm/confirm?d=' + res.order_id
    //       })
    //     }, 1000)
    //   } else { Toast.clear()}
    // }).catch(err => {
    //   Toast.clear()
    //   Toast(err)
    // })
  },

  // 改变商品的数量
  onChangeNum(e){
    const _this = this
    const wx_openid = app.globalData.openid
    const index = e.currentTarget.dataset.ind
    const goodsID = e.currentTarget.dataset.gd
    const up = 'list[' + index + '].goods_count' 
    addGoodsCart({ wx_openid, goods_id: goodsID, goods_count: e.detail }).then(res => {
      _this.getList()
    })
    // this.setData({
    //   [up]: e.detail
    // },function(){
    //   this.calcueTotal()
    // })
  },

  noop(e){
    console.log(e)
  },

  // 计算总价
  calcueTotal(){
    const { list, checkList } = this.data
    let totalMoney = 0
    if (checkList.length) {
      // totalMoney = checkList
      //   .map(id => list.find(item => item.shop_cart_id === id))
      //   .map(goods => Number(goods.goods_price) * Number(goods.goods_count || 1))
      //   .reduce((prev, cur) => prev + cur)
      console.log(list.filter(item => item.shop_cart_id === checkList))
      totalMoney = list.filter(item => item.shop_cart_id === checkList).map(goods => Number(goods.goods_price) * Number(goods.goods_count || 1))[0]
    }
    this.setData({
      total: totalMoney * 100
    })
  }

})