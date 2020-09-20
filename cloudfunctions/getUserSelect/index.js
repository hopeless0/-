const cloud = require('wx-server-sdk')

cloud.init({ env:"hopeless00-cx362"})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  return db.collection('UserInfo').where({_openid:OPENID

})
  
  
.get()

}