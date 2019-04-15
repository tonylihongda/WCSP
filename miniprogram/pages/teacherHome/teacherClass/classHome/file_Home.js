const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
    data: {
      filelist: [],
      inputValue: '',
      type: 0,
      select: [],
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  uploadFile: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/uploadFile'
    })
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
          console.log(file)
          files.push(file)
          that.setData({
            fileList: files,
            allfileList: files,
            type: 0,
            select: [],
          })
          console.log(that.data.fileList)
        }
      }
    });
  },
  selectdelFile: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail)
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
    console.log(this.data.select)



    for (let i = 0; i < this.data.select.length; i++) {
      var b = this.data.select[i].split(',')
      if (b.length == 1){
        wx.cloud.deleteFile({
          fileList: [b[0]], //云文件 ID
          success: res => {
            // handle success
            console.log(res.fileList)
            that.queryAllFiles()
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
            that.queryAllFiles()
            wx.redirectTo({
              url: '/pages/teacherHome/teacherClass/classHome/file_Home'
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
      else{
        for(let j =0;j<b.length;j++){
          wx.cloud.deleteFile({
            fileList: [b[j]], //云文件 ID
            success: res => {
              // handle success
              console.log(res.fileList)
              that.queryAllFiles()
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
              that.queryAllFiles()
              success: res => {
                that.queryAllFiles()
                wx.redirectTo({
                  url: '/pages/teacherHome/teacherClass/classHome/file_Home'
                })
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
      } 
    }
  },
})
