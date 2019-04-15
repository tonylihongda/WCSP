const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    video_path : '',
    video_intro : ''
  },
  downloadFile: function(){

    wx.cloud.downloadFile({
      fileID: app.globalData.openvideo, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res)
        wx.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res.errMsg)
          }
        })
      },
      fail: console.error
    })

  },
  onLoad: function (options) {
    console.log(app.globalData.openvideo)
    this.setData({
      video_path: app.globalData.openvideo,
      video_intro: app.globalData.openvideointro
    })
    
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
})