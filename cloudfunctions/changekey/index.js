// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const wxContext = cloud.getWXContext()

exports.main = async (event, context) => {
  try {
    return await db.collection('Students').doc(event._id).update({
      data: {
        sIDkey: event.newpassword
      }
    })
  } catch (e) {
    console.error(e)
  }
}