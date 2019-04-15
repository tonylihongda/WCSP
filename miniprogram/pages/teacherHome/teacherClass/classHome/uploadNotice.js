const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keys: ['', '', ''],
    title: '',
    context: '',
    cloudPath2: '',
    filePath2: '',
  },
  bindTextAreaBlur: function (e) {
    this.data.title = e.detail.value;
  },
  bindTextAreaBlur2: function (e) {
    this.data.context = e.detail.value;
    console.log(e.detail.value)
    console.log(this.data.context)
  },
  input_key1: function (e) {
    this.data.keys[0] = e.detail.value
  },
  input_key2: function (e) {
    this.data.keys[1] = e.detail.value
  },
  input_key3: function (e) {
    this.data.keys[2] = e.detail.value
  },

  uploadNotice: function () {
    var that = this
    that.data.newdate = new Date()
    if (that.data.title == '') {
      console.log("标题不能为空")
    } else if ((that.data.keys[0] == that.data.keys[1] && that.data.keys[1] != '') || (that.data.keys[1] == that.data.keys[2] && that.data.keys[1] != '') || (that.data.keys[0] == that.data.keys[2] && that.data.keys[0] != '')) {
      console.log("关键字不能重复")
    }else if(that.data.filePath2 == '') {
      console.log(that.data.context),
      db.collection('Notices').add({
        data: {
          notice_num: that.data.newdate.getTime(),
          class_id: app.globalData.openclass,
          add_date: new Date(),
          keys: that.data.keys,
          title: that.data.title,
          context: that.data.context,
        },
        success(res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }else{
      console.log(that.data.context),
      wx.cloud.uploadFile({
        cloudPath: that.data.cloudPath2,
        filePath: that.data.filePath2,
        success: res => {
          db.collection('Videos').add({
            data: {
              notice_num: that.data.newdate.getTime(),
              class_id: app.globalData.openclass,
              link_path: that.data.cloudPath2,
              add_date: new Date(),
              keys: that.data.keys,
              title: that.data.title,
              context: that.data.context,
            }
          })
          wx.navigateBack({
            delta: 1
          })
        },
        fail: err => {
          console.log(err)
        },
        complete: () => {
        }
      })
    }
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