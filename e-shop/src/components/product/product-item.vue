<template>
   <div v-if="productData!=null">
        <div class="product-item g-white-card g-card-shadow-gray"   @click="goToProductItem">
            <div class="left-product-img">
                <img :src="productData.mainImage" alt="">
            </div>
            <div class="right-product-info">
                <div class="title">{{productData.productName}}</div>
                <div class="description">{{productData.description}}</div>
                <div class="tag-list">
                    <van-tag plain type="danger"></van-tag>
                    <van-tag plain type="danger"></van-tag>
                    <!-- <van-tag plain type="danger">another tag and class</van-tag> -->
                </div>
                <div class="bot-fun-panel">
                    <div class="price">
                        <span class="price-code">$</span>
                        <span class="price-value">{{productData.minPrice}}</span>
                    </div>
                    <div class="buy">
                        <van-button size="mini" type="danger">Buy Now</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        productData:{
            type:Object,
            default:null
        }
    },
    data:function(){
        return{
            
        }
    },
    methods:{
        goToProductItem:function(){
            //console.log(this.productData.productId);
            this.$router.push({name:'product',params:{id:this.productData.productId}});
        }
    }
}
</script>

<style lang="less" scoped>
    .product-item{
        box-sizing: border-box;
        height:@height-product-item;
        margin-top:5px;
        
        //background-color:#aaa;

        .left-product-img{
           // background-color:#acdedd;
            margin-top:4px;
            margin-left:4px;
            float:left;
            height:@height-product-item - 8px;
            width:@height-product-item - 8px;

            img{
                width:100%;
                background:url(@placeholder-img-base64) center no-repeat;
            }
        }
        .right-product-info{
            position: relative;
            height:@height-product-item+10px;
            margin-left:@height-product-item + 4px;
            //background-color :white;
            text-align: left;
            padding:0 5px;

           

            .title{
                //max-height:@height-product-item /8 *2.5;
                width:100%;
                //background-color:yellow;
                font-size:14px;
                overflow: hidden;
                   text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient:vertical;
                padding-top:3px;
            }
            .description{
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:3;
                -webkit-box-orient:vertical;

                width:100%;
                font-size:12px;
                color:#999;
                max-height:@height-product-item / 8 * 3;
                padding-top:0px;
            }
            .tag-list{
                display: none; 
                max-height:@height-product-item / 8 * 1;
                //line-height: @height-product-item / 8 * 1.5;
               // overflow: hidden;
                padding:1px 0px;
                //background-color:darksalmon;
                .van-tag{
                    padding: .02em .4em;
                }
            }
            .bot-fun-panel{
                //height:@height-product-item / 8 *1.5+5px;
                padding-top: 5px;
                position: absolute;
                bottom:10px;
                width:95%;
                .price{
                    font-size:0px;
                    float:left;
                    height:100%;
                    line-height: @height-product-item / 8 *1.5;
                    .price-code{
                        font-size:14px;
                    }
                    .price-value{
                        font-size:14px;
                        //font-weight:bold;
                    }

                }
                .buy{
                    float:right;

                    .van-button{
                        //font-size:14px;
                        width:70px;
                        padding:0 2px;
                        //height:@height-product-item / 8 *1.5;
                    }
                    
                }
            }

        }
    }
</style>
