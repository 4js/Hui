// pages/logist/logist.js
import { getLogistic } from '../../utils/api'
import { getOptions } from '../../utils/util'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    shipper: '',
    code: '',
    steps: []
  },
  onShow(){
    this.getLogisticInfo()
  },
  // 获取物流信息
  getLogisticInfo(){
    const _this = this
    const options = getOptions()
    getLogistic({ order_id: options.d}).then(res => {
      const steps = res.Traces.map(item => {
        return {
          text: item.AcceptStation,
          desc: item.AcceptTime
        }
      }).reverse()
      _this.setData({
        steps,
        code: res.LogisticCode,
        shipper: res.ShipperCode
      })
    })
  }
})