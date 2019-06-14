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
      select: [],
      ifselect: 0,
      page: 1,
      num: 0
  },
  onShow: function () {
    var that = this;
    that.data.page = 1
    files = [];
    that.loaddata()
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  uploadFile: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/file_Home/uploadFile/uploadFile'
    })
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
  queryFiles: function () {
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
                    image_path: res.data[m].image_path,
                    file_path: res.data[m].file_path,
                    title: res.data[m].title,
                    author: app.globalData.idInfo.tName,
                    keys: res.data[m].keys,
                    duration: duration,
                    size: res.data[m].size,
                    add_date: res.data[m].add_date.toLocaleDateString(),
                    _id: res.data[m]._id,
                    type: res.data[m].type,
                    fileID: res.data[m].file_path,
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
                image_path: res.data[i].image_path,
                file_path: res.data[i].file_path,
                title: res.data[i].title,
                author: app.globalData.idInfo.tName,
                keys: res.data[i].keys,
                duration: duration,
                size: res.data[i].size,
                add_date: res.data[i].add_date.toLocaleDateString(),
                _id: res.data[i]._id,
                type: res.data[i].type,
                fileID: res.data[i].file_path
              }

              files.push(file)
              that.setData({
                fileList: files,
              })
            }
            if (res.data.length==0){
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
    files = [];
    that.loaddata()
  },
  showAllFiles: function () {
    var that = this
    that.setData({
      ifselect: 0
    })
    files = [];
    that.setData({
      inputValue: '',
      page: 1,
    })
    that.loaddata()
  },
  selectdelFile: function (e) {

    this.data.select = e.detail.value
  },
  deletefile: function () {
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
        content: '是否删除选定的文件',
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '文件删除中',
              icon: 'loading',
            })



            for (let i = 0; i < that.data.select.length; i++) {
              var b = that.data.select[i].split(',')
              if (b.length == 1) {
                wx.cloud.deleteFile({
                  fileList: [b[0]], //云文件 ID
                  success: res => {
                    if (that.data.inputValue == '') {
                      that.setData({
                        type: 0
                      })
                      that.setData({
                        page: 1
                      })
                      that.queryAllFiles()
                    } else {
                      that.setData({
                        type: 0
                      })
                      that.queryFiles()
                    }
                  },
                  fail: console.error
                })


                wx.cloud.callFunction({
                  name: 'deletethefile',
                  data: {
                    fileID: b[0],
                    class_id: app.globalData.openclass
                  },
                  success: res => {
   
                  },
                  fail: err => {
                    console.error('[云函数] [logoff] 调用失败', err)
                    wx.navigateTo({
                      url: '/pages/deployFunctions/deployFunctions',
                    })
                  }

                })
              }
              else {
                for (let j = 0; j < b.length; j++) {
                  wx.cloud.deleteFile({
                    fileList: [b[j]], //云文件 ID
                    success: res => {
                      if (that.data.inputValue == '') {
                        that.setData({
                          type: 0
                        })
                        that.setData({
                          page: 1
                        })
                        that.queryAllFiles()
                      } else {
                        that.setData({
                          type: 0
                        })
                        that.queryFiles()
                      }
                    },
                    fail: console.error
                  })


                  wx.cloud.callFunction({
                    name: 'deletethefile',
                    data: {
                      fileID: b[j],
                      class_id: app.globalData.openclass
                    },
                    success: res => {
                      
                    },
                    fail: err => {
                      console.error('[云函数] [logoff] 调用失败', err)
                      wx.navigateTo({
                        url: '/pages/deployFunctions/deployFunctions',
                      })
                    }
                  })

                }
              }
            }
          } else if (res.cancel) {
            if (that.data.inputValue == '') {
              that.setData({
                page: 1
              })
              that.queryAllFiles()
            } else {
              that.queryFiles()
            }
          }
        }
      })
    }
  },

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
