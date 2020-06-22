// pages/login/login.js
import { userLogin, userRegister, msgCode, getOpenid } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';

Page({

  data: {
    phone: ''
  },


  onShow(){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          getOpenid({code: res.code}).then(res => {
            console.log(res)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 登录按钮
  login(e){
    console.log(e)
    const { phone } = this.data

    if (!phone){
      Toast('请填写邀请码');
      return;
    }

    Toast('登录成功');

    // userLogin({phone}).then(res => {
    //   console.log(res)
    //   Toast('登录成功');
    //   try {
    //     wx.setStorageSync('token', res.token)
    //     wx.setStorageSync('user_id', res.user_id)
    //     wx.navigateBack()
    //   } catch (e) {}
    // }).catch(err => {
    //   Toast(err);
    // })
  },

  // 输入框事件 后期要加防抖
  onChange(e) {
    const key = e.currentTarget.dataset.k
    this.setData({
      [key]: e.detail
    })
  }
})