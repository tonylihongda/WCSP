const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {

  try {
    return await db.collection('Videos').where({
      class_id: event.class_id,
      file_path: event.fileID
    }).remove()
  } catch (e) {
    console.error(e)
  }

}