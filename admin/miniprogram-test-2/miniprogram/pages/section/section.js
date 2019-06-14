const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachers:[],
    course:[],
    cindex:0,
    tindex:0,
    cNum: '',
    position: '',
    tNames:[],
    cNames:[],
    time_slot:[],
    duanshu: 0,
    jieshu: 0,
    startweek: 8,
    endweek:15,
    num:0,
    weekday:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    db.collection('Teachers').get({
      success(res){
        var teachers = res.data
        var tNames = []
        for(let i = 0;i<res.data.length;i++){
          tNames.push(res.data[i].tName)
        }
        that.setData({
          'teachers': teachers,
          'tNames': tNames
        })
      }
    })
    db.collection('Courses').get({
      success(res){
        var courses = res.data
        var cNames = []
        for (let i = 0; i < res.data.length; i++) {
          cNames.push(res.data[i].cName)
        }
        that.setData({
          'courses': courses,
          'cNames':cNames
        })
      }
    })
  },
  duanshu: function(e){
    this.data.duanshu=e.detail.value
  },
  duanshuok:function(){
    var that = this
    var time_slot = []
    for (let i = 0; i < that.data.duanshu; i++) {
      time_slot.push({ endweek: 0, startweek: 0, time: [] })
      that.setData({
        'time_slot': time_slot
      })
    }
  },
  startweek:function(e){
    this.data.index1 = e.currentTarget.id
    this.data.time_slot[e.currentTarget.id].startweek = e.detail.value
  },
  endweek: function (e) {
    this.data.index1 = e.currentTarget.id
    this.data.time_slot[e.currentTarget.id].endweek = e.detail.value
  },
  jieshu: function (e) {
    this.data.index1 = e.currentTarget.id
    this.data.jieshu = e.detail.value
  },
  jieshuok:function(){
    var that = this
    console.log(that.data.jieshu)
    for (let i = 0; i < that.data.jieshu; i++) {
      that.data.time_slot[that.data.index1].time.push({ num: 0, weekday: 0 })
      that.setData({
        'time_slot': that.data.time_slot
      })
    }
  },
  num:function(e){
    this.data.time_slot[this.data.index1].time[e.currentTarget.id].num = e.detail.value
  },
  weekday:function(e){
    this.data.time_slot[this.data.index1].time[e.currentTarget.id].weekday = e.detail.value
  },


  course_id: function(e){
    this.setData({
      cindex: e.detail.value,
    })
  },
  teacher_id:function(e){
    this.setData({
      tindex: e.detail.value,
    })
  },



  cNum: function (e) {
    this.data.cNum = e.detail.value;
  },
  position: function (e) {
    this.data.position = e.detail.value;
  },
  ok: function () {
    var that = this
    if (1==2) {
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
      db.collection('Sections').add({
        data: {
          cName: that.data.courses[that.data.cindex].cName,
          cNum: that.data.cNum,
          cTotal: that.data.courses[that.data.cindex].cTotal,
          course_id: that.data.courses[that.data.cindex]._id,
          position: that.data.position,
          tName: that.data.teachers[that.data.tindex].tName,
          teacher_id: that.data.teachers[that.data.tindex]._id,
          time_slot: that.data.time_slot,
        },
        success(res) {
          wx.redirectTo({
            url: '/pages/section/section',
          })
        }
      })
    }

  },
})