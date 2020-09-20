const cloud = require('wx-server-sdk')

cloud.init({ env:"hopeless00-cx362"})

// 云函数入口函数
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  if(event.type=="add")
  try {
    return await db.collection('UserInfo').where({_openid:OPENID

    })
    
  
    
    .update({
      data: {
       select:_.push(event.id)
      },
    })
  } catch(e) {
    console.error(e)
  }
  if(event.type=="remove")
  try {
    return await db.collection('UserInfo').where({_openid:OPENID,
       select:event.id
    })
    
  
    
    .update({
      data: {
       'select.$':'0'
      },
    })
  } catch(e) {
    console.error(e)
  }
}