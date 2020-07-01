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
    steps: [
      {
        text: '已签收',
        desc: '您的订单正在配送中（快递员：小二，电话：13737676278），请耐心等待'
      },
      {
        text: '运输中',
        desc: '已到达【北京东城区】'
      },
      {
        text: '已揽收',
        desc: '2020.06.20 23:23:23'
      },
      {
        text: '您的订单已发货',
        desc: '快递单号：39823762376232332'
      }
    ]
  },
  onShow(){
    this.getLogisticInfo()
  },
  // 获取物流信息
  getLogisticInfo(){
    const _this = this
    const options = getOptions()
    getLogistic({ order_id: options.d}).then(res => {
      const steps = res.data.Traces.map(item => {
        return {
          text: item.AcceptStation,
          desc: item.AcceptTime
        }
      })
      _this.setData({
        steps,
        code: res.data.LogisticCode,
        shipper: res.data.ShipperCode
      })
    })
  }
})