const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keys: ['','',''],
    title: '',
    intro: '',
    //cloudPath1: '',
    cloudPath2: '',
    //filePath1: '',
    filePath2: '',
    disable: false,
  },
  bindTextAreaBlur: function (e) {
    this.data.title = e.detail.value;
  },
  bindTextAreaBlur2: function (e) {
    this.data.intro = e.detail.value;
  },
  input_key1: function(e){
    this.data.keys[0] = e.detail.value
  },
  input_key2: function (e) {
    this.data.keys[1] = e.detail.value
  },
  input_key3: function (e) {
    this.data.keys[2] = e.detail.value
  },

  uploadVideo: function(){
    var that = this
    if(that.data.title == ''){
      console.log("标题不能为空")
    } else if (that.data.filePath2 == ''){
      console.log("请选择视频")
    } else if ((that.data.keys[0] == that.data.keys[1] && that.data.keys[1] != '') || (that.data.keys[1] == that.data.keys[2] && that.data.keys[1] != '') || (that.data.keys[0] == that.data.keys[2] && that.data.keys[0] != '')){
      console.log("关键字不能重复")
    }else{

      console.log(that.data)
      wx.cloud.uploadFile({
        cloudPath: that.data.cloudPath2,
        filePath: that.data.filePath2,
        success: res => {
          db.collection('Videos').add({
            data: {
              video_num: that.data.newdate.getTime(),
              class_id: app.globalData.openclass,
              video_path: that.data.cloudPath2,
              //image_path: that.data.cloudPath1,
              add_date: new Date(),
              keys: that.data.keys,
              title: that.data.title,
              intro: that.data.intro,
              duration: that.data.duration,
              size: that.data.size,
              file_path: res.fileID,
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
      /*console.log(that.data)
      wx.cloud.uploadFile({
        cloudPath: that.data.cloudPath1,
        filePath: that.data.filePath1,
        success: res => {

          wx.cloud.uploadFile({
            cloudPath: that.data.cloudPath2,
            filePath: that.data.filePath2,
            success: res => {
              db.collection('Videos').add({
                data: {
                  video_num: that.data.newdate.getTime(),
                  class_id: app.globalData.openclass,
                  video_path: that.data.cloudPath2,
                  image_path: that.data.cloudPath1,
                  add_date: new Date(),
                  keys: that.data.keys,
                  title: that.data.title,
                  intro: that.data.intro,
                  duration: that.data.duration,
                  size: that.data.size,
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
        },
        fail: err => {
          console.log(err)
        },
        complete: () => {
        }
      })*/
    }
  },

  selectVideo: function(){
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      //maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.data.duration = res.duration
        that.data.size = res.size
        that.data.newdate = new Date()
        that.data.filePath2 = res.tempFilePath
        that.data.cloudPath2 = 'Classes/' + app.globalData.openclass + '/Videos/' + that.data.newdate.getTime() + '.mp4'
        var disable = true
        that.setData({ disable: disable })

        //that.data.cloudPath1 = 'Classes/Videos/' + app.globalData.openclass + '/' + that.data.newdate.getTime() + that.data.filePath1.match(/\.[^.]+?$/)
        /*wx.cloud.callFunction({
          name: 'returnPath',
          data: {
            filePath: that.data.filePath2
          },
          success: res => {
            that.data.cloudPath2 = 'Classes/Videos/' + app.globalData.openclass + '/' + that.data.newdate.getTime() + res.cloudPath
          },
          fail: err => {
            console.error('[云函数] [returnPath] 调用失败', err)
            wx.navigateTo({
              url: '../deployFunctions/deployFunctions',
            })
          }
        })*/
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