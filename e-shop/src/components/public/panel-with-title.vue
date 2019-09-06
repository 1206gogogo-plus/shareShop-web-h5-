<template>
    <div class="panel-with-title">
        <div :class="(boldTitle?'bold ':'') + 'title'">{{title}}</div>
        <div class="main">
            <slot name="main"></slot>
        </div>
    </div>


</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'',
        },
        boldTitle:{
            type:Boolean,
            default:false,
        }
    },
    data:function(){
        return{}
    }
}
</script>

<style lang="less" scoped>
.panel-with-title{
    margin-top:10px;  
    .title{
        position: relative;
        font-size:16px;
        height:20px;
        line-height: 20px;
        text-align: left;
        padding-left:15px; 
        
        &:before{
            content: '';
            position: absolute;
            top:1px;
            left:5px;
            height:18px;
            width:4px;
            border-radius: 4px;
            //box-shadow: 0 0 2px 1px @color-gray-shadow;
            background: @color-blue-background;
        }
    }
     .bold{
          font-weight: bold;
     }
    .main{
        min-height:40px;
        padding-bottom:6px;
    }
}
</style>
