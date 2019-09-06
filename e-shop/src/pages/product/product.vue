<template>
    <div class="product-page">
        <div class="back-button icon-button" @click="goBack">
            <van-icon name="arrow-left"></van-icon>
        </div>
        <div class="share-button icon-button" @click="share">
            <van-icon name="share"></van-icon>
        </div>
        <van-swipe :autoplay="3000" class="g-white-card">
            <van-swipe-item v-for="(item,index) in tepimgUrl" :key="index" @click="previewImage(index)">
                <img :src="item">
            </van-swipe-item>
            
        </van-swipe>

        <div class="product-info g-white-card">
            <div class="title">
                <van-tag  color="#7232dd">{{productData.brandName}}</van-tag>{{productData.productName}}
            </div>
            <div class="description">
                {{productData.description}}
            </div>
            <div class="price">
                <span class="price-area">
                    <div class="org-price" v-if="flag">
                        <span class="price-code">$</span>
                        <span class="price-value">{{productData.minPrice}}-</span>
                        <span class="price-value">{{productData.maxPrice}}</span>
                    </div>
                    <div class="org-price" v-if="!flag">
                        <span class="price-code">$</span>
                        <span class="price-value">{{productData.minPrice}}</span>
                    </div>
                    <div class="vip-price" v-if="flag">
                        <span class="price-code">$</span>
                        <span class="price-value">{{productData.minPriceVip}}-</span>
                        <span class="price-value">{{productData.maxPriceVip}}</span>
                    </div>
                    <div class="vip-price" v-if="!flag">
                        <span class="price-code">$</span>
                        <span class="price-value">{{productData.minPriceVip}}</span>
                    </div>
                </span>
                <span class="rate">
                    <span class="rate-num">{{parseFloat(productData.score).toFixed(1)}}</span>
                    <van-rate  readonly v-model="productData.score" :size="14" allow-half color="#000"  void-color="#000" />
                </span>
            </div>
            

            <div class="note">
                支持30天无理由退货
            </div>
        </div>

        <van-cell @click="showProductSku" class="product-selected-bar" :title="skuTips" is-link/>
        
        <van-tabs class="product-detail-info"  v-model="actionfunctionPanel" swipeable sticky>
            <van-tab title="Goods Detail">
                <div v-html="productData.html"></div>
            </van-tab>
            <van-tab title="Customer reviews">
              
            </van-tab>
        </van-tabs>

        


        <van-goods-action>
            <van-goods-action-mini-btn @click="goToCart" class="mini-button" icon="shopping-cart-o" text="Cart" />
             <van-goods-action-mini-btn @click="collect" class="mini-button" :icon="isCollected?'like':'like-o'" text="Like" />
            <van-goods-action-big-btn  @click="addToCart" class="add-button"   text="Add to Cart"/>
            <van-goods-action-big-btn class="buy-button" type="danger" text="Buy It Now" />
        </van-goods-action>

        <product-sku v-model="visibility.sku"></product-sku>        



    </div>    
</template>

<script>
import productSku from '@/components/product/product-sku'
import { ImagePreview } from 'vant';

export default {
    components:{
        productSku,
    },
    data:function(){
        return{
            actionfunctionPanel:'0',
            productData:{},
            tepimgUrl:[
                //"http://47.100.42.218:81/img/1.png",   //防止某商品无图片时使用
                // "https://www.uniqlo.cn/hmall/test/u0000000005573/main/other1/1000/2.jpg",
                // "https://www.uniqlo.cn/hmall/test/u0000000005573/main/other2/1000/3.jpg",
                // "https://www.uniqlo.cn/hmall/test/u0000000005573/main/other3/1000/4.jpg"
            ],
            visibility:{
                sku:false,
            },
            isCollected:false,
            flag:true,
            minPrice:'',
            maxPrice:'',
        }
    },
    computed:{
        skuTips:function(){
            var str='Please select ';
            // for(var i in JSON.parse(this.productData.attributeList)){
            //     if(this.productData.attributeList.hasOwnProperty(i))
            //         str=str+i+' ';
            // }
            // var tep=this.productData.attributeList.split("");
            // tep.splice(0,1,"'");
            // tep.splice(tep.length-1,1,"'");
            
            // var attributeList=JSON.parse(tep.join(''));
            var attributeList=JSON.parse(this.productData.attributeList||'[]');
            //console.log(this.productData.attributeList);
            //console.log(attributeList);
            for(var i=0;i<attributeList.length;i++){
                str+=" ";
                str+=attributeList[i].attributeKey;
            }

            return str;
        },
       
    },
    mounted:function(){
        this.init();
        this.initCollect();
        this.getPicList();
    },
    methods:{
        init:function(){
            //console.log(this.$route.params.id);
            var _this=this;
            var params={
                id:this.$route.params.id,
            };

            this.http.get(
                this.api.product.getDetailById,
                params,
                response=>{
                    if(response.data.code==200){
                          this.tepimgUrl[0] = response.data.data.mainImage;
                          this.productData=response.data.data;
                          this.minPrice=response.data.data.minPrice;
                          this.maxPrice=response.data.data.maxPrice;
                          //console.log(this.minPrice);
                          //console.log(this.maxPrice);
                          
                          if(this.minPrice == this.maxPrice){
                              this.flag=false;
                          }
                          //console.log(JSON.parse("\'"+_this.productData.attributeList+"\'"));
                          // console.log(_this.skuTips);
                    }
                    else{
                        
                    }
                  
                },
                error=>{

                }
            )

        },
        initCollect:function(){
            //console.log(this.$route.params.id);
            var _this=this;
            var params={
                productId:this.$route.params.id,   //商品id
            };

            this.http.get(
                this.api.collect.getIsCollected, 
                params,
                response=>{
                    if(response.data.code==200){
                          this.isCollected=true;
                         
                    }
                    else{
                        
                    }
                  
                },
                error=>{

                }
            )

        },
        getPicList:function(){
            //console.log(this.$route.params.id);
            var _this=this;
            var params={
                id:this.$route.params.id,   //商品id
            };

            this.http.get(
                this.api.product.getPicList, 
                params,
                response=>{
                    if(response.data.code==200){
                        //console.log(response.data.data.length);
                          //this.tepimgUrl.push();
                        for(var i = 0; i < response.data.data.length; i++){
                            this.tepimgUrl.push(response.data.data[i].picUrl);
                        }
                            
                         
                    }
                    else{
                        
                    }
                  
                },
                error=>{

                }
            )

        },
        //返回
        goBack:function(){
            this.$router.go(-1);
        },
        share:function(){
            console.log("share");
        },
        //预览图片
        previewImage:function(index){
            ImagePreview({
                images:this.tepimgUrl,
                startPosition:index,
                showIndicators:true,
            })


        },
        goToCart:function(){
            console.log("gotoCart");
            this.$router.push({
                path:'/cart',
                query:{
                    originPathName:'product',
                    prodcuctId:+this.productData.productId,
                }
            });
        },
        //加购物车
        addToCart:function(){

            console.log("add");
        },
        collect:function(){
            
            this.http.post(
                this.api.collect.collectOrNot,
                {
                    productId:this.productData.productId,
                },
                response=>{
                    if(response.status==200){
                        if(response.data.code==200){
                            this.isCollected=true;
                            alert("success to collect");
                        }else if(response.data.code==406){
                            this.isCollected=false;
                            alert("cancel collect");
                        }

                    }
                },
                error=>{

                }
            )

            //console.log("collect");
        },
        //展示商品规格
        showProductSku:function(){
            //console.log('asdas');
            this.visibility.sku=true;

        }
    }
}
</script>

