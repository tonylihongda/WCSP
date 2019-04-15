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
    if(app.globalData.user_type==0){
      if (this.data.newpassword1 == ''){
        console.log("输入不能为空")
        wx.redirectTo({
          url: '/pages/changeKey/changeKey'
        })
      }else if (app.globalData.idInfo.sIDkey != this.data.password){
        console.log("密码错误")
        wx.redirectTo({
          url: '/pages/changeKey/changeKey'
        })
      } else if (this.data.password == this.data.password1) {
        console.log("新密码不能与旧密码相同")
        wx.redirectTo({
          url: '/pages/changeKey/changeKey'
        })
      }else if (this.data.newpassword1 != this.data.newpassword2){
        console.log("两次输入的密码不一致")
        wx.redirectTo({
          url: '/pages/changeKey/changeKey'
        })
      }else{
        console.log("可以修改密码了")
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
                wx.redirectTo({
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
      if (this.data.newpassword1 == '') {
        console.log("输入不能为空")
        wx.redirectTo({
          url: '/pages/changeKey/changeKey'
        })
      } else if (app.globalData.idInfo.tIDkey != this.data.password) {
        console.log("密码错误")
        wx.redirectTo({
          url: '/pages/changeKey/changeKey'
        })
      } else if (this.data.password == this.data.password1) {
        console.log("新密码不能与旧密码相同")
        wx.redirectTo({
          url: '/pages/changeKey/changeKey'
        })
      } else if (this.data.newpassword1 != this.data.newpassword2) {
        console.log("两次输入的密码不一致")
        wx.redirectTo({
          url: '/pages/changeKey/changeKey'
        })
      } else {
        console.log("可以修改密码了")
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
                wx.redirectTo({
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})