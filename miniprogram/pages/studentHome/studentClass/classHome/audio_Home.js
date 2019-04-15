const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    audioList: [],
    inputValue: ''
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  //事件处理函数

  onLoad: function () {
    var that = this;
  },

  queryAudios: function (e) {
    var that = this
    var inputMsg = that.data.inputValue
    if (inputMsg == '') {
      console.log("关键词不能为空！")
    } else {
      var allaudioList = that.data.allaudioList
      var audioList = []
      for (let i = 0; i < allaudioList.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (allaudioList[i].keys[j] == inputMsg) {
            audioList.push(allaudioList[i])
          }
          that.setData({
            'audioList': audioList
          })
        }
      }
    }

  },
  goToListen: function (e) {
    console.log(e.currentTarget.id)
    db.collection('Audios').doc(e.currentTarget.id).get({
      success(res) {
        app.globalData.openaudio = res.data
        console.log(res.data)
        wx.navigateTo({
          url: '/pages/teacherHome/teacherClass/classHome/audioListen/audioListen'
        })
      }
    })
  },
  onShow: function () {
    this.queryAllAudios();
  },

  queryAllAudios: function () {
    var that = this;
    var audios = [];
    db.collection('Audios').where({
      class_id: app.globalData.openclass
    }).get({
      success(res) {
        var d = new Date()
        for (let i = 0; i < res.data.length; i++) {
          d.setTime(res.data[i].duration * 1000 + 16 * 60 * 60 * 1000)
          var duration = d.toTimeString().substring(0, 9)
          var audio = {
            image_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[i].image_path,
            audio_path: 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + res.data[i].audio_path,
            title: res.data[i].title,
            author: app.globalData.idInfo.tName,
            keys: res.data[i].keys,
            add_date: res.data[i].add_date.toLocaleDateString(),
            _id: res.data[i]._id
          }
          console.log(audio)
          audios.push(audio)
          that.setData({
            audioList: audios,
            allaudioList: audios
          })
          console.log(that.data.audioList)
        }
      }
    });
  },
  uploadAudio: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/uploadAudio'
    })
  }
})