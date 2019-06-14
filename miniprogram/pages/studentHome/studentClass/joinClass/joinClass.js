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
  jointheclass: function(){
    for(let i = 0;i<this.data.select.length;i++){
      db.collection('Class_Student').add({
        data: {
          student_id: app.globalData.idInfo._id,
          class_id: this.data.select[i]
        }
      }).then(res => {
        wx.showToast({
          title: '加入班级成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },
  onLoad: function (options) {
    var items=[]
    const _ = db.command

    db.collection('Classes').where({
      _id: db.command.nin(app.globalData.haveclass)
    }).get().then(res => {
      if(res.data.length!=0){
        this.setData({
          type:1
        })
      }
      for (let i = 0; i < res.data.length; i++) {
        items.push(res.data[i])
        this.setData({
          'items': items
        })
        console.log(items)
      }
    })
      .catch(err => {
        console.error(err)
      }
      )
  }
})