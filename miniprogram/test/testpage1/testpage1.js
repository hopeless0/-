async function getDataById() {
  const db = wx.cloud.database({ env: 'hopeless00-cx362' });
  
  await db.collection('NoteDate').where({
    _id: '1' // 
  }).get().then(res => {
    console.log(res.data);
    return res.data;
    
  });
  

}
function showLoading () {
  return new Promise((resolve )=> {

    const db = wx.cloud.database({ env: 'hopeless00-cx362' });
  
    db.collection("NoteDate").doc("1")
      .get({
        success(res) {
          // res.data 是包含以上定义的两条记录的数组

          resolve(res);


        }
      })
  })}

var net=require('./../../common/js/net.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"初始内容",
    date: '2016-09-01',
    list:{
      Data:[
      
      {content:"初始内容",title:"ds",time:"sd"},
      {content:"初始内容",title:"ds",time:"sd"},]
    },
      Data:[
      
        {content:"初始内容",title:"ds",time:"sd"},
      {content:"初始内容",title:"ds",time:"sd"},
    ],
    fileID:"",
    imageURL:""

     
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var a= net.getNoteData();
    var that=this;
    console.log(a);
    a.then(function(data){
      var b=data.data;
      console.log(b);
      for(let i=0;i<b.length;i++)
      {
        b[i].datestart=b[i].datestart.toLocaleString();
      b[i].dateend=b[i].dateend.toLocaleString();
      }
      console.log(b);
    that.setData({Data:b})});

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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  
  testfunction:function(){
    this.setData({content:"新内容"});
    const db = wx.cloud.database({ env: 'hopeless00-cx362' });
    
    db.collection('NoteDate').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        Issuing:"fabu",
        content:"asas",
        title:"ddsds",
        shown:true,
        type:"文体活动",
        datestart:new Date('2020.3.3'),
        dateend:new Date('2020.3.4')
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(console.error)
    

  

},

nextone:function(event)
{
  var app=getApp();

  app.globalData.idon=event.currentTarget.dataset.index;
  console.log(app.globalData.idon);
  
},
formSubmit(e) {
  console.log('form发生了submit事件，携带数据为：', e.detail.value)
  const db = wx.cloud.database({ env: 'hopeless00-cx362' });
    
    db.collection('NoteDate').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        Issuing: e.detail.value.input,
        content:"asas",
        title:"ddsds",
        shown:true,
        type:"文体活动",
        datestart:new Date(e.detail.value.picker),
        dateend:new Date('2020.3.4')
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(console.error)
},

formReset(e) {
  console.log('form发生了reset事件，携带数据为：', e.detail.value)
  this.setData({
    chosen: ''
  })
},
upl:function()
{
  wx.chooseImage({
    success: chooseResult => {
      // 将图片上传至云存储空间
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: 'my-photo.png',
        // 指定要上传的文件的小程序临时文件路径
        filePath: chooseResult.tempFilePaths[0],
        // 成功回调
        success: res => {
          console.log('上传成功', res);
          this.setData({fileID:res.fileID});
          console.log(this.data.fileID);
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