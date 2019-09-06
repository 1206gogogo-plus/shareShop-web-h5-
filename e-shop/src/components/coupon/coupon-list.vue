<template>
    <div class="coupon-list">
        
        <div>
            <v-couponitem v-for="item in couponList" :key="item.couponId" :couponData="item"></v-couponitem>
        </div>
       
        
    </div>
</template>

<script>
import CouponItem from '@/components/coupon/coupon-item'


export default {
    props:{
        couponList:{
            //验证父组件传过来的数据的合法性 是否是Array类型
            type:Array,
            default:function(){
                return [];
            },
        }
    },
    components:{
        'v-couponitem':CouponItem,
       
    },

    data:function(){
        return{
            
        }
    },
    mounted:function(){
        this.init();


    },
    methods:{
        init:function(){
          

        }
    }    

}

</script>

<style lang="less" scoped>
    .coupon-list{
        margin-top:0px;
        padding-top:0px;
    }

</style>
