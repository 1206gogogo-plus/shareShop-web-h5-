<template>
    <div class="home background-gray">
        
        <!-- <van-nav-bar fixed title="shareShop">
            <van-icon size="1.5em" color="#282828" name="apps-o" slot="left"  @click="showCategoryPanel"/>
            <van-icon size="1.5em" color="#282828" name="user-o" slot="right" @click="showSearchPanel"/>
        </van-nav-bar> -->
        <nav-fixed :isScrolled="scrolled" @leftclick="showCategoryPanel" @rightclick="showUserPanel"></nav-fixed>
        
        <div  class="back-top-button" @click="backTop">
          <van-icon name="arrow-up"/>
          <div class="tips">top</div>
        </div>

        <!--分类检索界面-->
        
            <category-panel v-model="visibility.category"></category-panel>
           

          <div :class="'main-area '+(!scrolled?'is-scrolled':'panel-with-nav-bar')">

            
              <!--轮播图-->
            <van-swipe class="ad-swipe-menu g-white-card" :autoplay="2000">
                <van-swipe-item v-for="(image, index) in proRecommand" :key="index">
                    <img class="ad-img" v-lazy="image.mainImage" @click="goToProductItem(image.productId)"/>
                </van-swipe-item>
            </van-swipe>

           
            <van-swipe v-if="categorySwipeData!=[]" class="category-swipe-menu g-white-card g-card-shadow-gray" >
                <van-swipe-item  v-for="(pageIndex,index) in Math.ceil(categorySwipeData.length/10)" :key="index">
                    <category-list-detail-item v-for="(item) in (Math.floor(categorySwipeData.length/10)>=pageIndex?10:(categorySwipeData.length-(pageIndex-1)*10))"
                    :key="item" 
                    
                    :categoryItemData="categorySwipeData[(pageIndex-1)*10 + item - 1]"> 
                    {{(pageIndex-1)*10 + item - 1}}
                    </category-list-detail-item>
                </van-swipe-item>
            </van-swipe>





            <!-- 首页优惠券 -->
            <panel-with-title bold-title title="Coupons" class="coupons">
                <div slot="main">
                    <div v-if="couponsData!=[]" class="tag-1">
                        <coupon v-for="item in couponsData" :key=item.couponId :data="item"></coupon>
                    </div>
                </div>
            </panel-with-title>





            <!-- 首页Hot Sale -->
             <panel-with-title bold-title title="Hot Sale">
                <div slot="main">
                    <hot-sale></hot-sale>

                </div>
            </panel-with-title>

             <panel-with-title bold-title title="On Sale">
                <div slot="main">
                    促销商品区
                </div>
            </panel-with-title>

             <panel-with-title bold-title title="New Arrival">
                <div slot="main">
                    新品区
                </div>
            </panel-with-title>


          </div>
         
         <div style="height:1200px;"></div>
         <!-- <div class="panel-with-nav-bar">

            <van-tabs v-model="active" :ellipsis="false" sticky animated swipeable>
                <van-tab title="Hot Sales">
                    <hot-sale></hot-sale>
                </van-tab>
               
                <van-tab title="On Sale">
                    <on-sale></on-sale>
                </van-tab>
                <van-tab title="New Arrivals">
                    <new-arrival></new-arrival>
                </van-tab>
                <van-tab title="Coupons Center">
                    <coupon-center></coupon-center>
                </van-tab>
               
            </van-tabs>
        </div> 
        -->

    </div>      
</template>

<script>


import panelWithTitle from '@/components/public/panel-with-title';
import navFixed from '@/components/home/nav-fixed';


import coupon from '@/components/home/coupon';

import categoryListDetailItem from '@/components/home/sub-pages/base-components/category/category-list-detail-item'; 
import hotSale from '@/components/home/sub-pages/hot-sale';

const categoryPanel=()=>import('@/pages/home/category-panel');
const searchPanel=()=>import('@/pages/search/search');

