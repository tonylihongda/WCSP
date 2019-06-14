const app = getApp()
const db = wx.cloud.database()
const _ = db.command
var notices = []

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
    noticeList: [],
    inputValue: '',
    type: 0,
    select: [],
    ifselect: 0,
    page: 1,
    num: 0
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  //事件处理函数
  onShow: function () {
    var that = this;
    that.data.page = 1
    notices = [];
    that.loaddata()
  },
  showquery: function (notices){
    var that =this
    var noticeList = []

    for (let i = 0; i < notices.length; i++) {
      if (notices[i].title.match(that.data.inputValue)) {
        noticeList.push(notices[i])

      } else {
        for (let j = 0; j < 3; j++) {
          if (notices[i].keys[j].match(that.data.inputValue)) {
            noticeList.push(notices[i])

          }
        }
      }
    }
    that.setData({
      num: noticeList.length,
      'noticeList': noticeList,
    })
  },
  queryNotices: function () {
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
      notices = []
      db.collection('Notices').where({
        class_id: app.globalData.openclass
      }).count({
        success(res) {

          var batchTimes = Math.ceil(res.total / 20)
          for(let k = 0; k < batchTimes; k++){
            db.collection('Notices').where({
              class_id: app.globalData.openclass
            }).skip( k * 20).limit(20).orderBy('add_date', 'desc').get({
              success(res) {

                for (let m = 0; m < res.data.length; m++) {
                  var notice = {
                    title: res.data[m].title,
                    author: app.globalData.idInfo.tName,
                    keys: res.data[m].keys,
                    add_date: res.data[m].add_date.toLocaleDateString(),
                    add_time: res.data[m].add_date,
                    _id: res.data[m]._id
                  }
                  notices.push(notice)
                }
                that.showquery(notices)
              }
            });
          }
        }
      })
    }

  },
  goToView: function (e) {

    db.collection('Notices').doc(e.currentTarget.id).get({
      success(res) {
        app.globalData.opennotice = res.data
        wx.navigateTo({
          url: '/pages/viewResources/noticeView/noticeView'
        })
      }
    })
  },


  loaddata: function (){
    var that = this;
    db.collection('Notices').where({
      class_id: app.globalData.openclass
    }).count({
      success(res) {

        that.setData({
          num: res.total
        })

        db.collection('Notices').where({
          class_id: app.globalData.openclass
        }).skip((that.data.page - 1) * 20).limit(20).orderBy('add_date', 'desc').get({
          success(res) {

            for (let i = 0; i < res.data.length; i++) {
              var notice = {
                title: res.data[i].title,
                author: app.globalData.idInfo.tName,
                keys: res.data[i].keys,
                add_date: res.data[i].add_date.toLocaleDateString(),
                _id: res.data[i]._id
              }

              notices.push(notice)
              that.setData({
                noticeList: notices,
              })
            }
            if (res.data.length == 0) {
              that.setData({
                noticeList: notices,
              })
            }
          }
        });
      }
    })
  },
  queryAllNotices: function () {
    var that = this;
    notices = [];
    that.loaddata()
  },
  showAllNotices: function(){
    var that = this
    that.setData({
      ifselect: 0
    })
    notices = [];
    that.setData({
      inputValue: '',
      page: 1,
    }) 
    that.loaddata()
  },
  uploadNotice: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/notice_Home/uploadNotice/uploadNotice'
    })
  },
  selectdelNotice: function (e) {

    this.data.select = e.detail.value
  },
  deletenotice: function () {
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
        content: '是否删除选定的通知',
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '通知删除中',
              icon: 'loading',
            })
            for (let i = 0; i < that.data.select.length; i++) {
              wx.cloud.callFunction({
                name: 'deletethenotice',
                data: {
                  _id: that.data.select[i]
                },
                success: res => {
                  if (that.data.inputValue == '') {
                    that.setData({
                      type: 0
                    })
                    that.setData({
                      page: 1
                    })
                    that.queryAllNotices()
                  } else {
                    that.setData({
                      type: 0
                    })
                    that.queryNotices()
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
                page:1
              })
              that.queryAllNotices()
            } else {
              that.queryNotices()
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
    var that =this
    if(that.data.inputValue==''){
      that.setData({
        page: 1
      })
      that.queryAllNotices()
    }else{
      that.setData({
        page: 1
      })
      that.queryNotices()
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that =this

    if (that.data.inputValue==''){
      if (that.data.num > that.data.page*20) {
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
