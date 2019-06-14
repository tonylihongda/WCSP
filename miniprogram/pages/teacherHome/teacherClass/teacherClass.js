const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classInfolist: [],//Classes
    classlist: [],//Class_Student
    type: 0, 
    select: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar2();
  },
  selectdelClass: function(e){

    this.data.select = e.detail.value
  },
  deleteclass: function (){
    this.setData({
      type: 1
    })
  },
  deletecancel: function(){
    this.setData({
      type: 0
    })
  },
  deletesure: function(){
    var that=this
    if (that.data.select.length==0){
      wx.showToast({
        title: '未选择班级',
        image: '/images/error.png',
        duration: 1500
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否删除选定的班级',
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '文件删除中',
              icon: 'loading',
            })
            for (let i = 0; i < that.data.select.length; i++) {

              wx.cloud.callFunction({
                name: 'deleteclass',
                data: {
                  _id: that.data.select[i]
                },
                success: res => {
                  that.onShow()
                  wx.redirectTo({
                    url: '/pages/teacherHome/teacherClass/teacherClass'
                  })
                },
                fail: err => {
                  console.error('[云函数] [logoff] 调用失败', err)
                  wx.navigateTo({
                    url: '/pages/deployFunctions/deployFunctions',
                  })
                }
              })


              wx.cloud.callFunction({
                name: 'deleteaudio',
                data: {
                  _id: that.data.select[i]
                },
                success: res => {
                  that.onShow()

                },
                fail: err => {
                  console.error('[云函数] [logoff] 调用失败', err)
                  wx.navigateTo({
                    url: '/pages/deployFunctions/deployFunctions',
                  })
                }
              })



              wx.cloud.callFunction({
                name: 'deletestudent',
                data: {
                  _id: that.data.select[i]
                },
                success: res => {
                  that.onShow()

                },
                fail: err => {
                  console.error('[云函数] [logoff] 调用失败', err)
                  wx.navigateTo({
                    url: '/pages/deployFunctions/deployFunctions',
                  })
                }
              })



              wx.cloud.callFunction({
                name: 'deletefile',
                data: {
                  _id: that.data.select[i]
                },
                success: res => {
                  that.onShow()

                },
                fail: err => {
                  console.error('[云函数] [logoff] 调用失败', err)
                  wx.navigateTo({
                    url: '/pages/deployFunctions/deployFunctions',
                  })
                }
              })


              wx.cloud.callFunction({
                name: 'deletenotice',
                data: {
                  _id: that.data.select[i]
                },
                success: res => {
                  that.onShow()

                },
                fail: err => {
                  console.error('[云函数] [logoff] 调用失败', err)
                  wx.navigateTo({
                    url: '/pages/deployFunctions/deployFunctions',
                  })
                }
              })


              wx.cloud.callFunction({
                name: 'deletevideo',
                data: {
                  _id: that.data.select[i]
                },
                success: res => {
                  that.onShow()

                },
                fail: err => {
                  console.error('[云函数] [logoff] 调用失败', err)
                  wx.navigateTo({
                    url: '/pages/deployFunctions/deployFunctions',
                  })
                }
              })
            }
          } else if (res.cancel) {
            that.onShow()
          }
        }
      })
    }
    
    



  },
  opentheclass: function (e) {
    app.globalData.openclass = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/classHome/classHome'
    })
  },
  addclass: function () {
    wx.navigateTo({
      url: '/pages/teacherHome/teacherClass/addClass/addClass'
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
    var classlist = []
    var classInfolist = []
    const dbcs = db.collection('Classes').where({
      teacher_id: app.globalData.idInfo._id
    })
    dbcs.count().then(res => {
      var haveclass = []
      const classnum = res.total
      dbcs.get().then(res => {
        for (var i = 0; i < classnum; i++) {
          classlist.push(res.data[i])
          haveclass.push(res.data[i].section_id)
          db.collection('Classes').where({
            section_id: haveclass[i]
            }).get().then(res => {
            classInfolist.push(res.data[0])
            classInfolist.sort()
            this.setData({
              'classInfolist': classInfolist,
            })
          })
        }
        app.globalData.haveclass = haveclass
        this.setData({
          'classlist': classlist,//班级的_id
        })
      })
    })
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