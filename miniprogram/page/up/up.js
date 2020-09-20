// miniprogram/page/up/up.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datestart:'2020-09-01',
    dateend:'2020-09-01',
    type: ['文体活动', '学科赛事', '志愿活动', '招聘实习'],
    index:0,
    fileID_pic:"",
    fileID_QR:"",
    fileID_QR2:"",
    fileID_QR3:"",
    canSubmit:true,
    picTextHidden:true,
    QRTextHidden:true,
    inputPersonal:'',
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
    var app=getApp();
    var a=app.globalData.identity;
    if(a!='up')
    {
      var toast = this.selectComponent('#toast');
      toast.showModal({title:'提示',content:'您还不具有上传权限，请先注册为上传者',shown:true});
      this.setData({canSubmit:false});
    }
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange_start: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      datestart: e.detail.value
    })
  },
  bindDateChange_end: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateend: e.detail.value
    })
  },
  formSubmit(e) {
    console.log('form发生了事件，携带数据为：', e.detail.value);
    const db = wx.cloud.database({ env: 'hopeless00-cx362' });
    let up=e.detail.value;
    console.log(this.data.type[up.type]);
    db.collection('NoteDate').add({        //小程序端完成上传操作
      // data 字段表示需新增的 JSON 数据
      data: {
        Issuing: up.Issuing,
        content:up.content,
        title:up.title,
        shown:false,
        type:this.data.type[up.type],
        datestart:new Date(up.datestart),
        dateend:new Date(up.dateend),
        fileID:this.data.fileID_pic,
        fileID_QR:this.data.fileID_QR,
        fileID_QR2:this.data.fileID_QR2,
        fileID_QR3:this.data.fileID_QR3,
        inputPersonal:this.data.inputPersonal
      }
    })
    .then(res => {
      console.log(res);
      var id=res._id;
      console.log(id);
      wx.cloud.callFunction({   //调用云函数更新用户数据
        // 云函数名称
        name: 'UserSelect',
        // 传给云函数的参数
        data: {
               id:id,
               type:"add"
        },
      })
      this.setData({selected:true});
    
      var toast = this.selectComponent('#toast');    //调用组件显示提示框
      toast.showModal({title:'提示',content:'提交成功，请等待审核',shown:true});
    })
    .catch(
     
    )


  },
  showMask:function()
  {
    this.setData({QRTextHidden:false})
  },
  closeMask:function()
  {
    this.setData({QRTextHidden:true})
  },
  inputPersonal:function(e)
  {console.log(e.detail)
   this.setData({inputPersonal:e.detail.value});

  },
  upl:function(event)
{
 
  var num = Math.floor(Math.random() * 10000 + 1).toString();
  var d = new Date().getTime.toString();
  var front=num+d;
  let index=event.currentTarget.dataset.index;

  wx.chooseImage({
    success: chooseResult => {
      // 将图片上传至云存储空间
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        
        cloudPath: num+'my-photo.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: chooseResult.tempFilePaths[0],
        // 成功回调
        success: res => {
          console.log('上传成功', res);
          if(index=='pic')
          {this.setData({fileID_pic:res.fileID});
          this.setData({picTextHidden:false});}
          if(index=="QR")
          {this.setData({fileID_QR:res.fileID});
          this.setData({QRTextHidden:false});}
          if(index=="QR2")
          {
          this.setData({fileID_QR2:res.fileID});
          this.setData({QRTextHidden:false});}
          if(index=="QR3")
          {
          this.setData({fileID_QR3:res.fileID});
          this.setData({QRTextHidden:false});}
          console.log(this.data.fileID_pic);
        },
      })
      wx.cloud.getTempFileURL({
        
        fileList: ["cloud://hopeless00-cx362.686f-hopeless00-cx362-1301226357/my-photo.png"],
        success: res => {
          // fileList 是一个有如下结构的对象数组
          // [{
          //    fileID: 'cloud://xxx.png', // 文件 ID
          //    tempFileURL: '', // 临时文件网络链接
          //    maxAge: 120 * 60 * 1000, // 有效期
          // }]
          console.log(res.fileList.tempFileURL);
          this.setData({imageURL:res.fileList.tempFileURL});
        },
        fail: console.error
      })

    },
  })

}
})