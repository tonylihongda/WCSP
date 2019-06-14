const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    examsheet: [],
    x: 0
  },
  onLoad: function () {
    var examsheet = []
    db.collection('Section_Student').where({
      student_id: app.globalData.idInfo._id
    }).get().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data)
        if (res.data[i].exam_time != null) {
          examsheet.push(res.data[i])
          //examsheet[i].exam_time = res.data[i].exam_time.getMonth() + 1 + '月' + res.data[i].exam_time.getDate() + '日  ' + res.data[i].exam_time.getHours() + ':' + res.data[i].exam_time.getMinutes() + ':' + res.data[i].exam_time.getSeconds()
        }
      }
      this.setData({
        'examsheet': examsheet
      })
    })
  },
})