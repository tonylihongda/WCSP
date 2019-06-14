//index.js
const app = getApp()

Page({
  data: {

  },

  onLoad: function() {
  },
  addstudent: function(){
    wx.navigateTo({
      url: '/pages/student/student'
    })
  },
  addteacher: function () {
    wx.navigateTo({
      url: '/pages/teacher/teacher'
    })
  },
  addcourse: function () {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  },
  addsection: function () {
    wx.navigateTo({
      url: '/pages/section/section'
    })
  },
  addsc: function () {
    wx.navigateTo({
      url: '/pages/sc/sc'
    })
  },
})
