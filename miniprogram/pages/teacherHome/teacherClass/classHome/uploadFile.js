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
    cloudPath2: '',
    filePath2: '',
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

  uploadFile: function () {
    var that = this
    if (that.data.title == '') {
      console.log("标题不能为空")
    } else if (that.data.disable == false) {
      console.log("请选择文件")
    } else if ((that.data.keys[0] == that.data.keys[1] && that.data.keys[1] != '') || (that.data.keys[1] == that.data.keys[2] && that.data.keys[1] != '') || (that.data.keys[0] == that.data.keys[2] && that.data.keys[0] != '')) {
      console.log("关键字不能重复")
    } else {
        if (that.data.tapIndex==2){
        wx.cloud.uploadFile({
          cloudPath: that.data.cloudPath2,
          filePath: that.data.filePath2,
          success: res => {
            console.log(res)
            db.collection('Files').add({
              data: {
                type: 3,
                class_id: app.globalData.openclass,
                file_path: res.fileID,
                add_date: new Date(),
                keys: that.data.keys,
                title: that.data.title,
                intro: that.data.intro,
                size: that.data.size,
                filename: that.data.filename
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
        } else if (that.data.tapIndex==1){
          wx.cloud.uploadFile({
            cloudPath: that.data.cloudPath2,
            filePath: that.data.filePath2,
            success: res => {
              console.log(res)
              db.collection('Files').add({
                data: {
                  type: 2,
                  class_id: app.globalData.openclass,
                  file_path: res.fileID,
                  add_date: new Date(),
                  keys: that.data.keys,
                  title: that.data.title,
                  intro: that.data.intro,
                  size: that.data.size,
                  filename: that.data.filename
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
      }else{

          var fileID1 = []
          for (let i = 0; i < that.data.imagepath.length;i++){
            wx.cloud.uploadFile({
              cloudPath: that.data.imagecloudpath[i],
              filePath: that.data.imagepath[i],
              success: res => {
                console.log(res)
                fileID1.push(res.fileID)
                if (fileID1.length == that.data.imagepath.length){
                  db.collection('Files').add({
                    data: {
                      type: 1,
                      class_id: app.globalData.openclass,
                      file_path: fileID1,
                      add_date: new Date(),
                      keys: that.data.keys,
                      title: that.data.title,
                      intro: that.data.intro,
                      size: that.data.sizes,
                      filename: that.data.imagename
                    }                 
                  })
                  wx.navigateBack({
                    delta: 1
                  })
                }
              },
              fail: err => {
                console.log(err)
              },
              complete: () => {
              }
            })
          }
      }
    }
  },

  selectFile: function () {
    var that = this
    wx.chooseMessageFile({
      //type: 'file',
      count: 1,
      success(res) {
        console.log(res)
        that.data.newdate = new Date()
        that.data.filePath2 = res.tempFiles[0].path
        that.data.cloudPath2 = 'Classes/' + app.globalData.openclass + '/Files/' + that.data.newdate.getTime() + res.tempFiles[0].name
        that.data.size = res.tempFiles[0].size
        that.data.filename = res.tempFiles[0].name
        var disable = true
        that.setData({ disable: disable })
      }
    })
  },
  selectImage: function () {
    var that = this
    wx.chooseImage({
      count: 10,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        that.data.boxname1 = new Date()
        that.data.boxname = that.data.boxname1.getTime()
        var imagepath = []
        var imagecloudpath = []
        var imagename =[]
        var sizes =[]
        for(let i=0;i<res.tempFiles.length;i++){
          var newdate = new Date()
          imagepath.push(res.tempFilePaths[i])
          imagename.push(newdate.getTime() + i+res.tempFilePaths[i].substring(res.tempFilePaths[i].length - 4, res.tempFilePaths[i].length))
          imagecloudpath.push('Classes/' + app.globalData.openclass + '/Files/' + that.data.boxname + '/' + imagename[i])
          sizes.push(res.tempFiles[i].size)
        }

        var disable = true
        that.setData({ disable: disable })
        that.data.imagepath = imagepath
        that.data.imagecloudpath = imagecloudpath
        that.data.imagename = imagename
        that.data.sizes = sizes
      }
    })
  },
  selectVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        that.data.newdate = new Date()
        that.data.filePath2 = res.tempFilePath
        that.data.cloudPath2 = 'Classes/' + app.globalData.openclass + '/Files/' + that.data.newdate.getTime() + '.mp4'
        that.data.size = res.size
        that.data.filename = that.data.newdate.getTime() + res.tempFilePath.substring(res.tempFilePath.length - 3, res.tempFilePath.length)
        var disable = true
        that.setData({ disable: disable })
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

  },
  selectSource: function(){
    var that = this 
    wx.showActionSheet({
      itemList: ['从相册中选择图片', '从相册中选择视频', '其它格式文件'],
      success(res) {
        that.data.tapIndex = res.tapIndex
        if (res.tapIndex ==0 ){
          that.selectImage()
        } else if (res.tapIndex == 1){
          that.selectVideo()
        }else{
          that.selectFile()
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})