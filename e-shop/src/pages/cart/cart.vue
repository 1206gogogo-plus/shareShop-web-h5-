<template>

    <div class="cart">
        <van-row  class="nav-bar g-white-card">
            <van-col :span="5" class="left">
                  &nbsp;
            </van-col>
            <van-col :span="14" class="title">Cart</van-col>
            <van-col :span="5" class="right">
                Manage
            </van-col>
        </van-row>

        <div class="fun-panel" v-if="flag">
            <product-card v-for="(item,index) in adjustedProductsData" :key="index" :deep="selectedAllDeepFlag"
                    v-model="productsData[index]"  @selected-shop="handleShopSelected" >
                    
            </product-card>
        </div> 

        <van-submit-bar
        :price="totalPrice"
        currency="$"
        button-text="submit"
        @submit="submit"
        >
        <van-checkbox v-model="selectedAll">All</van-checkbox>
        </van-submit-bar>


        

    </div>    
</template>

<script>
import productCard from '@/components/common/product-card';


export default {
    components:{
        productCard,
    },
    data:function(){
        return{
            selectedAll:false,
            selectedAllDeepFlag:false,
            productsData:[
                {
                    storeName:"share shop",
                    storeId:1,
                    isSelected:false,
                    goodsList:[
                    {}
                    ]
                },
            ],
            flag:false,
            //totalPrice:0,

        }
    },
    created:function(){

        this.getProductListInCart();

        this.$store.commit("update_num_ProductsInCart",{num:this.totalProductsNum,});

    },


    watch:{

        selectedAll:function(val){
            //console.log("selectedAll change: "+this.selectedAll);
            this.selectedAllDeepFlag=true;
            for(var i=0;i<this.productsData.length;i++){
                this.productsData[i].isSelected=val;
            }
        },

        'productsData.length':function(val){
     

        },
        totalProductsNum:function(val){

           this.$store.commit("update_num_ProductsInCart",{num:val,});
        }

    },
    computed:{

        totalPrice:function(){
            var total=0;
            for(var i=0 ; i< this.productsData.length;i++){

                for(var j=0 ; j < this.productsData[i].goodsList.length ; j++)
                {
                    if(this.productsData[i].goodsList[j].isSelected)
                        total+=(this.productsData[i].goodsList[j].price*this.productsData[i].goodsList[j].num);
                }

            }
            return total*100;
        },

        totalProductsNum:function(){
            var count=0;
            for(var i=0;i<this.productsData.length;i++)
            {
                count+=this.productsData[i].goodsList.length;
            }

            
            return count;

        },
        adjustedProductsData:function(){
            for(var i=0;i<this.productsData.length;i++){
                if(this.productsData[i].goodsList.length==0){
                    this.productsData.splice(i,1);
                }
            }

            return this.productsData;
        },
        adjustedSelectedAllData:function(){

            
            // for(var i=0 ; i<this.productsData.length ; i++){
            //     if(this.productsData.isSelected)
            //         for(var j=0 ; j< this.productsData[i].goodsList.length ; j++){
            //             this.productsData.isSelected
            //         }

            // }
        }

    },

    methods:{
        goBack:function(){
            this.$router.back(1);
        },
        getProductListInCart:function(){

            this.http.get(
                this.api.cart.getList,
                '',
                response=>{

                    // console.log(response);

                    if(response.data.code==200){
                        // console.log(response);
                        this.flag=true;
                        for(var i = 0; i < response.data.data.length; i++){
                            //console.log(response.data.data[i].productId);
                            this.getProInfoByProId(response.data.data[i].productId, i);
                        }
                    
                  
                    } 
                   
                        
                    
                },
                error=>{

                }
            )
        },
        getProInfoByProId(val,i){
            
            var params={
                id:val,
            };
            this.http.get(
                this.api.product.getDetailById,
                params,
                response=>{
                    if(response.data.code==200){
                        
                        //console.log(response);
                        //console.log(response.data.data);
                        if(i == 0)  //判断，避免出现goodsList的第一个为空的情况
                            this.productsData[0].goodsList[0] = response.data.data;
                        else
                            this.productsData[0].goodsList.push(response.data.data);
                            
                        //console.log(this.productsData[0])
                        
                    } 
                },
                error=>{

                }
            )
        },
        handleShopSelected:function(){
            var tep=true;

            for(var i=0;i<this.productsData.length;i++){
                tep=tep&&this.productsData[i].isSelected;
            }
            this.selectedAll=tep;
        },

        delOneProductsInCart:function(productId,skuId){
            for(var i=0;i<this.productsData.length;i++){
                for(var j=0;j<this.productsData[i].goodsList.length;j++){
                    var tepItem=this.productsData[i].goodsList[j];
                    if(tepItem.productId==productId&&tepItem.sku.id==skuId)
                    {
                        this.productsData[i].goodsList.splice(j,1);
                    }
                }
            }
        },
        //submit order
        submit:function(){
            var result=this.checkSelected();
            console.log(result);
            if(!result.flag&&result.count==0){
                this.$toast("You haven't selected a product yet !");
            }
            else{
                this.$router.push({path:'/confirmOrder'});
            }
           

        },

        checkSelected:function(){
            var flag=false;
            var count=0;
            for(var i=0;i<this.productsData.length;i++){
                for(var j=0;j<this.productsData[i].goodsList.length;j++){
                    if(this.productsData[i].goodsList[j].isSelected)
                        {
                            count++;
                            flag=true;
                        }
                    
                        
                }
            }
            return {flag:flag,count:count};
        },
    }
}
</script>

<style lang="less" scoped>
.cart{

    .nav-bar{
        z-index: 20;
        position: fixed;
        top:0;
        width:100%;
        height:@nav-bar-height;
        line-height:@nav-bar-height;
        box-shadow: 0 0px 3px 0px @color-lightgray-border;
        background-color:@color-blue-background;

        .title{
            font-size:16px;
            color:@color-white;
        }

        .right{
            font-size:12px;
            color:@color-white;
        }
    }

    .fun-panel{
        z-index: 10;
        margin-top:@panel-with-nav-bar-mgt;
        //padding-top:10px;

        .product-card{
            width:94%;
            margin:0 auto;
        }
    }
    .van-submit-bar{
        bottom:50px;

        .van-submit-bar__bar{
            height:@submit-bar-height;
            .van-submit-bar__text{
                font-size:14px;
                .van-submit-bar__price{
                    font-size:18px;;
                }
            }
        }
        .van-button{
            width:80px;
            font-size:16px;
            height:@submit-bar-height;
            line-height:@submit-bar-height;
            background-color:@color-blue-background;
            border: 1px solid @color-blue;
        }

        .van-checkbox{
            margin-left:3%;
            
        }
    }
}
</style>
