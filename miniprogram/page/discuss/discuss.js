// miniprogram/page/discuss/discuss.js
var net=require('./../../common/js/net.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     discussArea:[],
     content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var a= net.getNoteDataById();
     var that=this;
     a.then(function(data){
      var b=data.data.discussArea;
      console.log(b);
     that.setData({discussArea:b})
     })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  input:function(e)
  {console.log(e.detail)
   this.setData({content:e.detail.value});

  },
  upload: function (e) {
   
   var userInfo=e.detail.userInfo;
   var updateData={};
  updateData.name=userInfo.nickName;
  updateData.avatarUrl=userInfo.avatarUrl;
  updateData.content=this.data.content;
   const db = wx.cloud.database({ env: 'hopeless00-cx362' });
   var id=getApp().globalData.idon;
   db.collection("NoteDate").doc(id)
     .update({
       data:{
          discussArea:db.command.push(updateData)
       }
     })
     this.onLoad();
 },
})