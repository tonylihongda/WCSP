const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    sName: '',
    sIDnum: '',
    sSex: '',
    sYear: '',
    school: '',
    major: '',
  },
  changekey: function(){
    wx.navigateTo({
      url: '/pages/changeKey/changeKey',
    })
  },
  logoff: function(){
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
    this.setData({
      sName: app.globalData.idInfo.sName,
      sIDnum: app.globalData.idInfo.sIDnum,
      sSex: app.globalData.idInfo.sSex,
      sYear: app.globalData.idInfo.sYear,
      school: app.globalData.idInfo.school,
      major: app.globalData.idInfo.major,
    })
  },
})