<style lang="less" scoped>
@back-button-width:26px;

.product-page{
    position: relative;
    min-height:1000px;
    background-color:@color-gray-background;
    
    //图标按钮
    .icon-button{
        box-sizing: border-box;
        height:@back-button-width;
        width:@back-button-width;
        border-radius: @back-button-width / 2 ;
        //background-color:darkgreen;
        //border:2px solid #000;
        z-index:1;
        font-size:24px;
        color:#000;
        font-weight: bold;
    }
    //返回按钮
    .back-button{
        position:absolute;
        top:15px;
        left:15px;
       
    }
    .share-button{
        position:absolute;
        top:15px;
        right:15px;

    }
    //商品轮播图
    .van-swipe{
        //height:200px;
        width:100%;
       
        padding-bottom:20px;
        //height:auto;
        //line-height: 100%;
        //background-color:@color-blue;
        //border-bottom:1px solid @color-lightgray-border;
       // box-shadow: 0 0px 3px 2px @color-lightgray-border;
        
        .van-swipe-item{
            img{
                width:100%;
                height: 330px;
            }
            
        }
        /deep/ .van-swipe__indicators{
            bottom:5px;

            .van-swipe__indicator{
                transition: .3s linear all;
                background-color:#000;
                //margin-right:5px;
                width:7px;
                height:7px;

            }
             .van-swipe__indicator--active{
                width:32px;
                border-radius:3.5px;

                
            }
        }
    }
    //商品信息区
    .product-info{
       
        margin-top:0px;
        padding-top:10px;
        padding-left:10px;
        text-align: left;
        .title{
            font-size:16px;
            font-weight: 700;
            .van-tag{
                vertical-align: top;
                font-weight:500;
                font-size:14px;
                padding: 0px 5px;
                margin-right:4px;
            }
        }
        .description{
            color:@color-gray-font;
            padding-top:5px;
            font-size:14px;
        }
        .price{
            padding-top:6px;
            font-weight: bold;
            font-size:0px;

            .price-area{
                display: inline-block;
                width:200px;
                .org-price{
                    position: relative;
                    color:@color-gray-font;
                    text-decoration: line-through;
                    .price-code{
                        font-size:16px;
                    }
                    .price-value{
                        padding-left:2px;
                        font-size:16px;
                    }

                    //自定义删除线 暂时未用
                    &:before{
                        content:"";
                        position:absolute;
                        width:100%;
                        height:0px;
                        border:0px solid @color-gray-font;
                    }
                }
                .vip-price{
                    
                    .price-code{
                        font-size:14px;
                    }
                    .price-value{
                        padding-left:2px;
                        font-size:20px;
                    }
                }
            }

            .rate{
                float:right;
                color:#000;
                width:100px;
                margin-right:10px;
                text-align:right;
                margin-top:3px;
                //border:1px solid #000;
                //vertical-align: bottom;

                .rate-num{
                    display: inline-block;
                    letter-spacing:1px;
                    font-size:18px;
                    color:@color-red-font;
                }

                .van-rate{
                    margin-top:2px;
                    display: inline-block;
                }
            }
        
        }
        .note{
            margin-top:10px;
            margin-right:10px;
            padding-bottom:10px;
            text-align:right;
            color:@color-gray-font;
            font-size:14px;
        }
        //background:@color-gray-background;
        //min-height:200px;
    }

    //商品规格选择条
    .product-selected-bar{
        margin-top:15px;
        text-align: left;
        color:#000;
        font-weight: 500;
        .van-icon{
            color:#000;
            
        }
    }

    .product-detail-info{
        margin-top:15px;
        color:#000;


    }

    .van-goods-action{
        z-index:120;
        font-weight:500;
        .mini-button{
            color:#000;
           
            .van-icon{
                font-weight: 500;
            }
        }
        
       
    }
}
</style>
