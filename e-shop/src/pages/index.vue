<template>
    <div class="index">
        <div class="g-panel-with-bottom-nav">
            <router-view></router-view>
        </div>
        <van-tabbar v-model="currentTab">
            <van-tabbar-item icon="wap-home" to="/home">Home</van-tabbar-item>
            <!-- 我就为了把两个图标从实底改成空心底，折腾了两小时！！！！
            在icon后加-o就行
             -->
            <van-tabbar-item icon="shopping-cart-o"  to="/cart">Cart</van-tabbar-item>
            <van-tabbar-item icon="manager-o" to="/mine">Mine</van-tabbar-item>
        </van-tabbar>

    </div>  
</template>

<script>

export default {

    data:function(){
        return{
            currentTab:0,
            
        }
    },
    mounted:function(){
        var path=this.$route.path;
        //随着路由的变化更新tab状态
        this.adjustTabStatusWithPath(path);

    },
    methods:{

        adjustTabStatusWithPath:function(val){
            switch(val){
                case '/home':this.currentTab=0;break;
                case '/cart':this.currentTab=1;break;
                case '/mine':this.currentTab=2;break;
                default:;
            }
        }

       
    },
    computed:{
        cart_num:function(){

            return this.$store.state.num_productsInCart;

        }

    },

    watch:{
        '$route.path':function(val){
            //随着路由的变化更新tab状态
           this.adjustTabStatusWithPath(val);
           
        }
    },
    



}
</script>
<style lang="less" scoped>
 
.index{
    height:100%;
}


</style>
