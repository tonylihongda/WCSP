const app = getApp();
const db = wx.cloud.database();

var touchDot = 0;//触摸时的原点
var time = 0;//  时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理 时间记录
var nth = 0;// 设置活动菜单的index
var nthMax = 1;//活动菜单的最大个数
var tmpFlag = true;




var theDate = new Date();
var today = theDate.toLocaleDateString();
var themonth = theDate.getMonth() + 1;
var firstDay = new Date(2019, 1, 25);
var dayWeek = theDate.getDay();//今天周几  
if (dayWeek == 0) { dayWeek = 7; }

//计算今天是第几周
var weekNum = Math.ceil(((theDate.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000) + 1 - dayWeek) / 7) - 1;

Page({
  data: {
    themonth: '',
    today: '',
    array: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周'],
    weekNum: 0,
    sName : '',
    cardRightIn: false,
    cardLeftIn: false,
    week_day: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
    times: [{
      name: '',
      class2: 'left2'
    }, {
      name: ' 第一节8：00',
      class2: ''
    }, {
      name: '第二课10：05',
      class2: ''
    }, {
      name: '',
      class2: 'left2'
    }, {
      name: ' 第一节13：30',
      class2: ''
    }, {
      name: ' 第二节15：10',
      class2: ''
    }, {
      name: '',
      class2: 'left2'
    }, {
      name: ' 第一节16：00',
      class2: ''
    }],
    week_kecheng: [],
  },
  onLoad: function () {
    app.editTabBar();
    var that = this;
    var firstday = new Date(2019, 1, 25)
    var tempday = new Date()
    var week_day = []



    for(var j=0;j<19;j++){
      var single_week_day = [{
        week: '一',
        month: 0,
        day: 0,
        k: '',
      }, {
        week: '二',
          month: 0,
          day: 0,
          k: '',
      }, {
        week: '三',
          month: 0,
          day: 0,
          k: '',
      }, {
        week: '四',
          month: 0,
          day: 0,
          k: '',
      }, {
        week: '五',
          month: 0,
          day: 0,
          k: '',
      }, {
        week: '六',
          month: 0,
          day: 0,
          k: '',
      }, {
        week: '日',
          month: 0,
          day: 0,
          k: '',
      }]
      for (var i = 0; i < 7; i++) {
          tempday.setTime(firstday.getTime() + 24 * 60 * 60 * 1000 * (j*7+i))
          single_week_day[i].month = tempday.getMonth()+1
          single_week_day[i].day = tempday.getDate()
          if (tempday.toLocaleDateString() == theDate.toLocaleDateString()){
            single_week_day[i].k ='top-text2'
          }
      }
      week_day.push(single_week_day)
    }
    that.setData({
      week_day: week_day,
      weekNum: weekNum,
      themonth: themonth,
      today: theDate.getFullYear() + ' 年 ' + themonth + ' 月 ' + theDate.getDate()+' 日'
    })
  },

  onShow: function () {
    var that =this
    var week_kecheng = []
    db.collection('Section_Student').where({
      student_id: app.globalData.idInfo._id
    }).get({
      success(res) {
        for (let m = 0; m < res.data.length; m++) {
          db.collection('Sections').doc(res.data[m].section_id).get({
            success(res){
              console.log(res)
              for (let nn = 0; nn < res.data.time_slot.length; nn++) {//
                var yiduan_list = []
                var nulltemp = { sw_kc: [], xw_kc: [], ws_kc: [] }
                for (let x = 0; x < res.data.time_slot[nn].startweek; x++) {
                  yiduan_list.push(nulltemp)
                }
                for (var n = res.data.time_slot[nn].startweek; n <= res.data.time_slot[nn].endweek; n++) {

                  var yizhou_list = { sw_kc: [], xw_kc: [], ws_kc: [] }
                  for (let o = 0; o < res.data.time_slot[nn].time.length; o++) {  //周目     

                    if (res.data.time_slot[nn].time[o].num == 0 || res.data.time_slot[nn].time[o].num == 1) {

                      var temp = {
                        "xqj": res.data.time_slot[nn].time[o].weekday,
                        "skjc": res.data.time_slot[nn].time[o].num,
                        "skcd": 1,
                        "kcmc": res.data.cName,
                        "bg": 'shangwuke',
                        "pos": res.data.position,
                      }

                      yizhou_list.sw_kc.push(temp)
                    }
                    else if (res.data.time_slot[nn].time[o].num == 2 || res.data.time_slot[nn].time[o].num == 3) {

                      var temp = {
                        "xqj": res.data.time_slot[nn].time[o].weekday,
                        "skjc": res.data.time_slot[nn].time[o].num - 2,
                        "skcd": 1,
                        "kcmc": res.data.cName,
                        "bg": 'xiawuke',
                        "pos": res.data.position,
                      }
   
                      yizhou_list.xw_kc.push(temp)
                    }
                    else {
  
                      var temp = {
                        "xqj": res.data.time_slot[nn].time[o].weekday,
                        "skjc": res.data.time_slot[nn].time[o].num - 4,
                        "skcd": 1,
                        "kcmc": res.data.cName,
                        "bg": 'wanke',
                        "pos": res.data.position,
                      }

                      yizhou_list.ws_kc.push(temp)
                    }
                  }
                  yiduan_list.push(yizhou_list)
                }
                week_kecheng.push(yiduan_list)
                that.setData({
                  'week_kecheng': week_kecheng
                })
                console.log(week_kecheng)
              }
            }
          })
        }
      }
    })
  },


  bindPickerChange: function(e){
    this.setData({
      weekNum: e.detail.value,
    })
  }, 
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  touchMove: function (e) {
    var that = this
    var touchMove = e.touches[0].pageX
    var weekNum = that.data.weekNum
    if (tmpFlag) {
      if (touchMove < touchDot - 150) {
        nth++
        if (weekNum == 18) {
          weekNum = 0
        } else {
          weekNum++
        }
        that.setData({
          weekNum: weekNum,
        })
        tmpFlag = false;
      }
      // 向右滑动
      if (touchMove > touchDot + 150) {
        nth++
        if (weekNum == 0) {
          weekNum = 18
        } else {
          weekNum--
        }
        that.setData({
          weekNum: weekNum
        })
        that.setData({
          weekNum: weekNum,
        })
        tmpFlag = false;
      }
    }
  },
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval
    time = 0;
    tmpFlag = true;
  },
})