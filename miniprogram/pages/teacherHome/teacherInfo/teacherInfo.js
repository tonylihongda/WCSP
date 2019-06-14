const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    tName: '',
    tIDnum: '',
    tSex: '',
    tTitle: '',
    school: '',
    tAge: '',
  },
  changekey: function () {

    wx.navigateTo({
      url: '/pages/changeKey/changeKey',
    })
  },
  logoff: function () {
    wx.showLoading({
      title: '注销中',
    })

    wx.cloud.callFunction({
      name: 'logoff',
      data: {
        _id: app.globalData.idInfo._id
      },
      success: res => {
        wx.reLaunch({
          url: '/pages/firstTime/firstTime',
        })
      },
      fail: err => {
        console.error('[云函数] [logoff] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  onLoad: function (options) {
    var today = new Date();
    var age = Math.ceil((today.getTime() - app.globalData.idInfo.birthday.getTime()) / (24 * 60 * 60 * 1000 * 365.25))
    this.setData({
      tName: app.globalData.idInfo.tName,
      tIDnum: app.globalData.idInfo.tIDnum,
      tSex: app.globalData.idInfo.tSex,
      tTitle: app.globalData.idInfo.tTitle,
      school: app.globalData.idInfo.school,
      tAge: age,
    })
  },
})