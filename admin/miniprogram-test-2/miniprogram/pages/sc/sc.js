const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sections: [],
    students: [],
    seindex: 0,
    stindex: 0,
    seNames: [],
    stNames: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('Sections').get({
      success(res) {
        var sections = res.data
        var seNames = []
        for (let i = 0; i < res.data.length; i++) {
          seNames.push(res.data[i].cName)
        }
        that.setData({
          'sections': sections,
          'seNames': seNames
        })
      }
    })
    db.collection('Students').get({
      success(res) {
        var students = res.data
        var stNames = []
        for (let i = 0; i < res.data.length; i++) {
          stNames.push(res.data[i].sName)
        }
        that.setData({
          'students': students,
          'stNames': stNames
        })
      }
    })
  },
  section_id: function (e) {
    this.setData({
      seindex: e.detail.value,
    })
  },
  student_id: function (e) {
    this.setData({
      stindex: e.detail.value,
    })
  },

  ok: function () {
    var that = this
    if (1 == 2) {
      wx.showToast({
        title: '',
        icon: 'loading',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '加入中',
        icon: 'loading',
      })
      db.collection('Section_Student').add({
        data: {
          cName: that.data.sections[that.data.seindex].cName,
          section_id: that.data.sections[that.data.seindex]._id,
          student_id: that.data.students[that.data.stindex]._id,
        },
        success(res) {
          wx.redirectTo({
            url: '/pages/sc/sc',
          })
        }
      })
    }

  },
})