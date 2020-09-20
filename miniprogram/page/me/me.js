// miniprogram/page/me/me.js
var net=require('./../../common/js/net.js');
var draw=require('./../../common/js/draw.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    selectList:[],
    Data:[],
    identity:'',
    enterRegister:false,
    today:Date,
    shownType:true,
    college:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let a=new Date();
    this.setData({today:a});

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserSelect();
    var app=getApp();
    var identity=app.globalData.identity;
    console.log(app.globalData);
    this.setData({college:app.globalData.user.organization});
    if(identity=='user')
    {this.setData({identity:'正常用户'});
    this.setData({enterRegister:false});}
    else{if(identity=='up')
    {
      this.setData({identity:'信息发布者'});
      this.setData({enterRegister:false});
    }
    else
    {
    wx.navigateTo({
      url: '../userenter/userenter',
    })
    this.setData({identity:'未注册，先注册'})
   
    this.setData({enterRegister:true})};}

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
  nextone:function(event)
  {
    var app=getApp();
  
    app.globalData.idon=event.currentTarget.dataset.index;
    console.log(app.globalData.idon);
    
  },
  onGotUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo,
      
    })
    console.log("userInfo", this.data.userInfo)
  },
  getUserSelect:function()
  {
    var that=this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getUserSelect',
      // 传给云函数的参数
      data: {

      },
    })
    .then(res => {
      console.log(res.result);
      console.log(res.result.data[0].select) ;
     this.setData({selectList:res.result.data[0].select});
     that.updateData();
    })
    .catch(console.log('what use'))
    


  },
  updateData:function()
  {
    console.log(this.data.selectList);
    var a=net.getNoteDataByList(this.data.selectList);
    var n=net.getNoteData();
    var that=this;
   draw.draw(a,that,'clear');
   console.log(this.data.Data);
   
  

},
shownTypeChange:function()
{
  let newType=!this.data.shownType;
  this.setData({shownType:newType});
}
})