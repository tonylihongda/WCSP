const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    noticeList: [],
    inputValue: '',
    type: 0,
    select: [],
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  //事件处理函数

  onLoad: function () {
    var that = this;
  },

  queryNotices: function (e) {
    var that = this
    var inputMsg = that.data.inputValue
    if (inputMsg == '') {
      console.log("关键词不能为空！")
    } else {
      var allnoticeList = that.data.allnoticeList
      var noticeList = []
      for (let i = 0; i < allnoticeList.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (allnoticeList[i].keys[j] == inputMsg) {
            noticeList.push(allnoticeList[i])
          }
          that.setData({
            'noticeList': noticeList
          })
        }
      }
    }

  },
  goToView: function (e) {
    console.log(e.currentTarget.id)
    db.collection('Notices').doc(e.currentTarget.id).get({
      success(res) {
        app.globalData.opennotice = res.data
        wx.navigateTo({
          url: '/pages/teacherHome/teacherClass/classHome/noticeView/noticeView'
        })
      }
    })
  },
  onShow: function () {
    this.queryAllNotices();
  },

  queryAllNotices: function () {
    var that = this;
    var notices = [];
    db.collection('Notices').where({
      class_id: app.globalData.openclass
    }).get({
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          var notice = {
            title: res.data[i].title,
            author: app.globalData.idInfo.tName,
            keys: res.data[i].keys,
            add_date: res.data[i].add_date.toLocaleDateString(),
            _id: res.data[i]._id
          }
          console.log(notice)
          notices.push(notice)
          that.setData({
            noticeList: notices,
            allnoticeList: notices
          })
          console.log(that.data.noticeList)
        }
      }
    });
  },
  uploadNotice: function () {
    
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/uploadNotice'
    })
  },
  selectdelNotice: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
    for (let i = 0; i < this.data.select.length; i++) {
      wx.cloud.callFunction({
        name: 'deletethenotice',
        data: {
          _id: this.data.select[i]
        },
        success: res => {
          that.queryAllNotices()
          wx.redirectTo({
            url: '/pages/teacherHome/teacherClass/classHome/notice_Home'
          })
        },
        fail: err => {
          console.error('[云函数] [logoff] 调用失败', err)
          wx.navigateTo({
            url: '/pages/deployFunctions/deployFunctions',
          })
        }
      })
    }
  },
})
