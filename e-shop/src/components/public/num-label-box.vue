<template>
    <div class="num-label-box">
        <div class="count">{{num}}</div>
        <div class="label">{{label}}</div>
    </div>
</template>
<script>
export default {
    props:{
        num:{
            type:Number,
            default:0
        },
        label:{
            type:String,
            default:'label'
        }
    },
    data:function(){
        return{

        }
    },

}
</script>

<style lang="less" scoped>
.num-label-box{
    display:flex;
    flex-direction: column;
    justify-content: center;
    .count{
        font-size:16px;
    }
    .label{
        margin-top:3px;
        font-size:14px;
        opacity: 0.8;
        letter-spacing: 0.3px;
    }
}
</style>
