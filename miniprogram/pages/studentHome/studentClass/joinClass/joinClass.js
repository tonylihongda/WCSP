const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    select: ''
  },
  selectClass(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.select = e.detail.value
  },

  jointheclass: function(){
    db.collection('Class_Student').add({
      data: {
        student_id: app.globalData.idInfo._id,
        class_id: this.data.select
      }
    }).then(res => {
      console.log("加入新班级成功！")
      wx.navigateBack({
        delta: 1
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var items=[]
    const _ = db.command
    console.log("此处")
    console.log(app.globalData.haveclass[0])
    console.log("此处")
    db.collection('Classes').where({
      _id: db.command.nin([app.globalData.haveclass])
      
    })
      //.skip(10) // 跳过结果集中的前 10 条，从第 11 条开始返回
      //.limit(10) // 限制返回数量为 10 条
      .get()
      .then(res => {
        items.push(res.data[0])
        this.setData({
          'items':items
        })
      })
      .catch(err => {
        console.error(err)
      }
    )
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