<template>
    <div class="main">
        <van-button type="default"  v-bind:class="{container1:flag,container2:!flag}" @click="clickOrNot(tag)" >{{tag}}</van-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            flag:false,
            sel:'',     //不应该写这里，这是一个按钮！两个按钮的话会有两个sel，我们要的是总共就一个sel
            msg:'hello'
        }
    },
    props:['tag'],
    methods:{
        clickOrNot(val){
            this.flag=!this.flag;
            //console.log(this.flag);
            //alert(val);
            if(this.flag==true){
                this.sel= val;

            }
            //console.log(this.sel);
            
        }
    },
    mounted(){
        this.flag=false;
    }
}
</script>

<style lang="less" scoped>
.main{
    border-radius: 4px;
    text-align: center;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right:10px;
    margin-top:10px;
    float: left;
    .container1 {
        background-color: red;
    }
    .container2 {
        background-color:white;
    }
}


</style>


