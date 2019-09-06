
<template>
    <div class="hot-sale-page">
        <div class="header">
            <div class="left" @click="goBack">
                <van-icon name="arrow-left"/>
                <span class="label">back</span>
            </div>
            <div class="center">Hot Sales</div>
            <div class="right"></div>
            
        </div>
        <div class="main">
             <div class="product-list ">
                 <slot name="main"></slot>
                 <product-list :productList="productList"></product-list>
            </div>
        </div>


       
    </div> 
</template>

<script>
import ProductList from '@/components/product/product-list';

export default {
    components:{
        ProductList,
    },
    data(){
        return{
            
        }
    },
    mounted:function(){
        

    },
    methods:{
        goBack:function(){
            this.$router.back(-1);
        },
      
    }
    
}
</script>

<style lang="less" scoped>

@header-height:50px;
@normal-width:96%;
@normal-radius:15px;
.hot-sale-page{
    .header{
        background:@color-blue;
        height:@header-height;
        position:fixed;
        top:0;
        width:100%;
        color:#fff;
        
        line-height: @header-height - 20px;
        
        margin-bottom:10px;
        display: flex;
        .left{
            width:70px;
            display: flex;
            justify-content: center;
            align-items: center;
            //padding-bottom:20px;
            .van-icon{

            }
            .label{

            }
        }
        .center{
            flex-grow: 1;
            text-align:center;
            margin-right:(100% - @normal-width) / 2;
            font-size:20px;
            font-weight:bold;
            line-height:@header-height;
            letter-spacing: 0.4px;
            //padding-bottom:20px;
        }
        .right{
            width:70px;
        }
    }

    .main{
        margin-top:@header-height;
        padding-top:10px;

        .product-list{
            //.g-card-shadow();
            width:@normal-width;
            min-height: 100px;
            margin:0 auto;
            //border-radius:@normal-radius;
            //border:1px solid red;
        }
    }
   

}
</style>
