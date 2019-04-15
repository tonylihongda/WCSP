const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    videoList: [],
    inputValue: ''
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  //事件处理函数

  onLoad: function () {
    var that = this;
  },

  queryVideos: function (e) {
    var that = this
    var inputMsg = that.data.inputValue
    if (inputMsg == '') {
      console.log("关键词不能为空！")
    } else {
      var allvideoList = that.data.allvideoList
      var videoList = []
      for (let i = 0; i < allvideoList.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (allvideoList[i].keys[j] == inputMsg) {
            videoList.push(allvideoList[i])
          }
          that.setData({
            'videoList': videoList
          })
        }
      }
    }

  },
  goToWatch: function (e) {
    console.log(e.currentTarget.id)
    db.collection('Videos').doc(e.currentTarget.id).get({
      success(res) {
        app.globalData.openvideointro = res.data.intro
        app.globalData.openvideo = 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data.video_path
        wx.navigateTo({
          url: '/pages/teacherHome/teacherClass/classHome/videoWatch/videoWatch'
        })
      }
    })
  },
  onShow: function () {
    this.queryAllVideos();
  },

  queryAllVideos: function () {
    var that = this;
    var videos = [];
    db.collection('Videos').where({
      class_id: app.globalData.openclass
    }).get({
      success(res) {
        var d = new Date()
        for (let i = 0; i < res.data.length; i++) {
          d.setTime(res.data[i].duration * 1000 + 16 * 60 * 60 * 1000)
          var duration = d.toTimeString().substring(0, 9)
          var video = {
            image_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[i].image_path,
            video_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[i].video_path,
            title: res.data[i].title,
            author: app.globalData.idInfo.tName,
            keys: res.data[i].keys,
            duration: duration,
            size: res.data[i].size,
            add_date: res.data[i].add_date.toLocaleDateString(),
            _id: res.data[i]._id
          }
          console.log(video)
          videos.push(video)
          that.setData({
            videoList: videos,
            allvideoList: videos
          })
          console.log(that.data.videoList)
        }
      }
    });
  }
})
