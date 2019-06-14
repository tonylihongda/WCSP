const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    userName: '',
  },
  onLoad: function (options) {
    app.editTabBar2();
    this.setData({
      userName: app.globalData.idInfo.tName,
    })
  },
  infoManage: function () {
    wx.navigateTo({
      url: 'teacherInfo/teacherInfo'
    })
  },
})