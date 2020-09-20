const cloud = require('wx-server-sdk')
cloud.init({ env:"hopeless00-cx362"})
// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  return db.collection('UserInfo').where({_openid:OPENID
})           //获取用户信息
.get()

}