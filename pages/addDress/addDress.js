const app = getApp()
import area from '../../utils/area'
import { updateAddress } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    areaFull: '',
    province_id: '',
    city_id: '',
    county_id: '',
    address: '',
    isMore: true,
    show: false, // 是否展示省市区弹框
    areaList: area
  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    console.log(area)
  },

  // 展示省市区选择框
  showArea(){
    this.setData({
      show: true
    })
  },

  // 关闭省市区选择框
  onClose(){
    this.setData({
      show: false
    })
  },

  // 省市区选择框-确定
  handleConfirm(e){
    const address = e.detail.values
    this.setData({
      show: false,
      province_id: address[0].code,
      city_id: address[1].code,
      county_id: address[2].code,
      areaFull: address.map(item => item.name).join(' ')
    })
  },

  // 省市区选择框-取消
  handleCancel(){
    console.log('取消')
  },

  // 输入框事件 后期要加防抖
  onChange(e) {
    const key = e.currentTarget.dataset.k
    this.setData({
      [key]: e.detail
    })
  },

  // 点击按钮新增地址
  addAddress(){
    const { username, phone, areaFull, address, province_id, city_id, county_id } = this.data

    if (!username){
      Toast('请填写用户名');
      return;
    }

    if (!phone || phone.length !== 11){
      Toast('请填写正确格式手机号');
      return;
    }

    if (!areaFull){
      Toast('选择区域');
      return;
    }

    if (!address || address.length < 6){
      Toast('请填写详细地址');
      return;
    }


    Toast.loading({
      mask: true,
      message: '添加中...',
    });

    const wx_openid = app.globalData.openid
    updateAddress({ 
      true_name: username,
      address_tel: phone,
      datail_address: address,
      address_default: 1,
      wx_openid,
      province_id,
      city_id,
      county_id,
    }).then(res => {
      Toast('添加成功')
      setTimeout(function(){
        //跳转回列表页
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }).catch(err => Toast(err))
  }
})