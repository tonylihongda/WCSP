const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    password: '',
    newpassword1: '',
    newpassword2: '',
  },
  printkey: function (e) {
    this.data.password = e.detail.value;
  },
  printnewkey1: function (e) {
    this.data.newpassword1 = e.detail.value;
  },
  printnewkey2: function (e) {
    this.data.newpassword2 = e.detail.value;
  },
  changethekey: function(){
    console.log()
    if(app.globalData.user_type==0){
      if (this.data.newpassword1 == '' || this.data.newpassword2 == '') {
        wx.showToast({
          title: '输入不能为空',
          image: '/images/error.png',
          duration: 1500
        })
      } else if (app.globalData.idInfo.sIDkey != this.data.password) {
        console.log(app.globalData.idInfo.sIDkey)
        console.log(this.data.password)
        wx.showToast({
          title: '密码错误',
          image: '/images/error.png',
          duration: 1500
        })
      } else if (this.data.password == this.data.newpassword1) {
        wx.showToast({
          title: '新密码不能与旧密码相同',
          image: '/images/error.png',
          duration: 1500
        })
      } else if (this.data.newpassword1 != this.data.newpassword2) {
        wx.showToast({
          title: '两次输入不一致',
          image: '/images/error.png',
          duration: 1500
        })
      } else if (this.data.newpassword1.length < 6) {
        wx.showToast({
          title: '密码长度不能小于6位',
          image: '/images/error.png',
          duration: 1500
        })
      }else{
        wx.showToast({
          title: '密码修改成功',
          icon: 'success',
        })
        wx.cloud.callFunction({
          name: 'changekey',
          data: {
            _id: app.globalData.idInfo._id,
            newpassword: this.data.newpassword1
          },
          success: res => {
            wx.cloud.callFunction({
              name: 'logoff',
              data: {
                _id: app.globalData.idInfo._id
              },
              success: res => {
                wx.reLaunch({
                  url: '/pages/firstTime/firstTime',
                })
              },
              fail: err => {
                console.error('[云函数] [logoff] 调用失败', err)
                wx.navigateTo({
                  url: '../deployFunctions/deployFunctions',
                })
              }
            })
          },
          fail: err => {
            console.error('[云函数] [changeKey] 调用失败', err)
            wx.navigateTo({
              url: '../deployFunctions/deployFunctions',
            })
          }
        })       
      }
    }
    else{
      if (this.data.newpassword1 == '' || this.data.newpassword2 == '') {
        wx.showToast({
          title: '输入不能为空',
          image: '/images/error.png',
          duration: 1500
        })
      } else if (app.globalData.idInfo.tIDkey != this.data.password) {
        wx.showToast({
          title: '密码错误',
          image: '/images/error.png',
          duration: 1500
        })
      } else if (this.data.password == this.data.newpassword1) {
        wx.showToast({
          title: '新密码不能与旧密码相同',
          image: '/images/error.png',
          duration: 1500
        })
      } else if (this.data.newpassword1 != this.data.newpassword2) {
        wx.showToast({
          title: '两次输入不一致',
          image: '/images/error.png',
          duration: 1500
        })
      } else if (this.data.newpassword1.length<6){
        wx.showToast({
          title: '密码长度不能小于6位',
          image: '/images/error.png',
          duration: 1500
        })
      }else{
        wx.showToast({
          title: '密码修改成功',
          icon: 'success',
        })
        wx.cloud.callFunction({
          name: 'changekeyT',
          data: {
            _id: app.globalData.idInfo._id,
            newpassword: this.data.newpassword1
          },
          success: res => {
            wx.cloud.callFunction({
              name: 'logoff',
              data: {
                _id: app.globalData.idInfo._id
              },
              success: res => {
                wx.reLaunch({
                  url: '/pages/firstTime/firstTime',
                })
              },
              fail: err => {
                console.error('[云函数] [logoff] 调用失败', err)
                wx.navigateTo({
                  url: '../deployFunctions/deployFunctions',
                })
              }
            })
          },
          fail: err => {
            console.error('[云函数] [changeKey] 调用失败', err)
            wx.navigateTo({
              url: '../deployFunctions/deployFunctions',
            })
          }
        })
      }
    }
  },
})