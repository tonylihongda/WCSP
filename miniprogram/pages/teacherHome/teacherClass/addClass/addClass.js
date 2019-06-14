const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    items: [],
    select: '',
    type: 0
  },
  selectClass(e) {
    this.data.select = e.detail.value
  },
  createclass: function () {
    for(var i = 0 ;i<this.data.select.length;i++){
      db.collection('Sections').doc(this.data.select[i]).get({
        success(res) {
          const sectionInfo = res.data
          db.collection('Classes').add({
            data: {
              teacher_id: app.globalData.idInfo._id,
              section_id: sectionInfo._id,
              course_id: sectionInfo.course_id,
              cNum: sectionInfo.cNum,
              cName: sectionInfo.cName
            }
          }).then(res => {
            wx.showToast({
              title: '创建班级成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1
            })
          })
        }
      })
    }
  },
  onLoad: function (options) {
    var items = []
    const _ = db.command

    db.collection('Sections').where({
      teacher_id:app.globalData.idInfo._id,
      _id: db.command.nin(app.globalData.haveclass),
    })
      //.skip(10) // 跳过结果集中的前 10 条，从第 11 条开始返回
      //.limit(10) // 限制返回数量为 10 条
      .get()
      .then(res => {
        if (res.data.length!=0){
          this.setData({
            type : 1
          })
        }
        for(let i=0;i<res.data.length;i++){
          items.push(res.data[i])
          this.setData({
            'items': items
          })
        }
      })
      .catch(err => {
        console.error(err)
      }
      )
  },
})