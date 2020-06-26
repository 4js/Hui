import { getAddressList } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
const app = getApp()
Page({

  data: {
    list: []
  },

  onShow: function () {
    const _this = this
    const wx_openid = app.globalData.openid
    getAddressList({wx_openid}).then(res => {
      console.log(res)
      _this.setData({
        list: res
      })
    })
  },

  toAdd(){
    wx.navigateTo({
      url: '/pages/addDress/addDress'
    })
  },

  // 删除单个地址
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
})