const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sName: '',
    sIDnum: '',
    sSex: '',
    sYear: '',
    school: '',
    major: '',
  },

  changekey: function(){
    console.log("修改密码")
    wx.navigateTo({
      url: '/pages/changeKey/changeKey',
    })
  },

  logoff: function(){
    console.log("注销")
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
    this.setData({
      sName: app.globalData.idInfo.sName,
      sIDnum: app.globalData.idInfo.sIDnum,
      sSex: app.globalData.idInfo.sSex,
      sYear: app.globalData.idInfo.sYear,
      school: app.globalData.idInfo.school,
      major: app.globalData.idInfo.major,
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