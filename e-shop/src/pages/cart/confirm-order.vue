<template>
    <div class="confirm-order">
        <div class="top g-gray-card">
            <span class="back-button" @click="goBack">
                <van-icon class="back-icon" name="arrow-left"/>
                <span class="tips">Confirm Order</span>
            </span>
            
        </div>
        <div class="address g-white-card g-card-shadow-gray" @click="showSelectedAddressPanel">
           <div class="left">
               <van-icon name="location"></van-icon>
           </div>
           <div class="center main-area">
                <div class="user-info">
                    <span class="name">David</span>
                    <span class="phone-number">18688888888</span>
                </div>
                <div class="location">
                    湖北省武汉市洪山区珞南街道武汉理工大学鉴湖校区
                </div>


           </div>
           <div class="right icon-button">
               <van-icon name="arrow"></van-icon>
           </div>
        </div>

        <div class="products-info-list">
            <div class="products-coll-store  g-white-card  g-card-shadow-gray" v-for="shopItem in productData"  :key="shopItem.storeId">
                <div class="shop-name">
                    <span>
                        <van-icon name="shop" color="#e33a65"></van-icon>
                    </span>
                    <span>{{shopItem.storeName}}</span>
                </div>
                <div class="products-list">
                    <div class="product-item" v-for="productItem in shopItem.productList" :key="productItem.productId">
                        <img class="thumb" :src="productItem.thumb" alt="">
                        <div class="info">
                            <div class="name">{{productItem.name}}</div>
                            <div class="sku-name">{{productItem.sku.name}}</div>
                        </div>
                        <div class="count">
                            <div class="price">${{productItem.price}}</div>
                            <div class="num">x{{productItem.num}}</div>
                        </div>
                        
                    </div>
                </div>
                <div class="sub-info">
                    
                    <div class="commodity-amount cell">
                         <van-cell title="Commodity Amount" value="$40.00" size="mini" />
                    </div>
                    <div class="freight cell">
                         <van-cell title="Freight" value="$2.00" size="mini" />
                    </div>

                </div>
            </div>

        </div>

        <div class="payment-method g-card-shadow-gray g-white-card g-hide">
           <div class="label">Payment Method</div>
           <van-radio-group>
               <van-radio name=""></van-radio>
           </van-radio-group>

            

        </div>

        <van-submit-bar
            :price="8400"
            button-text="Submit Order"
            currency="$" />

        <selected-address-panel v-model="visible.selectAddressPanel"></selected-address-panel>

    </div>
</template>
<script>
import selectedAddressPanel from '@/components/cart/selected-address-panel';

export default {
    components:{
        selectedAddressPanel,
    },
    data(){
        return{
            visible:{
                selectAddressPanel:false,
            },
            paymentMethod:'',
            productData:[
                {
                    storeName:"Share Shop",
                    storeId:1,
                    productList:[
                        {   
                            productId:1,
                            thumb:"https://www.uniqlo.cn/hmall/test/u0000000005173/main/first/1000/1.jpg",
                            price:20.0,
                            sku:{
                                id:2,
                                name:"白色",
                            },
                            num:1,
                            name:"【设计师合作款】女装  双面针织大衣  416550",
                        },
                        {   
                            productId:2,
                            thumb:"https://www.uniqlo.cn/hmall/test/u0000000005373/main/first/1000/1.jpg",
                            price:20.0,
                            sku:{
                                id:2,
                                name:"白色",
                            },
                            num:1,
                            name:"【设计师合作款】女装  双面针织大衣  416550",
                        },
                    ]
                },
                {
                    storeName:"Share Shop",
                    storeId:2,
                    productList:[
                        {   
                            productId:3,
                            thumb:"https://www.uniqlo.cn/hmall/test/u0000000005523/main/first/1000/1.jpg",
                            price:20.0,
                            sku:{
                                id:2,
                                name:"白色",
                            },
                            num:1,
                            name:"【设计师合作款】女装  双面针织大衣  416550",
                        },
                        {   
                            productId:4,
                            thumb:"https://www.uniqlo.cn/hmall/test/u0000000005571/main/first/1000/1.jpg",
                            price:20.0,
                            sku:{
                                id:2,
                                name:"白色",
                            },
                            num:1,
                            name:"【设计师合作款】女装  双面针织大衣  416550",
                        },
                    ]
                },

            ]
        }
    },

    methods:{
        //go back one step, normal situation is going back to cart page
        goBack:function(){
            this.$router.back(1);
        },
        showSelectedAddressPanel:function(){
            this.visible.selectAddressPanel=true;
        }
    }
}
</script>

