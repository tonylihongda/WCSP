const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    userName: '',
  },
  onLoad: function (options) {
    app.editTabBar();
    this.setData({
      userName: app.globalData.idInfo.sName,
    })
  },

  //查看个人信息
  infoManage: function(){
    wx.navigateTo({
      url: 'studentInfo/studentInfo'
    })
  },

  //查看成绩
  scoreManage: function () {
    wx.navigateTo({
      url: 'studentScore/studentScore'
    })
  },

  //考试管理
  examManage: function () {
    wx.navigateTo({
      url: 'studentExam/studentExam'
    })
  },

  onShow: function () {
    this.setData({
      userName: app.globalData.idInfo.sName,
    })
  },
})