const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    filelist: [],
    inputValue: ''
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  onLoad: function () {
    var that = this;
  },
  queryFiles: function (e) {
    var that = this
    var inputMsg = that.data.inputValue
    if (inputMsg == '') {
      console.log("关键词不能为空！")
    } else {
      var allfileList = that.data.allfileList
      var fileList = []
      for (let i = 0; i < allfileList.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (allfileList[i].keys[j] == inputMsg) {
            fileList.push(allfileList[i])
          }
          that.setData({
            'fileList': fileList
          })
        }
      }
    }

  },
  openthefile: function (e) {
    console.log(e.currentTarget.id)
    db.collection('Files').doc(e.currentTarget.id).get({
      success(res) {
        app.globalData.openfile = res.data
        wx.navigateTo({
          url: '/pages/teacherHome/teacherClass/classHome/fileDownload/fileDownload'
        })
      }
    })
  },
  onShow: function () {
    this.queryAllFiles();
  },
  queryAllFiles: function () {
    var that = this;
    var files = [];
    db.collection('Files').where({
      class_id: app.globalData.openclass
    }).get({
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
            add_date: res.data[i].add_date.toLocaleDateString(),
            _id: res.data[i]._id
          }
          console.log(file)
          files.push(file)
          that.setData({
            fileList: files,
            allfileList: files
          })
          console.log(that.data.fileList)
        }
      }
    });
  },
})
