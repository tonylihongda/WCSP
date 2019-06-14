const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    video_path : '',
    video_intro : '',
  },
  downloadFile: function(){
    console.log(app.globalData.openvideo)
    console.log(this.data.video_path)
    wx.cloud.downloadFile({
      fileID: app.globalData.openvideo,
      success: res => {
        wx.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存视频成功',
              icon: 'success',
            })
          }
        })
      },
      fail: console.error
    })
  },
  onLoad: function (options) {

    this.setData({
      video_path: app.globalData.openvideo,
      video_intro: app.globalData.openvideointro,
    })
    
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
})