const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    audio_title: '',
    audio_name: '',
    audio_intro: '',
  },
  onLoad: function (options) {
    this.setData({
      audio_title: app.globalData.openaudio.title,
      audio_name: app.globalData.openaudio.audioname,
      audio_intro: app.globalData.openaudio.intro,
    })
  },
  downloadAudio: function () {

    wx.cloud.downloadFile({
      fileID: app.globalData.openaudio.file_path, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res)
        wx.openDocument({
          filePath: res.tempFilePath,
          success(res) {
            console.log('打开文件成功')
          }
        })
      },
      fail: console.error
    })


    /*wx.saveaudio({
      tempaudioPath: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + app.globalData.openaudio.audio_path,
      success(res) {
        console.log("下载文件成功")
        wx.openDocument({
          audioPath: res.savedaudioPath,
          success(res) {
            console.log('打开文档成功')
          }
        })
      }
    })*/
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
  downloadFile: function () {

    wx.cloud.downloadFile({
      fileID: app.globalData.openaudio.file_path, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res)

        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(res) {
            console.log(res.savedFilePath)
          }
        })
      },
      fail: console.error
    })

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