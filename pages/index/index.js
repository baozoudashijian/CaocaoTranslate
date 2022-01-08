// index.js
// 获取应用实例
let ajax = require("../../ajax/index")
const app = getApp()

Page({
  data: {
    text: '',
    result: '',
    language: {key: '英文', value: 'en'}
  },
  translateHandler() {
    let options = {
      value: this.data.text,
      from: this.data.language.value,
      to: 'zh'
    }
    if(!options.value) {
      wx.showToast({
        title: '请输入翻译内容',
        icon: 'none'
      })
      return
    }
    ajax.translate(options, (res) => {
      if(res.data && res.data.trans_result) {
        let trans_result = res.data.trans_result[0].dst
        this.setData({
          result: trans_result
         })
         let storage = wx.getStorageSync('logs')
         if(storage) {
          storage.unshift({
             key: options.value,
             value: trans_result
            })
            wx.setStorageSync('logs', storage)
         } else {
          let log = []
          log.unshift({
            key: options.value,
            value: trans_result
           })
            wx.setStorageSync('logs', log)
         }
         
      } else {
        wx.showToast({
          title: '翻译失败',
          icon: 'none'
        })
      }
    })
  },
  getTextareaValue(e) {
    this.setData({
      text: e.detail.value
     })
  },
  delText() {
    this.setData({
      text: '',
      result: ''
     })
  },
  toSelectLanguage() {
    app.lang = this.data.language
    this.delText()
    wx.navigateTo({
      url: '../language/language'
    })
  },
  onShow() {
    if(app.lang) {
      this.setData({
        language: app.lang
      })
    }
  }
  // // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad() {
  //   console.log(wx)
  //   if (wx.getUserProfile) {
  //     this.setData({
  //       canIUseGetUserProfile: true
  //     })
  //   }
  // },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
