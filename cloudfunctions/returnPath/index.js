const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const cloudPath = event.filePath.match(/\.[^.]+?$/)

  return {
    cloudPath: cloudPath
  }
}