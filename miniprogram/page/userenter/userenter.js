// miniprogram/page/userenter/userenter.js
var update=require('./../../common/js/update.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Organization:["华南XX大学","XXXX大学","校外组织"],
    Class:["大一","大二","大三","大四","研究生及以上"],
    items: [
      {value: '文体活动', name: '文体活动', checked: 'false'},
      {value: '学科赛事', name: '学科赛事', checked: 'false'},
      {value: '志愿活动', name: '志愿活动', checked: 'false'},
      {value: '招聘实习', name: '招聘实习', checked: 'false'},

    ],
    identity:[
     {value:'user',name:'普通用户',checked:'true'},
     {value:'up',name:'上传者',checked:'false'}
    ],
    identity_page:'user',
    
    indexcl:0,
    indexor:0,
    stateOne:true
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
  selectUser:function()
  {
    this.setData({identity_page:'user',stateOne:false})
  },
  selectUp:function()
  {
    this.setData({identity_page:'up',stateOne:false})
  },
  OrganizationChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOr: e.detail.value
    })
  },
  ClassChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexCl: e.detail.value
    })
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
    });
    
  },
  identityChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({identity_page:e.detail.value});

    const identity = this.data.identity
    for (let i = 0, len = identity.length; i < len; ++i) {
      identity[i].checked = identity[i].value === e.detail.value
    }

    this.setData({
      identity
    })},
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const db = wx.cloud.database({ env: 'hopeless00-cx362' });
    let up=e.detail.value;
    
    db.collection('UserInfo').add({
      // data 字段表示需新增的 JSON 数据
      data: {
          organization:this.data.Organization[up.Organization],
          college:up.college,
          Class:this.data.Class[up.Class],
          love:up.items,
          identity:this.data.identity_page,
          select:[]

      }
    })
    .then(res => {
      console.log(res);
      update.update();
      var toast = this.selectComponent('#toast');
      toast.showModal({title:'提示',content:'提交成功,您已经注册成功',shown:true});
    })
    .catch(console.error)
    
  },

})