<style lang="less" scoped>

      @panel-width:95%;


    .confirm-order{
        padding-bottom:60px;
        .top{
            position: fixed;
            z-index: 3;
            top:0px;
            width:100%;
           
            box-sizing: border-box;
            padding-left:5px;
            height:40px;
            line-height: 40px;
            font-size:16px;
            text-align: left;
            .back-button{
                display:flex;
                align-items: center;
                height:100%;
                .van-icon{
                font-size:18px;
                }
                .tips{
                    margin-left:5px;
                }
            }
            
        }


        .address{
           
            min-height:60px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
           
            width:@panel-width;
            margin:0 auto;
            padding:4px;
            padding-bottom:8px;
            border-radius:8px;
            margin-top:@panel-with-nav-bar-mgt + 5px;
           
            .left{
                width:20px;
                height:100%;
               
                //line-height:@address-panel-height;
                line-height:1;
                color:@color-red-font;
            }
            .center{
                flex-grow:1;
                height:100%;
                //line-height:@address-panel-height;
                text-align: left;
                padding-left:8px;
                .user-info{
                   // height:@address-panel-height * 1/3;
                    //line-height: @address-panel-height * 1/3;
                    .name{
                        font-size:14px;
                    }
                    .phone-number{
                        font-size:14px;
                        color:@color-gray-font;
                    }
                }
                .location{
                    font-size:13px;
                   // height:@address-panel-height * 2/3;
                   // line-height: @address-panel-height * 2/3/3;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    
                }
               
            }
            .right{
                width:20px;
                height:100%;
                color:@color-gray-font;
                //line-height:@address-panel-height;
            }
        }

        .products-info-list{
            margin-top:15px;
            box-sizing: border-box;
            min-height:100px;
            width:@panel-width;
            margin:0 auto;
           
            //padding:5px;
            font-size:14px;

            .products-coll-store{
                width:100%;
                margin-top:15px;
                padding-bottom:8px;
                border-radius:8px;
                .shop-name{
                    font-size: 14px;
                    padding-left:10px;
                    padding-top:5px;
                    text-align: left;
                }

                .products-list{
                    margin-top:5px;
                    padding-bottom:10px;
                     border-bottom:1px dashed @color-lightgray-border;
                    //border:1px solid red;
                    .product-item{
                        min-height:70px;
                        padding-left:10px;
                        margin-top:6px;
                        display: flex;
                        align-items: flex-start;
                        .thumb{
                            width:60px;
                            margin-top:5px;
                            
                        }
                        .info{
                            align-self:flex-start;
                            flex-grow: 1;
                            font-size:13px;
                            text-align: left;
                            padding:2px 5px;
                            .name{
                                margin-bottom:3px;
                            }
                            .sku-name{
                                color:@color-gray-font;
                            }
                        }
                        .count{
                            font-size:14px;
                            align-self: flex-start;
                            margin-top:2px;
                            padding-right:3px;
                            width: 80px;
                            
                            .price{
                                margin-bottom:5px;
                                 
                            }
                            .num{
                                color:@color-gray-font;
                            }
                        }

                    }

                     
                }

                .sub-info{
                    .cell{
                        margin-top:3px;
                        .van-cell{
                            padding:0px;
                            font-size:14px;
                            .van-cell__title{
                                text-align: left;
                                padding-left:10px;
                                color:#000;
                            }
                            .van-cell__value{
                                padding-right:10px;
                                color:@color-red-font;
                            }
                        }
                    }

                }

            }
        }

        .payment-method{
            width:@panel-width;
            margin:0 auto;
            margin-top:15px;
            border-radius:8px;
            box-sizing: border-box;
           // 
            .label{
                height:20px;
                line-height: 20px;
                font-size:14px;
                text-align: left;
                color:@color-gray-font;
                padding-left:10px;
                border-bottom:1px dashed @color-lightgray-border; 
            }
            
        }


        .van-submit-bar{
            .van-submit-bar__bar{
                height:40px;

                .van-submit-bar__text{
                    text-align: left;
                    padding-left:10px;
                    font-size: 14px;
                    .van-submit-bar__price{
                        font-size:18px;
                    }
                }

                .van-button{
                    height:40px;
                    border:0;
                    line-height:40px;
                    font-size:16px;
                }
                
            }
            
        }
      
    }


</style>
