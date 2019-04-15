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
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
    for(let i=0;i<this.data.select.length;i++){

      wx.cloud.callFunction({
        name: 'deleteclass',
        data: {
          _id: this.data.select[i]
        },
        success: res => {
          this.onShow()
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
          _id: this.data.select[i]
        },
        success: res => {
          this.onShow()

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
          _id: this.data.select[i]
        },
        success: res => {
          this.onShow()

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
          _id: this.data.select[i]
        },
        success: res => {
          this.onShow()

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
          _id: this.data.select[i]
        },
        success: res => {
          this.onShow()

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
          _id: this.data.select[i]
        },
        success: res => {
          this.onShow()

        },
        fail: err => {
          console.error('[云函数] [logoff] 调用失败', err)
          wx.navigateTo({
            url: '/pages/deployFunctions/deployFunctions',
          })
        }
      })
    }



  },
  opentheclass: function (e) {
    console.log(e.currentTarget.id)
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
    console.log('班级列表')
    const dbcs = db.collection('Classes').where({
      teacher_id: app.globalData.idInfo._id
    })
    dbcs.count().then(res => {
      var haveclass = []
      const classnum = res.total
      console.log(classnum)
      dbcs.get().then(res => {
        for (var i = 0; i < classnum; i++) {
          classlist.push(res.data[i])
          haveclass.push(res.data[i].section_id)
          db.collection('Classes').where({
            section_id: haveclass[i]
            }).get().then(res => {
            classInfolist.push(res.data[0])
            this.setData({
              'classInfolist': classInfolist,
            })
            console.log(classInfolist)
          })
        }
        //console.log(this.data.classInfolist)
        app.globalData.haveclass = haveclass
        console.log(haveclass)
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