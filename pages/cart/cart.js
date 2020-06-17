// pages/cart/cart.js
Page({

  // 页面的初始数据
  data: {
    checkedAll: false,
    checkList: ['a', 'b'],
    list: ['a', 'b', 'c'],
    result: ['a', 'b']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    })
  },

  onChangeNum(e){
    console.log(e.detail)
  },

  noop(e){
    console.log(e)
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },


  onChange(event) {
    this.setData({
      result: event.detail
    });
  }

})