

const global_val={
    token:"token",


}


const global={
    path_style:"@/assets/style/",
    path_js:"@/assets/js/",


    countDownOption:function(val){
        val.status=true;
      
        var interval = setInterval(function(){
           //console.log("interval:"+val.seconds);
            if(val.seconds>0&&val.status){
                val.seconds--;
            } 
            else{
                val.status=false;
                val.seconds=val.totalSeconds;
                clearInterval(interval);
            }
        },1000);


    },

    goToProductDetailPage:function(router,productId){
        router.push({
            path:'product/'+productId,
        })

    },

    //set token
    setToken:function(){
        
    }


};



export default global;