const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  var course_list = []
  var courseInfo_list =[]
  var week_kecheng = []
  var jilu = []
  try {
    course_list = await db.collection('Section_Student').where({
      student_id: event._id
    }).get()
  } catch (e) {
    console.error(e)
  }




  try {
    for (let m = 0; m < course_list.data.length; m++) {
      courseInfo_list.push(await db.collection('Sections').doc(course_list.data[m].section_id).get())
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
          var yizhou_list = {sw_kc:[],xw_kc:[],ws_kc:[]}
          for (let o = 0; o < courseInfo_list[m].data.time_slot[nn].time.length; o++) {  //周目     
            jilu.push('28')
            if (courseInfo_list[m].data.time_slot[nn].time[o].num == 0 || courseInfo_list[m].data.time_slot[nn].time[o].num == 1) {
              jilu.push('30')
              var temp = {
                "xqj": courseInfo_list[m].data.time_slot[nn].time[o].weekday,
                "skjc": courseInfo_list[m].data.time_slot[nn].time[o].num,
                "skcd": 1,
                "kcmc": courseInfo_list[m].data.cName,
                "bg": 'shangwuke'
              }
              jilu.push('38')
              yizhou_list.sw_kc.push(temp)
            }
            else if (courseInfo_list[m].data.time_slot[nn].time[o].num == 2 || courseInfo_list[nn].data.time_slot[m].time[o].num == 3) {
              jilu.push('40')
              var temp = {
                "xqj": courseInfo_list[m].data.time_slot[nn].time[o].weekday,
                "skjc": courseInfo_list[m].data.time_slot[nn].time[o].num - 2,
                "skcd": 1,
                "kcmc": courseInfo_list[m].data.cName,
                "bg": 'xiawuke'
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
                "bg": 'wanke'
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
/*
  for(let m = 0 ; m<course_list.data.length;m++){
    try {
      courseInfo_list.push(await db.collection('Sections').doc(course_list.data[m].section_id).get())
      jilu.push('22')
      var yimen_list = []
      for (let nn=0 ; nn < courseInfo_list[m].data.time_slot.length;nn++){//
        jilu.push('24')
        var yiduan_list = []
        for (var n = courseInfo_list[m].data.time_slot[nn].startweek; n <= courseInfo_list[m].data.time_slot[nn].endweek; n++) {
          jilu.push('26')
          var yizhou_list = []
          for (let o = 0; o < courseInfo_list[m].data.time_slot[nn].time.length; o++) {//周目     
            jilu.push('28')
            if (courseInfo_list[m].data.time_slot[nn].time[o].num == 0 || courseInfo_list[m].data.time_slot[nn].time[o].num == 1) {
              jilu.push('30')
              var temp = {
                "xqj": courseInfo_list[m].data.time_slot[nn].time[o].weekday,
                "skjc": courseInfo_list[m].data.time_slot[nn].time[o].num,
                "skcd": 1,
                "kcmc": courseInfo_list[m].data.cName,
                "bg": 'shangwuke'
              }
              jilu.push('38')
              yizhou_list.push(temp)
            }
            else if (courseInfo_list[m].data.time_slot[nn].time[o].num == 2 || courseInfo_list[nn].data.time_slot[m].time[o].num == 3) {
              jilu.push('40')
              var temp = {
                "xqj": courseInfo_list[m].data.time_slot[nn].time[o].weekday,
                "skjc": courseInfo_list[m].data.time_slot[nn].time[o].num - 2,
                "skcd": 1,
                "kcmc": courseInfo_list[m].data.cName,
                "bg": 'xiawuke'
              }
              jilu.push('38')
              yizhou_list.push(temp)
            }
            else {
              jilu.push('54')
              var temp = {
                "xqj": courseInfo_list[m].data.time_slot[nn].time[o].weekday,
                "skjc": courseInfo_list[m].data.time_slot[nn].time[o].num - 4,
                "skcd": 1,
                "kcmc": courseInfo_list[m].data.cName,
                "bg": 'wanke'
              }
              jilu.push('62')
              yizhou_list.push(temp)
            }
            
          }
          yiduan_list.push(yizhou_list)
        }
        yimen_list.push(yiduan_list)
      }
      week_kecheng.push(yimen_list)
    } catch (e) {
      console.error(e)
    }
  }*/


  return {
    week_kecheng : week_kecheng,
    courseInfo_list,
    course_list,
    jilu,
  }

   /* buzhou = '11行'
    course_list = res.data
    for (var k = 0; k < res.data.length; k++) {
      buzhou = '13行'
      db.collection('Sections').doc(course_list[k].section_id).get().then(
        res=>{
          for(var m=0;m<res.data.length;m++){
            buzhou = '17行'
            for (var n = res.data[m].startweek; n <= res.data[m].startweek;n++){
              for (var o = 0; n <= res.data[m].time[o].length; o++) {//周目
                if (res.data[m].time[o].num == 0 || res.data[m].time[o].num == 1){
                  week_kecheng[n].sw_kc.push({
                    "xqj": res.data[m].time[o].weekday,
                    "skjc": res.data[m].time[o].num,
                    "skcd": 1,
                    "kcmc": res.data[m].cName,
                    "bg": 'shangwuke'
                  })
                }
                else if (res.data[m].time[o].num == 2 || res.data[m].time[o].num == 3) {
                  week_kecheng[n].sw_kc.push({
                    "xqj": res.data[m].time[o].weekday,
                    "skjc": res.data[m].time[o].num-2,
                    "skcd": 1,
                    "kcmc": res.data[m].cName,
                    "bg": 'xiawuke'
                  })
                }
                else{
                  week_kecheng[n].sw_kc.push({
                    "xqj": res.data[m].time[o].weekday,
                    "skjc": res.data[m].time[o].num - 4,
                    "skcd": 1,
                    "kcmc": res.data[m].cName,
                    "bg": 'wanke'
                  })
                }
              }
            }
          }
        }
      )
    }*/
}