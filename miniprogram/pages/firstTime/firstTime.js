const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    idnumber: '',
    password: '',
  },

  printnum: function (e) {
    this.data.idnumber = e.detail.value;
  },

  printkey: function (e) {
    this.data.password = e.detail.value;
  },

  studentlogin: function () {
    db.collection('Students').where({
      sIDnum: this.data.idnumber,
      sIDkey: this.data.password
    }).get({
      success(res) {
        app.globalData.idInfo = res.data[0]
        app.globalData.user_type = 0
        if (res.data.length == 1) {
          db.collection('Account').add({
            data: {
              type: 0,
              user_id: app.globalData.idInfo._id,
            },
            success(res) {
              wx.reLaunch({
                url: '../studentHome/studentHome'
              })
            }
          })
        }
        else {
          wx.showToast({
            title: '用户名或密码错误',
            image: '/images/error.png',
            duration: 1500
          })
        }
      }
    })
  },

  teacherlogin: function () {
    db.collection('Teachers').where({
      tIDnum: this.data.idnumber,
      tIDkey: this.data.password
    }).get({
      success(res) {
        app.globalData.idInfo = res.data[0]
        app.globalData.user_type = 1
        if (res.data.length == 1) {
          db.collection('Account').add({
            data: {
              type: 1,
              user_id: app.globalData.idInfo._id,
            },
            success(res) {
              wx.reLaunch({
                url: '../teacherHome/teacherHome'
              })
            }
          })
        }
        else {
          wx.showToast({
            title: '用户名或密码错误',
            image: '/images/error.png',
            duration: 1500
          })
        }
      }
    })
  },
})