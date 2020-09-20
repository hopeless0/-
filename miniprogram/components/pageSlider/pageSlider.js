// components/pageSlider/pageSlider.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    startX:0,
    endX:0,
    position:'',
    move:true
  },

  /**
   * 组件的方法列表
   */
  methods: {

    touchStart: function (e) {
      this.data.startX = e.touches[0].pageX; 
      this.data.move= true;
  },
    touchMove: function (e) {   //判定左右滑
    this.data.endX = e.touches[0].pageX; 
    if (this.data.move) {
      if (this.data.endX - this.data.startX > 50) {
       this.data.position='left'; this.reflesh();
        this.data.move = false;
      }
      if (this.data.startX - this.data.endX > 50) {
       
        this.data.position='right'; this.reflesh();
        this.data.move = false;
      }
    }},
    touchEnd: function (e) {
      this.data.move = true; // 回复滑动事件
      },
      reflesh:function(){   //根据左右滑刷新页面
        var app=getApp();
        let id=app.globalData.idon;
        let data=getCurrentPages()[0].data.Data;
        console.log(id);
        console.log(data);
       const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
       let num = data.findIndex((item, index) => {
      return item._id==id;
       })
       if((num+1<data.length)&&(this.data.position=='right'))
       {
         app.globalData.idon=data[num+1]._id;
              perpage.onLoad() 
        }
      if((num>0)&&(this.data.position=='left'))
      {
        app.globalData.idon=data[num-1]._id;
              perpage.onLoad() 
        }

      }

  }

})
