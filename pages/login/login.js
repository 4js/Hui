// pages/login/login.js
import { userLogin, userRegister, msgCode, checkUserPhone } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';

Page({

  data: {
    phone: ''
  },

  // 登录按钮
  login(){
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