const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
    userName: '',
    imagePath: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar2();
    this.setData({
      userName: app.globalData.idInfo.tName,
    })
  },

  changeImage: function () {
    //选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = app.globalData.idInfo._id + '/my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            //const {
            //  fileID,
            //  cloudPath,
            //  imagePath,
            //} = app.globalData
            //console.log(filePath)
            app.globalData.imagePath = 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + cloudPath
            //console.log("dfdf")

            const {
              imagePath,
            } = app.globalData
            // console.log("dfdf")
            wx.reLaunch({
              url: '../teacherHome/teacherHome'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },


  infoManage: function () {
    console.log("查看个人信息")
    wx.navigateTo({
      url: 'teacherInfo/teacherInfo'
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
    this.setData({
      imagePath: app.globalData.imagePath,
    })
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