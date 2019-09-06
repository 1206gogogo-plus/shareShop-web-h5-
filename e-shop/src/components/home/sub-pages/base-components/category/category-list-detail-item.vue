<template>
   <div class="category-list-detail-item" @click="goToCategoryProductList">
       <div class="category-img">
           <img :src="categoryItemData.picUrl"  :class="circle?'circle':''">
       </div>
        <p class="category-desc">{{categoryItemData.categoryName}}</p>

   </div>


</template>

<script>
export default {
    props:{
        categoryItemData:{
            type:Object,
            required:true,
        },
        circle:{
            type:Boolean,
            default:false,
        }
    },

    data:function(){
        return{
            
        }
    },

    methods:{
        goToCategoryProductList:function(){
            this.$router.push({
                name:'search',
                query:{
                    categoryId:this.categoryItemData.categoryId,
                    categoryName:this.categoryItemData.categoryName,
                    }
            });
        }

    }
    
}
</script>

<style lang="less" scoped>
    .category-list-detail-item{
        margin:5px auto;
        width:100%;

        .circle{
            border-radius: 50%;
            border:1px solid red;
        }

        .category-img{
          
            
           // height: 100%;
            
            //padding-bottom: 100%;
            overflow: hidden;
           
          
            img{
                min-width:30px;
                min-height:30px;
                max-width:60px;
                max-height:60px;
                margin:0 auto;
                background:url(@placeholder-img-base64) center no-repeat;
                background-size:50%;
              
               //padding-top:100%;
               
            }
        };
        .category-desc{
                line-height: 23px;
                height: 23px;
                padding:0px 0;
                margin:0;
                font-size: 14px;
                color: #5D5D5D;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
        }



    }


</style>
