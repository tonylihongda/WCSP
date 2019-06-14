const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  var course_list = []
  var courseInfo_list = []
  var week_kecheng = []
  var jilu = []
  try {
    course_list = await db.collection('Sections').where({
      teacher_id: event._id
    }).get()
  } catch (e) {
    console.error(e)
  }
  try {
    for (let m = 0; m < course_list.data.length; m++) {
      courseInfo_list.push(await db.collection('Sections').doc(course_list.data[m]._id).get())
      jilu.push('22')
      for (let nn = 0; nn < courseInfo_list[m].data.time_slot.length; nn++) {//
        jilu.push('24')
        var yiduan_list = []
        var nulltemp = { sw_kc: [], xw_kc: [], ws_kc: [] }
        for (let x = 0; x < courseInfo_list[m].data.time_slot[nn].startweek; x++) {
          yiduan_list.push(nulltemp)
        }
        for (var n = courseInfo_list[m].data.time_slot[nn].startweek; n <= courseInfo_list[m].data.time_slot[nn].endweek; n++) {
          jilu.push('26')
          var yizhou_list = { sw_kc: [], xw_kc: [], ws_kc: [] }
          for (let o = 0; o < courseInfo_list[m].data.time_slot[nn].time.length; o++) {  //周目     
            jilu.push('28')
            if (courseInfo_list[m].data.time_slot[nn].time[o].num == 0 || courseInfo_list[m].data.time_slot[nn].time[o].num == 1) {
              jilu.push('30')
              var temp = {
                "xqj": courseInfo_list[m].data.time_slot[nn].time[o].weekday,
                "skjc": courseInfo_list[m].data.time_slot[nn].time[o].num,
                "skcd": 1,
                "kcmc": courseInfo_list[m].data.cName,
                "bg": 'shangwuke',
                "pos": courseInfo_list[m].data.position
              }
              jilu.push('38')
              yizhou_list.sw_kc.push(temp)
            }
            else if (courseInfo_list[m].data.time_slot[nn].time[o].num == 2 || courseInfo_list[m].data.time_slot[nn].time[o].num == 3) {
              jilu.push('40')
              var temp = {
                "xqj": courseInfo_list[m].data.time_slot[nn].time[o].weekday,
                "skjc": courseInfo_list[m].data.time_slot[nn].time[o].num - 2,
                "skcd": 1,
                "kcmc": courseInfo_list[m].data.cName,
                "bg": 'xiawuke',
                "pos": courseInfo_list[m].data.position
              }
              jilu.push('38')
              yizhou_list.xw_kc.push(temp)
            }
            else {
              jilu.push('54')
              var temp = {
                "xqj": courseInfo_list[m].data.time_slot[nn].time[o].weekday,
                "skjc": courseInfo_list[m].data.time_slot[nn].time[o].num - 4,
                "skcd": 1,
                "kcmc": courseInfo_list[m].data.cName,
                "bg": 'wanke',
                "pos": courseInfo_list[m].data.position
              }
              jilu.push('62')
              yizhou_list.ws_kc.push(temp)
            }
          }
          yiduan_list.push(yizhou_list)
        }
        week_kecheng.push(yiduan_list)
      }
    }
  }
  catch (e) {
    console.error(e)
  }
  return {
    course_list: course_list ,
    week_kecheng: week_kecheng,
    courseInfo_list,
    course_list,
    jilu,
  }
}