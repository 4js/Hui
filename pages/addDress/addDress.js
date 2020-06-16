import area from '../../utils/area'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    area: '',
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
    console.log(e.detail.values)
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
  }
})