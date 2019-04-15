const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    noticeList: [],
    inputValue: ''
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
            image_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[i].image_path,
            notice_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[i].notice_path,
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
})