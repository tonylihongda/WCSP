const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
    major:'软件工程',
    sIDkey: '144961',
    sIDnum: '',
    sName: '二傻',
    sSex:'男',
    sYear:'2015',
    school:'软件学院'
  },
  ok: function(){
    var that=this
    if(that.data.sIDnum.length!=9){
      wx.showToast({
        title: '学号长度为9位',
        icon: 'loading',
        duration :1000
      })
    }else{
      wx.showToast({
        title: '加入中',
        icon: 'loading',
      })
      db.collection('Students').add({
        data: {
          major: that.data.major,
          sIDkey: that.data.sIDkey,
          sIDnum: that.data.sIDnum,
          sName: that.data.sName,
          sSex: that.data.sSex,
          sYear: that.data.sYear,
          school: that.data.school,
        },
        success(res) {
          wx.redirectTo({
            url: '/pages/student/student',
          })
        }
      })
    }
    
  },
  major: function (e) {
    this.data.major = e.detail.value;
  },
  sIDkey: function (e) {
    this.data.sIDkey = e.detail.value;
  },
  sIDnum: function (e) {
    this.data.sIDnum = e.detail.value;
  },
  sName: function (e) {
    this.data.sName = e.detail.value;
  },
  sSex: function (e) {
    this.data.sSex = e.detail.value;
  },
  sYear: function (e) {
    this.data.sYear = e.detail.value;
  },
  school: function (e) {
    this.data.school = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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