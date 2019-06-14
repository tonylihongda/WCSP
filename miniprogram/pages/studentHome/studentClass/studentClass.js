const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    classInfolist: [],//Classes
    classlist: [],//Class_Student
  },
  onLoad: function (options) {
    app.editTabBar()
  },
  opentheclass: function(e){

    app.globalData.openclass = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/studentHome/studentClass/classHome/classHome'
    })
  },
  onShow: function () {
    var classlist = []
    var classInfolist = []

    const dbcs = db.collection('Class_Student').where({
      student_id: app.globalData.idInfo._id
    })
    dbcs.count().then(res => {
      var haveclass = []
      const classnum = res.total
      dbcs.get().then(res => {
        for (var i = 0; i < classnum; i++) {
          classlist.push(res.data[i])
          haveclass.push(res.data[i].class_id)
          db.collection('Classes').doc(haveclass[i]).get().then(res => {
            classInfolist.push(res.data)
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
  joinclass: function(){
    wx.navigateTo({
      url: '/pages/studentHome/studentClass/joinClass/joinClass'
    })
  }
})