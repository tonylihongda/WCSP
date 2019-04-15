const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {

  try {
    return await db.collection('Notices').doc(event._id).remove()
  } catch (e) {
    console.error(e)
  }

}