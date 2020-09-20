function getNoteData (i) {
  return new Promise((resolve )=> {

    const db = wx.cloud.database({ env: 'hopeless00-cx362' });
    db.collection("NoteDate").skip(i*20).limit(20)
      .get({
        success(res) {
          // res.data 是包含以上定义的两条记录的数组

          resolve(res);


        }
      })
  })}
  function getNoteDataById () {
    let app=getApp();
    var id=app.globalData.idon;
    
    return new Promise((resolve )=> {
  
      const db = wx.cloud.database({ env: 'hopeless00-cx362' });
    
      db.collection("NoteDate").doc(id)
        .get({
          success(res) {
            // res.data 是包含以上定义的两条记录的数组
  
            resolve(res);
  
  
          }
        })
    })}
    function getNoteDataByList(list)
    {
      return new Promise((resolve )=> {

        const db = wx.cloud.database({ env: 'hopeless00-cx362' });
        
        db.collection("NoteDate").where({_id:db.command.in(list)})
          .get({
            success(res) {
              // res.data 是包含以上定义的两条记录的数组
    
              resolve(res);
    
    
            }
          })
      })

    }
    function getNoteDataByChoose (name) {
      return new Promise((resolve )=> {
    
        const db = wx.cloud.database({ env: 'hopeless00-cx362' });
      
        db.collection("NoteDate").where({type:name})
          .get({
            success(res) {
              // res.data 是包含以上定义的两条记录的数组
             resolve(res);
            }
          })
      })}
  module.exports.getNoteData=getNoteData
  module.exports.getNoteDataById=getNoteDataById
  module.exports.getNoteDataByList=getNoteDataByList
  module.exports.getNoteDataByChoose=getNoteDataByChoose