const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    examsheet: [],
    x: 0
  },

  onLoad: function (options) {
    var examsheet = []
    db.collection('Section_Student').where({
      student_id: app.globalData.idInfo._id
    }).get().then(res => {
      console.log(res.data.length)
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].exam_time != null) {
          examsheet.push(res.data[i])
          examsheet[0].exam_time = res.data[i].exam_time.toLocaleDateString() + res.data[i].exam_time.toLocaleTimeString()
        }
      }
      this.setData({
        'examsheet': examsheet
      })
      console.log(this.data.examsheet)
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