export default {
    components:{
    //base
        navFixed,
        panelWithTitle,
        coupon,
        categoryListDetailItem,
    
    //panel
        hotSale,

    //pages
        categoryPanel,
        searchPanel

    },
    data:function(){
        return{
            active:0,
            visibility:{
                category:false,
                search:false,
            },
            scrolled:false,  
            categorySwipeData:[], 
            couponsData:[],
            proRecommand:{},    //存放所有推荐的商品
        }
    },
    mounted:function(){
        window.addEventListener('scroll',this.handleScroll);
        this.initCoupons();
        this.initCategorySwipeMenu();
        this.getRecommendPro();
    },
    methods:{
        handleScroll:function(){
            var scrollTop=window.pageXOffset||document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollTop>5){
                this.scrolled=true;
                
            }
            else{
                this.scrolled=false;
            }
        
        },
        backTop:function(){
            //console.log("backtop");
            //var scrollTop=window.pageXOffset||document.documentElement.scrollTop||document.body.scrollTop;
           
            window.scrollTo(0,0);
        },
        showCategoryPanel:function(){
            this.visibility.category=true;
        },
        initCategorySwipeMenu:function(){
            
            this.http.get(
                this.api.category.getFirstLevel,
                '',
                response=>{
                    if(response.status==200&&response.data.code==200)
                        this.categorySwipeData=response.data.data;
                    //console.log(response.data);
                },
                error=>{
                    console.log(error);
                }
                )

        },
        //优惠券 coupons init
        initCoupons:function(){
            this.http.get(
                this.api.coupon.getList,
                '',
                response=>{
                    if(response.status==200&&response.data.code==200)
                        this.couponsData=response.data.data.indata;

                },
                error=>{
                    console.log(error);
                }

            )
        },
        getRecommendPro:function(){
            this.http.get(
                this.api.product.getRecommendPro,
                '',
                response=>{
                    if(response.status==200&&response.data.code==200)
                        //console.log(response);
                        this.proRecommand = response.data.data;
                        //console.log(this.proRecommand);
                },
                error=>{
                    console.log(error);
                }

            )
        },
        showUserPanel:function(e){
            //this.visibility.search=true;
            //this.scrolled=!this.scrolled;
            this.$router.push({path:'/mine'})
            // this.$router.push({
            //     path:'/search',
            // });
           
        },
        goToProductItem:function(val){
            //console.log(this.productData.productId);
            this.$router.push({name:'product',params:{id:val}});
        }

    }
}
</script>

<style lang="less" scoped>
.home{
    background-color:#f5f5f5;
    
    .back-top-button{
        z-index:1;
        position:fixed;
        right:15px;
        bottom:60px;
        width:43px;
        height:43px;
        text-align: center;
      
        border-radius: 43px;
        background-color:RGBA(255,255,255,0.8);
        box-shadow:0 0 2px 0px #cfcfcf;

        //border:1px solid #35404d;
        .van-icon{
            height:18px;
            margin-top:5px;
            font-size:18px;
            display: block;
            
        }
        .tips{
            margin-top:-5px;
            font-size:13px;
        }
    }
   
    .is-scrolled{
        margin-top: @panel-with-nav-bar-mgt *2 + 10px;

   
    }

    .main-area{
        padding-top:10px;
        .ad-swipe-menu{
            height:150px;
            background-color:#f5f5f;
            .ad-img{
                height:150px;
                width:100%;
            }
        }
        .category-swipe-menu{
            margin-top:15px;
            height:160px;
            
            .van-swipe-item{
                /deep/.category-list-detail-item{
                    width:20%;
                    height:70px;
                    margin-top:5px;
                    float:left;

                   .category-img{
                        img{
                            width:40px;
                            height:40px;
                            
                            //border:1px solid #0065ff;
                           
                        }
                    }
                    .category-desc{
                        height:20px;
                        line-height: 20px;
                        overflow: hidden;
                        font-size:14px;
                    }
                }
            }

            /deep/.van-swipe__indicators{
                bottom:5px;

                .van-swipe__indicator{
                    width:20px;
                    height:2px;
                    border-radius: 1px;
                    background-color:@color-gray-transparent-background;
                }
                .van-swipe__indicator--active{
                    background-color:@color-blue-background;
                }
            }

        }

        /deep/.coupons{

            white-space: nowrap;
            .main{
                box-sizing: border-box;
                
               
                min-height:100px;
                width:100%;
                
                overflow-x: scroll;
                &>div{
                    margin-top:10px;
                    padding:5px;
                }
            }
        }



            /*.button-area{
            margin-top:-10px;
            height:100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            //background-color:@color-blue-background;
            padding:0 20px;
            &>div{
                width:33%;
                text-align:center;
                //background-color:@color-blue-background;
                img{
                    width:50px;
                    height:50px;
                    border-radius: 50px;
                    border:2px solid @color-red-font;
                }
                div{
                    font-size:14px;
                }
            }
        }*/

    }
   

    .van-popup--left{
        width:92%;
        height: 100%;
    }
    .van-popup--right{
        width:100%;
        height:100%;
    }


    
}

</style>

