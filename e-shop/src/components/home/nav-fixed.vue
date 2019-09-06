<template>
    <div class="nav-fixed g-blue-card">
        <div class="left-button" @click="handleLeftClick">
            <van-icon name="apps-o" color="#fff"></van-icon>
        </div>
        <div class="center">
            <div :class="'name '+ (isScrolled?'scroll-active':'')">ShareShop</div>
            <div :class="'search '+(isScrolled?'scroll-active':'')">
                <search-bar-button class="search-bar"/>
            </div>
        </div>
        <div class="right-button" @click="handleRightClick">
             <van-icon name="user-o" color="#fff"></van-icon>
        </div>
    </div>
</template>

<script>
import searchBarButton from '@/components/home/search-bar-button';


export default {
    props:{
        isScrolled:{
            type:Boolean,
            default:false,
        }
    },
    components:{
        searchBarButton,
    },
    data:function(){
        return{

        }
    },
    methods:{
       handleLeftClick:function(){
           
           this.$emit("leftclick");
       },
        handleRightClick:function(){
           this.$emit("rightclick");
       }
    }
}
</script>

<style lang="less" scoped>
.nav-fixed{
    position: fixed;
    top:0px;
    min-height: 36px;
    width: 100%;
    z-index:1;
    //border:1px solid purple;
    font-size:14px;
    .left-button{
        z-index:2;
        position: absolute;
        font-size: 1.5em;
        top:0px;
        left:15px;
        width:21px;
        height:35px;
        line-height: 35px;
        padding-top:2px;
        // &:before{
        //     content:"\F007";
        //     color: #f4f4f4;
        // }
    
    }
    .right-button{
        z-index:2;
        position: absolute;
        font-size: 1.5em;
        top:0px;
        right:15px;
        width:21px;
        height:35px;
        line-height: 35px;
        padding-top:2px;
    }

    .center{
        color:#f4f4f4;
        //height:35px;
        position: relative; 
        .name{
           
            font-size:16px;
            font-weight: bold;
            height:35px;
            line-height: 35px;
            transition:all .2s linear;
            &.scroll-active{
               
                transform:scale(0);
                transform-origin: center top;
                height:0px;
                font-size:10px;
            }

        }
        .search{
            
          
            height:45px;
            box-sizing: border-box;
            padding-top:6px;
            width:100%;
            //border:1px solid red;
            transition:all .2s linear;
             margin:0 auto;
            &.scroll-active{
                width:70%;
                height:35px;
                
                padding-top:5px;

     
            }
            .search-bar{
                
                width:95%;
                height:26px;
                // border-radius:5px;
                // border:1px solid   @color-gray-shadow;
            }
        }
       


    }


}
</style>
