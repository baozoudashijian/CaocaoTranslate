// logs.js
let languages = require('../../static/language')
let app = getApp()

Page({
  data: {
    languages: [],
    dataLanguage: {}
  },
  onShow() {
    this.setData({
      languages,
      dataLanguage: app.lang
    })
  },
  selectLanguage(e) {
    this.setData({
      dataLanguage: e.currentTarget.dataset.language
    },() => {
      app.lang = this.data.dataLanguage
      wx.switchTab({
        url: '../index/index'
      })
    })
  }
})
