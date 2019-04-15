const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    studentInfolist: [],//Classes
    input: 0,
    type: 0
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
        console.log(res)
        console.log(res.data.length)

        for(let j=0 ; j < res.data.length ; j++){
          joinstudent.push(res.data[j].student_id)
          console.log(joinstudent)
        }
        console.log(joinstudent)
        db.collection('Classes').doc(app.globalData.openclass).get({
          success(res) {
            classInfo = res.data
            that.data.section_id = res.data.section_id
            db.collection('Section_Student').where({
              section_id: classInfo.section_id
            }).get({
              success(res) {
                console.log(joinstudent)
                allstudent = res.data
                for (let i = 0; i < allstudent.length; i++) {
                  db.collection('Students').doc(allstudent[i].student_id).get({
                    success(res) {
                      console.log(joinstudent)
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
    console.log(that.data.ssid)
    console.log(that.data.input)



    /*db.collection('Section_Student').doc(that.data.ssid).update({
      data:{
        grade: that.data.input
      }
    })*/
    wx.cloud.callFunction({
      name: 'addgrade',
      data: {
        _id : that.data.ssid,
        input: that.data.input
      },
      success: res => {
        console.log(res)
        that.setData({
          type: 0
        })
        that.onLoad()
      },
      fail: err => {
        console.error('[云函数] [logoff] 调用失败', err)
        wx.navigateTo({
          url: '/pages/deployFunctions/deployFunctions',
        })
      }
    })
  },
  addgrade: function(e){
    var that = this
    console.log(e.currentTarget)
    that.data.ssid = e.currentTarget.id
    that.setData({
      type: 1
    })
  },
  printgrade: function(e){
    this.data.input = e.detail.value;
  }
})