const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tName: '',
    tIDnum: '',
    tSex: '',
    tTitle: '',
    school: '',
    tAge: '',
  },

  changekey: function () {
    console.log("修改密码")
    wx.navigateTo({
      url: '/pages/changeKey/changeKey',
    })
  },
  logoff: function () {
    console.log("注销")
    console.log(app.globalData.idInfo._id)
    wx.cloud.callFunction({
      name: 'logoff',
      data: {
        _id: app.globalData.idInfo._id
      },
      success: res => {
        wx.navigateTo({
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
  /**
   * 生命周期函数--监听页面加载
   */
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})