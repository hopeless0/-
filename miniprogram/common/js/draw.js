function draw(a,that,option)
{a.then(function(data){
  var b=data.data;
  
  var today=new Date();
  for(let i=0;i<b.length;i++)
  {  
    if(b[i].dateend<today)
    {b[i].overdue=true;
    }
    else{b[i].overdue=false;
      if((b[i].dateend>today)&&(b[i].datestart<today))
    {b[i].ongoing=true;}
   else{ 
     
     if(b[i].datestart.getTime()-today.getTime()<259200000

    )
    {b[i].comingSoon=true;}}}
    b[i].datestart=b[i].datestart.toLocaleDateString();
    b[i].dateend=b[i].dateend.toLocaleDateString();
    if(b.length==0)
    {that.data.continue=false};
    
  }
  let oldData=that.data.Data;
 if(option=='clear')
 {console.log('clear oldData');
   oldData=[]}
 var newData=oldData.concat(b);
that.setData({Data:newData})});}
module.exports.draw=draw;