const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keys: ['', '', ''],
    title: '',
    intro: '',
    cloudPath: '',
    filePath: '',
    disable: false,
  },
  bindTextAreaBlur: function (e) {
    this.data.title = e.detail.value;
  },
  bindTextAreaBlur2: function (e) {
    this.data.intro = e.detail.value;
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

  uploadAudio: function () {
    var that = this
    if (that.data.title == '') {
      wx.showToast({
        title: '标题不能为空',
        image: '/images/error.png',
        duration: 1500
      })
    } else if (that.data.filename == '') {
      wx.showToast({
        title: '请选择音频文件',
        image: '/images/error.png',
        duration: 1500
      })
    } else if ((that.data.keys[0] == that.data.keys[1] && that.data.keys[1] != '') || (that.data.keys[1] == that.data.keys[2] && that.data.keys[1] != '') || (that.data.keys[0] == that.data.keys[2] && that.data.keys[0] != '')) {
      wx.showToast({
        title: '关键字不能重复',
        image: '/images/error.png',
        duration: 1500
      })
    } else {
      wx.showLoading({
        title: '上传中',
      })
      wx.cloud.uploadFile({
        cloudPath: that.data.cloudPath,
        filePath: that.data.filePath,
        success: res => {
          db.collection('Audios').add({
            data: {
              file_path: res.fileID,
              audio_num: that.data.newdate.getTime(),
              class_id: app.globalData.openclass,
              audio_path: that.data.cloudPath,
              add_date: new Date(),
              keys: that.data.keys,
              title: that.data.title,
              intro: that.data.intro,
              size: that.data.size,
              audioname: that.data.filename
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

  selectAudio: function () {
    var that = this


    wx.chooseMessageFile({
      type: 'file',
      count: 1,
      success(res) {
        if (res.size > 52428800) {
          wx.showToast({
            title: '文件最大为50MB',
            image: '/images/error.png',
            duration: 2000
          })
        } else {
          that.data.newdate = new Date()
          that.data.filePath = res.tempFiles[0].path
          that.data.cloudPath = 'Classes/' + app.globalData.openclass + '/Audios/' + that.data.newdate.getTime() + '.mp3'
          that.data.size = res.tempFiles[0].size
          that.data.filename = res.tempFiles[0].name
          var disable = true
          that.setData({ disable: disable})
        }
      }
    })
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