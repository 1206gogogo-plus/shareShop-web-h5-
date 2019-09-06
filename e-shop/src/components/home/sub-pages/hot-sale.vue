<template>
    <div class="hot-sale">
        <div class="product-list">
            <shop-card :product-data='productList[1]'></shop-card>
            <shop-card :product-data='productList[0]' :topFlag="true" ></shop-card>
            <shop-card :product-data='productList[2]'></shop-card>
        </div>
        
        <div class="view-more">
            <span @click="gotoHotSale">
                <span class="text">View More</span> 
                <van-icon name="arrow"></van-icon>
            </span>
            
        </div>
    </div>    
</template>

<script>
import shopCard from '@/components/home/base-components/shop-card'

export default {
    components:{
        shopCard,
    },
    data:function(){
        return{
            productList:[],
        }
    },
    beforeMount:function(){
        this.getList();
    },
    methods:{
        getList:function(){
            
            this.http.get(
                this.api.search.getList.url,
                {
                    pagesize:3,
                    field: this.api.search.getList.field.hotSale,
                },
                response=>{
                    if(response.status==200&&response.data.code==200){
                        this.productList=response.data.data.indata;

                    }

                    
                },
                error=>{}
            )

        },

        gotoHotSale:function(){
            this.$router.push({
                path:'/hotsale',
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .hot-sale{
        margin-top:10px;
        .product-list{
            display: flex;
            justify-content:space-around;
            /deep/.shop-card{
                width:28%;
            }
        }

        .view-more{
            margin-top:10px;
            .text{
                text-decoration: underline;
                font-size:14px;
                color:@color-gray-font;
            }
            .van-icon{
                color:@color-gray-font;
                font-size:18px;
                vertical-align: bottom;
               
            }
        }
    }
</style>
