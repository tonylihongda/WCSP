const app = getApp()
const db = wx.cloud.database()
const _ = db.command
var videos = []

var objectArraySort = function (keyName) {
  return function (objectN, objectM) {
    var valueN = objectN[keyName]
    var valueM = objectM[keyName]
    if (valueN < valueM) return 1
    else if (valueN > valueM) return -1
    else return 0
  }
}
Page({
  data: {
    videoList: [],
    inputValue: '',
    type: 0,
    select: [],
    ifselect: 0,
    page: 1,
    num: 0
  },
  onShow: function () {
    var that = this;
    that.data.page = 1
    videos = [];
    that.loaddata()
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  showquery: function (videos) {
    var that = this
    var videoList = []

    for (let i = 0; i < videos.length; i++) {
      if (videos[i].title.match(that.data.inputValue)) {
        videoList.push(videos[i])

      } else {
        for (let j = 0; j < 3; j++) {
          if (videos[i].keys[j].match(that.data.inputValue)) {
            videoList.push(videos[i])
          }
        }
      }
    }
    that.setData({
      num: videoList.length,
      'videoList': videoList,
    })
  },
  queryVideos: function () {
    var that = this
    var inputMsg = that.data.inputValue
    if (inputMsg == '') {
      wx.showToast({
        title: '关键词不能为空',
        image: '/images/error.png',
        duration: 1500
      })
    } else {
      that.setData({
        ifselect: 1
      })
      videos = []
      db.collection('Videos').where({
        class_id: app.globalData.openclass
      }).count({
        success(res) {

          var batchTimes = Math.ceil(res.total / 20)
          for (let k = 0; k < batchTimes; k++) {
            db.collection('Videos').where({
              class_id: app.globalData.openclass
            }).skip(k * 20).limit(20).orderBy('add_date', 'desc').get({
              success(res) {
                var d = new Date()
                for (let m = 0; m < res.data.length; m++) {
                  d.setTime(res.data[m].duration * 1000 + 16 * 60 * 60 * 1000)
                  var duration = d.toTimeString().substring(0, 9)
                  var video = {
                    image_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[m].image_path,
                    video_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[m].video_path,
                    title: res.data[m].title,
                    author: app.globalData.idInfo.tName,
                    keys: res.data[m].keys,
                    duration: duration,
                    size: res.data[m].size,
                    add_date: res.data[m].add_date.toLocaleDateString(),
                    _id: res.data[m]._id,
                    fileID: res.data[m].file_path,
                    add_time: res.data[m].add_date,
                  }
                  videos.push(video)
                }
                that.showquery(videos)
              }
            });
          }
        }
      })
    }
  },
  goToWatch: function (e) {
    db.collection('Videos').doc(e.currentTarget.id).get({
      success(res){
        app.globalData.openvideointro = res.data.intro
        app.globalData.openvideo = 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data.video_path
        wx.navigateTo({
          url: '/pages/viewResources/videoWatch/videoWatch'
        })
      }
    })
  },
  loaddata: function () {
    var that = this;
    db.collection('Videos').where({
      class_id: app.globalData.openclass
    }).count({
      success(res) {

        that.setData({
          num: res.total
        })

        db.collection('Videos').where({
          class_id: app.globalData.openclass
        }).skip((that.data.page - 1) * 20).limit(20).orderBy('add_date', 'desc').get({
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
                _id: res.data[i]._id,
                fileID: res.data[i].file_path
              }
              videos.push(video)
              that.setData({
                videoList: videos,
              })
            }
            if (res.data.length == 0) {
              that.setData({
                videoList: videos,
              })
            }
          }
        });
      }
    })
  },
  queryAllVideos: function () {
    var that = this;
    that.setData({
      page: 1
    })
    videos = [];
    that.loaddata()
  },
  showAllVideos: function () {
    var that = this
    that.setData({
      ifselect: 0
    })
    videos = [];
    that.setData({
      inputValue: '',
      page: 1,
    })
    that.loaddata()
  },
  uploadVideo: function(){
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/video_Home/uploadVideo/uploadVideo'
    })
  },
  selectdelVideo: function (e) {
    this.data.select = e.detail.value
  },
  deletevideo: function () {
    this.setData({
      type: 1
    })
  },
  deletecancel: function () {
    this.setData({
      type: 0
    })
  },
  deletesure: function () {
    var that = this
    if (that.data.select.length == 0) {
      wx.showToast({
        title: '未选择文件',
        image: '/images/error.png',
        duration: 1500
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '是否删除选定的视频文件',
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '文件删除中',
              icon: 'loading',
            })

            for (let i = 0; i < that.data.select.length; i++) {

              wx.cloud.deleteFile({
                fileList: [that.data.select[i]], //云文件 ID
                success: res => {

                },
                fail: console.error
              })


              wx.cloud.callFunction({
                name: 'deletethevideo',
                data: {
                  fileID: that.data.select[i],
                  class_id: app.globalData.openclass
                },
                success: res => {
                  if (that.data.inputValue == '') {
                    that.queryAllVideos()
                  } else {
                    that.queryVideos()
                  }
                },
                fail: err => {
                  console.error('[云函数] [logoff] 调用失败', err)
                  wx.navigateTo({
                    url: '/pages/deployFunctions/deployFunctions',
                  })
                }
              })
            }
          } else if (res.cancel) {
            if (that.data.inputValue == '') {
              that.setData({
                page: 1
              })
              that.queryAllVideos()
            } else {
              that.queryVideos()
            }
          }
        }
      })
    }
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var that = this
    if (that.data.inputValue == '') {
      that.setData({
        page: 1
      })
      that.queryAllVideos()
    } else {
      that.setData({
        page: 1
      })
      that.queryVideos()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this

    if (that.data.inputValue == '') {
      if (that.data.num > that.data.page * 20) {
        that.data.page++
        var page = that.data.page

        that.setData({
          page: page
        })
        that.loaddata()
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '没有更多数据',
          image: '/images/error.png',
          duration: 1500
        })
      }
    }
  },
})
