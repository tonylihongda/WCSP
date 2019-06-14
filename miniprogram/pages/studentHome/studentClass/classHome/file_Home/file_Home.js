const app = getApp()
const db = wx.cloud.database()
const _ = db.command
var files = []

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
    filelist: [],
    inputValue: '',
    type: 0,
    page: 1,
    num: 0
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  onShow: function () {
    var that = this;
    that.data.page = 1
    files = [];
    that.loaddata()
  },
  showquery: function (files) {
    var that = this
    var fileList = []

    for (let i = 0; i < files.length; i++) {
      if (files[i].title.match(that.data.inputValue)) {
        fileList.push(files[i])

      } else {
        for (let j = 0; j < 3; j++) {
          if (files[i].keys[j].match(that.data.inputValue)) {
            fileList.push(files[i])

          }
        }
      }
    }
    that.setData({
      num: fileList.length,
      'fileList': fileList,
    })
  },
  queryFiles: function (e) {
    var that = this
    var inputMsg = that.data.inputValue
    if (inputMsg == '') {
      wx.showToast({
        title: '关键词不能为空',
        image: '/images/error.png',
        duration: 1500
      })
    } else {
      files = []
      db.collection('Files').where({
        class_id: app.globalData.openclass
      }).count({
        success(res) {

          var batchTimes = Math.ceil(res.total / 20)
          for (let k = 0; k < batchTimes; k++) {
            db.collection('Files').where({
              class_id: app.globalData.openclass
            }).skip(k * 20).limit(20).orderBy('add_date', 'desc').get({
              success(res) {

                var d = new Date()
                for (let m = 0; m < res.data.length; m++) {
                  d.setTime(res.data[m].duration * 1000 + 16 * 60 * 60 * 1000)
                  var duration = d.toTimeString().substring(0, 9)
                  var file = {
                    image_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[m].image_path,
                    file_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[m].file_path,
                    title: res.data[m].title,
                    author: app.globalData.idInfo.tName,
                    keys: res.data[m].keys,
                    duration: duration,
                    size: res.data[m].size,
                    add_date: res.data[m].add_date.toLocaleDateString(),
                    _id: res.data[m]._id,
                    type: res.data[m].type,
                    add_time: res.data[m].add_date,
                  }
                  files.push(file)
                }
                that.showquery(files)
              }
            });
          }
        }
      })
    }
  },
  openthefile: function (e) {

    db.collection('Files').doc(e.currentTarget.id).get({
      success(res) {
        app.globalData.openfile = res.data
        wx.navigateTo({
          url: '/pages/viewResources/fileDownload/fileDownload'
        })
      }
    })
  },
  loaddata: function () {
    var that = this;
    db.collection('Files').where({
      class_id: app.globalData.openclass
    }).count({
      success(res) {

        that.setData({
          num: res.total
        })

        db.collection('Files').where({
          class_id: app.globalData.openclass
        }).skip((that.data.page - 1) * 20).limit(20).orderBy('add_date', 'desc').get({
          success(res) {

            var d = new Date()
            for (let i = 0; i < res.data.length; i++) {
              d.setTime(res.data[i].duration * 1000 + 16 * 60 * 60 * 1000)
              var duration = d.toTimeString().substring(0, 9)
              var file = {
                image_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[i].image_path,
                file_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[i].file_path,
                title: res.data[i].title,
                author: app.globalData.idInfo.tName,
                keys: res.data[i].keys,
                duration: duration,
                size: res.data[i].size,
                type: res.data[i].type,
                add_date: res.data[i].add_date.toLocaleDateString(),
                _id: res.data[i]._id
              }

              files.push(file)
              that.setData({
                fileList: files,
              })
            }
          }
        });
      }
    })
  },
  queryAllFiles: function () {
    var that = this;
    that.data.page = 1
    files = [];
    that.loaddata()
  },
  showAllFiles: function () {
    var that = this
    files = [];
    that.setData({
      inputValue: '',
      page: 1,
    })
    that.loaddata()
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
      that.queryAllFiles()
    } else {
      that.setData({
        page: 1
      })
      that.queryFiles()
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
