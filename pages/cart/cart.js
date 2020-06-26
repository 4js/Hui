import { getCartList } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
const app = getApp()

Page({

  // 页面的初始数据
  data: {
    checkedAll: false,
    checkList: ['a', 'b'],
    list: ['a', 'b', 'c'],
    result: ['a', 'b']
  },

  // 生命周期函数--监听页面加载
  onShow: function () {
    const wx_openid = app.globalData.openid
    getCartList({ wx_openid }).then(resp => {
      console.log(resp)
    }).catch(err => Toast(err))
  },

  changeAll(e){
    this.setData({
      checkedAll: e.detail
    })
  },

  // 选择单个商品
  singleChange(e){
    this.setData({
      checkList: e.detail
    }, function(){
      console.log(this.data.checkList)
    })
  },

  // 删除单个商品
  delete(event){
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
          instance.close()
        }).catch(() => {
          instance.close()
        })
        break
    }
  },

  onChangeNum(e){
    console.log(e.detail)
  },

  noop(e){
    console.log(e)
  }

})