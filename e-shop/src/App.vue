<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function(){
    return{

    }
  },
  created:function(){

    var isLogined = (this.$cookies.get("token")!='null')?true:false;
    //console.log(typeof(this.$cookies.get("logged_in")));
    //console.log(this.$cookies.get("logged_in"));
    this.$store.commit('update_isLogined',{isLogined:isLogined});
    this.init(isLogined);
    //console.log("in app.vue:"+ this.$store.state.isLogined);
  },
  mounted:function(){
    //console.log(this.$store.state.user);
  },
  beforeDestroy:function(){
    
    
  },

  methods:{
    init:function(isLogined){
      
      if(isLogined)
        this.getUserInfo();

    },
    checkLogined:function(){

    },
    getUserInfo:function(){
         this.http.get(
                this.api.user.getInfo,
                '',
                response=>{
                    if(response.status==200&&response.data.code==200){
                      
                        this.$store.commit("update_userInfo",{user:response.data.data});
                    }
                    //console.log(response.data.data);
                },
                error=>{

                }
            )
    }
  }
}
</script>

<style lang='less'>

head,body{
  height:100%;
  width:100%;
  background-color:@color-gray-background;
 
}
#app {
  //font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
  font-family:  Helvetica, sans-serif,Arial,'Avenir', Verdana;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height:100%;
  
  .van-tabs{
        .van-tab{
        margin-left:5px;
        margin-right:20px;
        }
    }


  
}


  
</style>
