const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    studentInfolist: [],//Classes
    input: -1,
    type: 0,
    num: 0
  },
  onLoad: function (options) {
    var that = this
    var studentInfolist = []
    var classInfo = {}
    var allstudent = []
    var joinstudent = []
    db.collection('Class_Student').where({
      class_id: app.globalData.openclass
    }).get({
      success(res){
        for(let j=0 ; j < res.data.length ; j++){
          joinstudent.push(res.data[j].student_id)

        }
        db.collection('Classes').doc(app.globalData.openclass).get({
          success(res) {
            classInfo = res.data
            that.data.section_id = res.data.section_id
            db.collection('Section_Student').where({
              section_id: classInfo.section_id
            }).get({
              success(res) {
                allstudent = res.data
                for (let i = 0; i < allstudent.length; i++) {
                  db.collection('Students').doc(allstudent[i].student_id).get({
                    success(res) {
                      var astudent = res.data
                      if (joinstudent.includes(astudent._id)) {
                        astudent.state = '已加入'
                      }else{
                        astudent.state = '未加入'
                      }
                      db.collection('Section_Student').where({
                        student_id: allstudent[i].student_id,
                        section_id: classInfo.section_id
                      }).get({
                        success(res){
                          astudent.ssid = res.data[0]._id
                          astudent.grade = res.data[0].grade
                          studentInfolist.push(astudent)
                          console.log(studentInfolist)
                          that.setData({
                            'studentInfolist': studentInfolist
                          })
                        }
                      })               
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  refresh: function () {
    var that = this
    var todo = "studentInfolist["+that.data.num+"].grade";
    that.setData({
      [todo]: that.data.input
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
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

  },
  addsure: function(){
    var that = this
    if (that.data.input > 100 || that.data.input < 0){
      wx.showToast({
        title: '输入不合法',
        image: '/images/error.png',
        duration: 1500
      })
    }else{
      wx.showToast({
        title: '成绩修改中',
        icon: 'loading',
        duration: 2000
      })
      wx.cloud.callFunction({
        name: 'addgrade',
        data: {
          _id: that.data.ssid,
          input: that.data.input
        },
        success: res => {
          that.setData({
            type: 0
          })
          that.refresh()
        },
        fail: err => {
          console.error('[云函数] [logoff] 调用失败', err)
          wx.navigateTo({
            url: '/pages/deployFunctions/deployFunctions',
          })
        }
      })
    }   
  },
  addgrade: function(e){
    var that = this
    console.log(e.currentTarget)
    that.data.ssid = e.currentTarget.id
    for (let i = 0; i < that.data.studentInfolist.length; i++) {
      if (that.data.studentInfolist[i].ssid == that.data.ssid) {
        that.data.num = i
        break
      }
    }
    that.setData({
      type: 1,
      num: that.data.num
    })
  },
  printgrade: function(e){
    this.data.input = e.detail.value;

  }
})