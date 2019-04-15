const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var class_name = ''
    db.collection('Classes').doc(app.globalData.openclass).get({
      success(res) {
        class_name = res.data.cName
        that.setData({
          class_name: class_name
        })
      }
    })
  },
  studentList: function(){
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/studentList/studentList'
    })
  },
  video_home: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/videoHome'
    })
  },
  audio_home: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/audio_Home'
    })
  },
  notice_home: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/notice_Home'
    })
  },
  file_home: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/file_Home'
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