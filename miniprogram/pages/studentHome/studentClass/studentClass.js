const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classInfolist: [],//Classes
    classlist: [],//Class_Student
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  opentheclass: function(e){
    console.log(e.currentTarget.id)
    app.globalData.openclass = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/studentHome/studentClass/classHome/classHome'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var classlist = []
    var classInfolist = []
    console.log('班级列表')
    const dbcs = db.collection('Class_Student').where({
      student_id: app.globalData.idInfo._id
    })
    dbcs.count().then(res => {
      var haveclass = []
      const classnum = res.total
      console.log(classnum)
      dbcs.get().then(res => {
        for (var i = 0; i < classnum; i++) {
          classlist.push(res.data[i])
          haveclass.push(res.data[i].class_id)
          db.collection('Classes').doc(haveclass[i]).get().then(res => {
            classInfolist.push(res.data)
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

  },
  joinclass: function(){
    wx.navigateTo({
      url: '/pages/studentHome/studentClass/joinClass/joinClass'
    })
  }
})