// miniprogram/page/detail/detail.js
var net=require('./../../common/js/net.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
       Detail:{},
       selected:false,
       moveable:{
         x:0,
         y:0,
         content:'滑动加入个人箱子'
       }
       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a= net.getNoteDataById();
    console.log(a);
    var that=this;
    a.then(function(data){
      var b=data.data;
      b.datestart=b.datestart.toLocaleString();
      b.dateend=b.dateend.toLocaleString();
      that.setData({Detail:b})});

 

  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var app=getApp();
    var id=app.globalData.idon;
   var check= app.globalData.selectList;
   console.log(check);
   for(let i=0;i<check.length;i++)
   {
     if(check[i]==id)
     {console.log('change');
       this.setData({selected:true});break;}
   }
   var pageSlider = this.selectComponent('#pageeSlider');
   
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
  select:function(){
    var id=this.data.Detail._id;
    console.log(id);
    wx.cloud.callFunction({
      // 云函数名称
      name: 'UserSelect',
      // 传给云函数的参数
      data: {
             id:id,
             type:"add"
      },
    })
    this.setData({selected:true});
  },
  unselect:function(){
    var id=this.data.Detail._id;
    console.log(id);
    wx.cloud.callFunction({
      // 云函数名称
      name: 'UserSelect',
      // 传给云函数的参数
      data: {
             id:id,
             type:"remove"
      },
    })
    this.setData({selected:false});
  },
  onchange:function(e)
{
 
  let screenWidth= wx.getSystemInfoSync().windowWidth ;
  console.log(550*screenWidth/750);
  if(e.detail.x>=550*screenWidth/750)
  {
    this.select();
  }
},
})