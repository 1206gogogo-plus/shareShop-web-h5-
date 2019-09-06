<!--商品分类列表-->
<template>
    <div >

      <template v-if="categoryList.length>0">

            <van-row  type="flex"  v-for="(calListIndex,index) in categoryListRowNum"  :key="index">
<!--                
                {{calListIndex*3}}//{{(categoryListLength-(calListIndex-1)*3)}}//
                {{(categoryListLength-(calListIndex-1)*3)>=3?3:(categoryListLength-calListIndex*3)}} -->

                <van-col span="8"  v-for="calListRowIndex  in (categoryList.length-(calListIndex-1)*3)>=3?3:(categoryList.length-(calListIndex-1)*3)" :key="(calListIndex-1)*3+calListRowIndex">
                    <category-list-detail-item :categoryItemData="categoryList[(calListIndex-1)*3+calListRowIndex-1]">
                    </category-list-detail-item> 
                </van-col> 
            
            </van-row>
       
      </template>

    </div>
</template>

<script>
import CategoryListDetailItem from "@/components/home/sub-pages/base-components/category/category-list-detail-item"
export default {
    props:{
        categoryList:{
            type:Array,
            default:()=>[],
           
        },

    },
    components:{
        CategoryListDetailItem,
    },
    data:function(){
        return{
            //categoryListLength:0,
        }
    },
    computed:{
        categoryListRowNum:function(){
            return Math.floor(this.categoryList.length/3)+1;
            //return this.categoryListLength/3===0?1:this.categoryListLength/3;
        },
        categoryListFirstColNum:function(){
            return Math.floor(this.categoryList.length%3);
        },
    },
    created:function(){
        //console.log("categoryList.length:"+this.categoryList.length);
    },
    beforeMount:function(){
        
        
    },
    mounted:function(){
      
    }
}
</script>


<style lang="less" scoped>
    .van-col{
        //background:lightblue;
    }
</style>
