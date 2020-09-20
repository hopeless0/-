// miniprogram/page/home/home.js
var net=require('./../../common/js/net.js');
var draw=require('./../../common/js/draw.js');
var update=require('../../common/js/update.js');

var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Data:[
      

  ],
  chooseList:['文体活动','学科赛事','志愿活动','招聘实习'],
  index:0,
  continue:true,
  x:0,
  y:0,
  width:300,
  typeChoosed:'',
  today:Date,
  chooseListColor:[]
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
    var a=new Date();
    this.setData({today:a});
    var a= net.getNoteData(0);
    var that=this;
    draw.draw(a,that,'clear');

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    update.update();
     this.setData({x:0,y:0})
     
  
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
  onPageScroll(){
   

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
   console.log('more');
   this.data.index=this.data.index+1;
   var index=this.data.index;
   if(this.data.continue)
  { var a= net.getNoteData(index);
   var that=this;
   draw.draw(a,that);
   }
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
chooseList:function(event)
{
  let index=event.currentTarget.dataset.index;
  let type=this.data.chooseList[index];  //获取传递的信息
  if(this.data.typeChoosed!=type)  //选择某一选项
  {this.data.chooseListColor[index]='brightness(70%)';  //涂黑
    this.setData({chooseListColor:this.data.chooseListColor})    //更新数据
    this.setData({typeChoosed:type})
  var a= net.getNoteDataByChoose(type);
  var that=this;
  draw.draw(a,that,'clear');}
  else{     
    this.data.chooseListColor[index]='brightness(100%)';   //取消选择
    this.setData({chooseListColor:this.data.chooseListColor}) 
    this.setData({typeChoosed:''})
    var a= net.getNoteData(0);
    var that=this;
    draw.draw(a,that,'clear'); 
    
    }
},
test:function(){
  var toast = this.selectComponent('#toast');
  //toast.showModal({title:'提示',content:'提交成功,您已经注册成功',shown:true});
  wx.loadFontFace({
    global:true,
    family: 'xinWei',
    source: 'url("https://github.com/Ice-Times/Android-ttf-download/blob/master/%E5%AD%97%E4%BD%93/%E5%8D%8E%E6%96%87%E6%96%B0%E9%AD%8F.TTF")',
    success: console.log
  })
},
onchange:function(e)
{
  
  let screenWidth= wx.getSystemInfoSync().windowWidth ;  //获取屏幕宽度
  console.log(550*screenWidth/750);
  if(e.detail.x>=550*screenWidth/750)  //换算
  {
    wx.navigateTo({
      url: '../../page/me/me',  //导航
    })
  }
}
})