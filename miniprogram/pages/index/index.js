const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    //验证基础库
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
  },

l1789: function(){
  this.data.accountInfo.get({
    success(res) {
      user_id = res.data[0].user_id
      user_type = res.data[0].type
      console.log("sd111")
      if (user_type == 0) {
        studentlogin(user_id)
        console.log("sd111")
      }
      else if (user_type == 1) {
        teacherlogin(user_id)
      }
      else if (user_type == 2) {
        adminlogin(user_id)
      }
    }
  })},

  sd: function(){
    //判断是否是第一次登录
    const accountInfo= db.collection('Account').where({
      user_openid: app.globalData.openid
    })
    //读取用户信息
    accountInfo.count({
      success(res) {
        var checkID = res.total
        if (checkID == 1) {
          console.log("sfsf")
          this.logintype
          console.log("sfsf")
          //console.log("登陆成功")
          //wx.redirectTo({
            //url: '../studentHome/studentHome'
            ////url: '../test/test'
          //})
        }
        else {
          console.log("用户名或密码错误")
        }
      }
    })
    var user_id
    var user_type
    accountInfo.get({
      success(res){
        user_id = res.data[0].user_id
        user_type = res.data[0].type
        if (user_type == 0) {
          studentlogin()
        }
      }
    })
    if(user_type == 0){
      console.log("app.glovalData.idInfo")
      app.globalData.idInfo = db.collection('Students').doc(user_id)
      console.log(app.glovalData.idInfo)
    }

    /*accountInfo.count({
      success(res) {
        var checkID = res.total
        if (checkID == 1) {////////////////
          console.log("登陆成功")
          wx.redirectTo({
            url: '../studentHome/studentHome'
            //url: '../test/test'
          })
        }
        else {
          console.log("用户名或密码错误")
        }
      }
    })*/

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  studentlogin: function (user_id){
    console.log("sdfdsfsdf")
    app.globalData.idInfo = db.collection('Student').doc(user_id)
    wx.redirectTo({
      url: '../studentHome/studentHome'
      //url: '../test/test'
    })

  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },


  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
