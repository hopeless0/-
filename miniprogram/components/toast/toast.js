Component({
  properties:{
    content:{
      type:String,
      value:'content is here'
    },
    title:{
      type:String,
      value:'title is here'
    },
    shown:{
      type:Boolean,
      value:false
    }
  },
  data:{},
  methods:{
    close(){
      this.setData({shown:false});
    },
    showModal({title,content,shown})
    {
      console.log('start');
      if(title) {this.setData({title:title})};
      if(content) {this.setData({content:content})};
      if(shown) {this.setData({shown:shown})};
    },
    returnHome(){
      wx.navigateTo({
        url: '../../page/home/home',
      })
    }
  }
})