// pages/login/login.js
import { userLogin, userRegister, msgCode, checkUserPhone } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    loginPhone: '',
    loginPassword: '',
    isShowPassword: true,
    regUsername: '',
    regPhone: '',
    regPassword: '',
    regConPassword: '',
    regSms: '',
    phone: '',
    password: '',
    conpassword: '',
    sms: '',
    loading: false,
    interval: 60
  },

  // 登录按钮
  login(){
    const { loginPhone, loginPassword } = this.data

    if (!loginPhone || !loginPassword){
      Toast('请填写手机号和密码');
      return;
    }

    userLogin({typeVal: loginPhone, password: loginPassword}).then(res => {
      console.log(res)
      Toast('登录成功');
      try {
        wx.setStorageSync('token', res.token)
        wx.setStorageSync('user_id', res.user_id)
        wx.navigateBack()
      } catch (e) {}
    }).catch(err => {
      Toast(err);
    })
  },

  // 注册按钮
  register(){
    const {regPhone, regPassword, regSms, regConPassword, regUsername} = this.data
    if (regPassword.length < 6 || regConPassword.length < 6){
      Toast('请输入6-16位密码');
      return;
    }
    if(regPassword !== regConPassword){
      Toast('两次密码输入不一致');
      return;
    }
    if (!regPhone || !regPassword || !regSms || !regUsername) {
      Toast('数据不可为空');
      return;
    }
    userRegister({
      user_name: regUsername,
      phone: regPhone,
      password: regPassword,
      password2: regConPassword,
      code: regSms
    }).then(res => {
      Toast('注册成功,请登录');
      this.setData({
        active: 1,
        regUsername: '',
        regPhone: '',
        regPassword: '',
        regConPassword: '',
        regSms: ''
      })
    }).catch(err => {
      Toast(err);
    })
  },

  hasRegister(){
    let _this = this
    const {regPhone} = this.data

    if (!regPhone || regPhone.length !==11){
      Toast('请填写正确格式手机号');
      return;
    }
    checkUserPhone({userName: regPhone, codeType: 'phone'}).then(res => {
      _this.startInter()
    }).catch(err => Toast(err))
  },

  // 开始倒计时
  startInter(){
    let _this = this
    const {regPhone} = this.data

    if(this.data.loading) return;

    if (!regPhone || regPhone.length !==11){
      Toast('请填写正确格式手机号');
      return;
    }

    // 获取验证码
    msgCode({codeType: 'phone', userName: regPhone, type: 1}).then(res => {
      this.setData({
        loading: true
      })
      Toast('验证码已发送');
      // 获取成功
      _this.timer = setInterval(function(){
        let mis = _this.data.interval
        _this.setData({
          interval: mis-1
        })
        if(mis === 1){
          clearInterval(_this.timer)
          _this.setData({
            interval: 60,
            loading: false
          })
        }
      }, 1000)
    }).catch(err => Toast(err))

  },

  onChange(e) {
    const key = e.currentTarget.dataset.k
    this.setData({
      [key]: e.detail
    })
  }
})