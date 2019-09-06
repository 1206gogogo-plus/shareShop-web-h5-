<template>
    <div class="search-history">
        <van-row class="head-bar">
            <van-col :span="18" :offset="1" class="title">Search History</van-col>
            <van-col :span="4" class="del-button"  >
                <van-icon name="delete" @click="delSearchHistory" />
            </van-col>
        </van-row>
        <van-row class="tags-area">
            <van-col :span="23" :offset="1">

                <van-tag  v-for="(item,index) in searchHistoryList" :type="index<3?'primary':''" :key="index" @click="doSearch(item)" size="large" plain>{{item}}</van-tag>
                
            </van-col>
        </van-row>
    </div>

</template>

<script>

export default {
    data:function(){
        return{
            searchHistoryList:[],
        }
    },
    mounted:function(){
        this.init();

    },

    methods:{
        init:function(){
            //获取搜索历史列表
            var storage=window.localStorage;
            this.searchHistoryList=JSON.parse(storage.getItem("search-history"));
        },
        doSearch(val){
            this.$emit("do-search",val);
        },
        updateList:function(){
            console.log("update");
            this.init();
        },
        delSearchHistory:function(){
            var storage=window.localStorage;
            storage.setItem("search-history",'[]');
            console.log("success del search history");
            this.init();
        }


    }


}
</script>

<style lang="less" scoped>

.search-history{
    padding-top:20px;

    .head-bar{
        color:@color-gray-font;
        font-size:14px;
        .title{
            
            text-align:left;
        }
        .del-button{
            text-align:right;
            font-size:18px;
            &:hover{
                color:@color-blue;
            }
        }
    }

    .tags-area{
        text-align:left;
        
        .van-tag{
            margin:5px 5px 5px 0px;
        }
    }



}
</style>
