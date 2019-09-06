<template>
    <div class="search-bar-button g-gray-card"  @click="goToSearchPanel">
        <div class="center">
            <van-icon name="search"/>
            <span class="label">Please input the keyword</span>
        </div>
    </div>    
</template>

<script>
export default {
    data:function(){
        return{

        }
    },
    methods:{
         goToSearchPanel:function(){
            this.$router.push({path:'/search'});
        }
    }
}
</script>

<style lang="less" scoped>

@height:25px;
.search-bar-button{
    width:100%;
    margin:0 auto;
    height:28px;
   
    .center{
        height:@height;;
      
        min-width:50%;
        margin:0 auto;
        text-align: center;
       
        .van-icon{
            font-size:14px;
            color:#000;
           height:@height;
           line-height: @height;
           box-sizing: border-box;
           
        }
        .label{
            vertical-align: top;
            height:@height;
            box-sizing: border-box;
            line-height: @height;
            display: inline-block;
            padding-left:5px;
            color:@color-gray-font;
        }
    }
}
</style>
