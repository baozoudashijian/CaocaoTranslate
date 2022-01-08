// logs.js

Page({
  data: {
    logs: []
  },
  onShow() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          key: log.key,
          value: log.value
        }
      })
    },() => {
      console.log(this.data.logs)
    })
  }
})
