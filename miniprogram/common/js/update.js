 function update() {
  wx.cloud.callFunction({
    // 云函数名称
    name: 'getUserSelect',
    // 传给云函数的参数
    data: {
     },
  })
  .then(res => {
   
   var app=getApp();
   app.globalData.selectList=res.result.data[0].select;
   app.globalData.identity=res.result.data[0].identity;
   app.globalData.user=res.result.data[0];
   console.log(app.globalData.identity);
  })
  .catch(console.log("login,please"))

}
module.exports.update=update