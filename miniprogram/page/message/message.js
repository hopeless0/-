// miniprogram/page/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  cooperation:true,
  idea:true
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
  deleteIdea:function()
  {
    this.setData({idea:false});
  },
  deleteCooperation:function()
  {
    this.setData({cooperation:false});
  },
  formSubmit(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value);
    const db = wx.cloud.database({ env: 'hopeless00-cx362' });
    let up=e.detail.value;
    db.collection('message').add({
      
      data: {
        cooperation:up.cooperation,
       idea:up.idea
       }
    })
    .then(res => {
      console.log(res);
      var toast = this.selectComponent('#toast');
      toast.showModal({title:'提示',content:'提交成功',shown:true});
    })
    .catch(
     
    )


  },
})