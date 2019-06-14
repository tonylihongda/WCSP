const app = getApp()
const db = wx.cloud.database()

Page({

  data: {
    tTitle: '教授',
    tIDkey: '144961',
    tIDnum: '',
    tName: '都敏俊',
    tSex: '男',
    birthday: '1970-05-05',
    school: '软件学院'
  },
  ok: function () {
    var that = this
    if (that.data.tIDnum.length != 9) {
      wx.showToast({
        title: '职工号长度为9位',
        icon: 'loading',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '加入中',
        icon: 'loading',
      })
      db.collection('Teachers').add({
        data: {
          tTitle: that.data.tTitle,
          tIDkey: that.data.tIDkey,
          tIDnum: that.data.tIDnum,
          tName: that.data.tName,
          tSex: that.data.tSex,
          birthday: that.data.birthday,
          school: that.data.school,
        },
        success(res) {
          wx.redirectTo({
            url: '/pages/teacher/teacher',
          })
        }
      })
    }

  },
  tTitle: function (e) {
    this.data.tTitle = e.detail.value;
  },
  tIDkey: function (e) {
    this.data.tIDkey = e.detail.value;
  },
  tIDnum: function (e) {
    this.data.tIDnum = e.detail.value;
  },
  tName: function (e) {
    this.data.tName = e.detail.value;
  },
  tSex: function (e) {
    this.data.tSex = e.detail.value;
  },
  birthday: function (e) {
    this.data.birthday = e.detail.value;
  },
  school: function (e) {
    this.data.school = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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