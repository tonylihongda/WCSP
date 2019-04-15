const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idnumber: '',
    password: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /*登录*/
  printnum: function (e) {
    this.data.idnumber = e.detail.value;
  },
  printkey: function (e) {
    this.data.password = e.detail.value;
  },

  studentlogin: function () {
    const checktemp = db.collection('Students').where({
      sIDnum: this.data.idnumber,
      sIDkey: this.data.password
    })
    checktemp.get({
      success(res) {
        app.globalData.idInfo = res.data[0],
        app.globalData.imagePath = 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + app.globalData.idInfo._id + '/my-image.jpg'

        if (res.data.length == 1) {////////////////
          console.log("登陆成功")
          db.collection('Account').add({
            data: {
              type: 0,
              user_id: app.globalData.idInfo._id,
            },
            success(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
          wx.redirectTo({
            url: '../studentHome/studentHome'
            //url: '../test/test'
          })
        }
        else {
          console.log("用户名或密码错误")
        }
      }

    })

  },



  teacherlogin: function () {

    const checktemp = db.collection('Teachers').where({
      tIDnum: this.data.idnumber,
      tIDkey: this.data.password
    })
    checktemp.get({
      success(res) {
        app.globalData.idInfo = res.data[0]
        app.globalData.imagePath = 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + app.globalData.idInfo._id + '/my-image.jpg'

        if (res.data.length == 1) {////////////////
          console.log("登陆成功")
          db.collection('Account').add({
            data: {
              type: 1,
              user_id: app.globalData.idInfo._id,
            },
            success(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
          wx.redirectTo({
            url: '../teacherHome/teacherHome'
          })
        }
        else {
          console.log("用户名或密码错误")
        }

      }
    })
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