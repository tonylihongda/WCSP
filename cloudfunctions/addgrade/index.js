const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const wxContext = cloud.getWXContext()

exports.main = async (event, context) => {
  try {
    return await db.collection('Section_Student').doc(event._id).update({
      data:{
        grade: event.input
      }
    })
  } catch (e) {
    console.error(e)
  }
}