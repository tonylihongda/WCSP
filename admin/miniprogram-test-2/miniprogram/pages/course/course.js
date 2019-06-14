const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
    cName: '',
    cTotal: 0,
  },
  ok: function () {
    var that = this
    if (that.data.cName==''||that.data.cTotal==0) {
      wx.showToast({
        title: '输入不合法',
        icon: 'loading',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '加入中',
        icon: 'loading',
      })
      db.collection('Courses').add({
        data: {
          cName:that.data.cName,
          cTotal: that.data.cTotal
        },
        success(res) {
          wx.redirectTo({
            url: '/pages/course/course',
          })
        }
      })
    }

  },
  cName: function (e) {
    this.data.cName = e.detail.value;
  },
  cTotal: function (e) {
    this.data.cTotal = e.detail.value;
  },
})