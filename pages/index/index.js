//index.js
//获取应用实例
const app = getApp()
import { getCityList, getMasterList, getCate } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' }
    ],
    columns: [],
    provinceList: [], // 城市列表
    masterList: [], // 师傅列表
    sheng: '',
    city_id: '',
    shiname: '',
    show: false,
    token: '',
    static: {
      con: 0,
      singu: 0,
      price: 0,
      pre: 0
    },
    type: '',
    showType: false,
    type_id: 0,
    shi: '',
    page: 1,
    showShi: false,
    shi_id: 0,
    cityList: [], //城市列表
    floorstatus: false
  },

  onLoad(){
    getCityList().then(d => {
      this.setData({
        provinceList: d.info
      })
    })
    this.searchMaster({page: 1})
  },

  onShow(){
    const token = wx.getStorageSync('token')
    this.setData({token})
    getCate().then(res => {
      console.log('res', res)
      this.setData({
        token: token,
        columns: res.info
      })
    })
  },

  // 展开选择区域
  showProvince() {
    this.setData({
      show: true
    })
  },

  // 展开类型
  showTypeSelect() {
    this.setData({
      showType: true
    })
  },

  // 展开市区
  showShiSelect() {
    this.setData({
      showShi: true
    })
  },

  // 类型点击确定
  typeConfirm(e){
    this.setData({
      showType: false,
      type: e.detail.value.name,
      type_id: e.detail.value.id
    })
  },

  // 类型点击取消
  typeCancel(e){
    this.setData({
      showType: false
    })
  },

  // 城市点击取消
  onCancel(e){
    this.setData({
      show: false
    })
  },

  onConfirm(e){
    getCityList({pid: e.detail.value.id}).then(d => {
      this.setData({
        cityList: d.info,
        show: false,
        sheng: e.detail.value.name,
        city_id: e.detail.value.id,
        shi: '请选择',
        shi_id: 0
      })
    })
  },

  // 城市点击确定
  shiConfirm(e){
    console.log(e.detail.value)
    this.setData({
      showShi: false,
      shi: e.detail.value.name,
      shi_id: e.detail.value.id
    })
  },

  // 城市点击取消
  shiCancel(e){
    this.setData({
      showShi: false
    })
  },

  // 搜索师傅列表
  searchMaster(param={}){
    const { type_id, shi_id, city_id } = this.data
    Toast.loading({
      forbidClick: true, // 禁用背景点击
      message: '加载中...',
      loadingType: 'spinner'
    });
    const ct = shi_id ? shi_id : city_id
    getMasterList(Object.assign({ limit: 10, cate_id: type_id, 'city_id': ct }, param)).then(d => {
      Toast.clear()
      let arr = this.data.masterList
      this.setData({
        page: param.page + 1,
        masterList: param.page === 1 ? d.info.list : arr.concat(d.info.list || []),
        static: d.info.numInfo
      })
    }).catch(err => {
      Toast(err)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.searchMaster({page: this.data.page})
  },

  // 页面滚动事件
  onPageScroll: function (e) {
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  // 输入师傅名字
  onNameChange(e){
    this.setData({
      shiname: e.detail.value
    })
  },

  // 点击搜索按钮开始搜索
  search(){
    const { shiname } = this.data
    const obj = { true_name: shiname }
    obj.page = 1
    this.searchMaster(obj)
  },

  // 点击清除按钮
  clearAll(){
    this.setData({
      sheng: '',
      city_id: 0,
      shi_id: 0,
      type_id: 0,
      shi: '',
      type: '',
      shiname: ''
    })
    this.searchMaster({page: 1})
  },

  // 去师傅详情页
  goDetail(e){
    if (this.data.token) {
      wx.navigateTo({
        url: "/pages/content/content?id=" + e.currentTarget.dataset.id
      })
    } else { 
      Toast('请先登录')
      setTimeout(function(){
        wx.navigateTo({
          url: "/pages/login/login"
        })
      }, 1000)
    }
  },

  // 点击充值按钮
  goChong(){
    if (this.data.token) {
      wx.navigateTo({
        url: "/pages/money/money"
      })
    } else { 
      Toast('请先登录')
      setTimeout(function(){
        wx.navigateTo({
          url: "/pages/login/login"
        })
      }, 1000)
    }
  },

  getUserInfo: function(e) {
  }
})
