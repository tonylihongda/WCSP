const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    notice_title: '',
    notice_context: '',
  },
  onLoad: function (options) {
    this.setData({
      notice_title: app.globalData.opennotice.title,
      notice_context: app.globalData.opennotice.context,
      notice_data: app.globalData.opennotice.add_date.getFullYear() + '年' + (app.globalData.opennotice.add_date.getMonth()+1) + '月' + app.globalData.opennotice.add_date.getDate()+'日'
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