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
      wx.showToast({
        title: '标题不能为空',
        image: '/images/error.png',
        duration: 1500
      })
    } else if (that.data.filePath2 == ''){
      wx.showToast({
        title: '请选择视频',
        image: '/images/error.png',
        duration: 1500
      })
    } else if ((that.data.keys[0] == that.data.keys[1] && that.data.keys[1] != '') || (that.data.keys[1] == that.data.keys[2] && that.data.keys[1] != '') || (that.data.keys[0] == that.data.keys[2] && that.data.keys[0] != '')){
      wx.showToast({
        title: '关键字不能重复',
        image: '/images/error.png',
        duration: 1500
      })
    }else{

      wx.showLoading({
        title: '上传中',
      })
      wx.cloud.uploadFile({
        cloudPath: that.data.cloudPath2,
        filePath: that.data.filePath2,
        success: res => {
          db.collection('Videos').add({
            data: {
              video_num: that.data.newdate.getTime(),
              class_id: app.globalData.openclass,
              video_path: that.data.cloudPath2,
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
          wx.hideLoading()
          wx.showToast({
            title: '文件最大为50MB',
            image: '/images/error.png',
            duration: 2000
          })
        },
        complete: () => {
        }
      })
    }
  },

  selectVideo: function(){
    var that = this

    wx.chooseVideo({
      sourceType: ['album', 'camera'],  //可以在相册中选择视频或开启相机拍摄视频
      camera: 'back',                   //默认开始后置摄像头
      compressed: true,
      maxDuration: 3600,
      success: function (res) {
        if (res.size > 52428800){

          wx.showToast({
            title: '文件最大为50MB',
            image: '/images/error.png',
            duration: 2000
          })
        }else{

          that.data.duration = res.duration
          that.data.size = res.size
          that.data.newdate = new Date()
          that.data.filePath2 = res.tempFilePath
          that.data.cloudPath2 = 'Classes/' + app.globalData.openclass + '/Videos/' + that.data.newdate.getTime() + '.mp4'
          var disable = true
          that.setData({ disable: disable })
        }
      },
    })
  }
})