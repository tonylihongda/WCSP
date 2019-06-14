const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    file_title: '',
    file_name: '',
    file_intro: '',
    file_type: '',
    video_path: '',
    file_paths: [],
  },
  onLoad: function (options) {
    this.setData({
      file_title: app.globalData.openfile.title,
      file_name: app.globalData.openfile.filename,
      file_intro: app.globalData.openfile.intro,
      file_type: app.globalData.openfile.type,
    })
    if (app.globalData.openfile.type == 2){
      this.setData({
        video_path: app.globalData.openfile.file_path,
      })
    }
    if (app.globalData.openfile.type == 1) {
      this.setData({
        file_paths: app.globalData.openfile.file_path,
      })
    }
  },
  saveFile: function () {

    wx.cloud.downloadFile({
      fileID: app.globalData.openfile.file_path, // 文件 ID
      success: res => {
        // 返回临时文件路径

        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(res) {
            const savedFilePath = res.savedFilePath

          }
        })
      },
      fail: console.error
    })
  },


  downloadVideo: function () {

    wx.cloud.downloadFile({
      fileID: app.globalData.openfile.file_path, // 文件 ID
      success: res => {
        // 返回临时文件路径

        wx.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {

          }
        })
      },
      fail: console.error
    })

  },



  downloadFile: function(){

    wx.cloud.downloadFile({
      fileID: app.globalData.openfile.file_path, // 文件 ID
      success: res => {
        // 返回临时文件路径

        wx.openDocument({
          filePath: res.tempFilePath,
          success(res) {

          }
        })
      },
      fail: console.error
    })


    /*wx.saveFile({
      tempFilePath: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + app.globalData.openfile.file_path,
      success(res) {
        console.log("下载文件成功")
        wx.openDocument({
          filePath: res.savedFilePath,
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