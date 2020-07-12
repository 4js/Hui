// pages/login/login.js
import { toLogin, getOpenid } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';

Page({

  data: {
    phone: ''
  },


  onShow(){
    let that = this
    wx.login({
      success (res) {
        if (res.code) {
          // 发起网络请求
          getOpenid({code: res.code}).then(res => {
            that.setData({
              openid: res.openid
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 登录按钮
  login(e){
    const { nickName, avatarUrl } = e.detail.userInfo
    const { phone, openid } = this.data

    if (!phone){
      Toast('请填写邀请码');
      return;
    }

    if (!phone || phone.length !==11){
      Toast('请填写正确格式邀请码');
      return;
    }

    Toast.loading({
      mask: true,
      message: '登录中...',
    });

    toLogin({
      tel: phone,
      wx_openid: openid,
      wx_name: nickName,
      wx_avatar: avatarUrl
    }).then(res => {
      Toast('登录成功');
      try {
        wx.setStorageSync('openid', openid)
        wx.switchTab({
          url: '/pages/index/index'
        })
      } catch (e) {}
    }).catch(err => {
      Toast(err)
    }).finally(() => {
      Toast.clear()
    })
  },

  // 输入框事件 后期要加防抖
  onChange(e) {
    const key = e.currentTarget.dataset.k
    this.setData({
      [key]: e.detail
    })
  }
})