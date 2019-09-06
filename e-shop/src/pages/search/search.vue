
<template>
    
    <div
                class="search-panel">
        
        <van-nav-bar fixed 
                left-arrow
                left-text="back"
                @click-left="goBack">
                
                <van-search slot="title"  placeholder=" Enter the keyword" v-model="searchContent">
                </van-search>
                <van-button class="search-action" 
                                slot="right" 
                                @click="handleSearch" 
                                 plain size="small" type="info">
                                Search
                </van-button>

               
        </van-nav-bar>
        
        <div class="panel-with-search-bar">
            <search-history v-show="!onSearch" ref="searchHistory" @do-search="handleTagClick"/>
            <sort-menu class="g-white-card" v-show="onSearch" 
                    :totalNum="searchResult.totalNum"
                    @reOrder="doSearch" />
            <product-list v-show="onSearch" :productList="searchResult.productList"/>
        </div>


    </div>
    
</template>

<script>
import SearchHistory from "@/components/home/sub-pages/base-components/search/search-history"
import ProductList from '@/components/product/product-list'
import SortMenu from '@/components/product/sort-menu'
export default {
    model:{
        prop:'visible',
        event:'changeStatus'
    },
    props:{
        visible:{
            type:Boolean,
            default:true,
        },
        
    },
    components:{
        SearchHistory,
        ProductList,
        SortMenu,
    },
    data:function(){
        return{
            thisVisible:this.visible,

            searchContent:'',
            onSearch:false,
            searchResult:{
                productList:[],
                totalNum:0,
            }
            

        }
    },
    watch:{
        visible:function(val){
            this.thisVisible=val;
        },
        thisVisible:function(val){
            if(!val){
                this.$emit('changeStatus',val);
            }
        }
    },
    mounted:function(){
        var cateId=this.$route.query.categoryId;
        var cateName=this.$route.query.categoryName;
        if(cateId&&cateId!=''&&cateName!=''&&cateName){
            this.searchContent=cateName;
            console.log(this.searchContent);
            this.doCategorySearch(cateId);
        }

    },
  

    methods:{
        goBack:function(){
           this.thisVisible=false;
           this.$router.back(-1);
            //reset all the status of this component when you close the search panel
           this.reset();

        },
        //handle child component search-history's emit event 
        handleTagClick:function(val){
            console.log("clicked search tag value:"+val);
            this.searchContent=val;
            this.handleSearch();
        },
   
        //click the search button, do search options 
        handleSearch:function(){
            if(this.searchContent==''){
                console.log("please input the search value")
                return;
            }
            else{
                //调整搜索历史tag顺序和更新搜索历史,将新的放在前面，如果是已经搜过的，挪到前面去
                var storage=window.localStorage;
                var searchHistoryList=JSON.parse(storage.getItem("search-history")||'[]');
                var searchValueIndex=searchHistoryList.indexOf(this.searchContent);
                if(searchValueIndex===-1){
                    //搜索内容不重复时
                    searchHistoryList.unshift(this.searchContent);
                }
                else{
                    searchHistoryList.splice(searchValueIndex,1);
                    searchHistoryList.unshift(this.searchContent);
                }
                
                var searchHistoryListStr=JSON.stringify(searchHistoryList);
                storage.setItem("search-history",searchHistoryListStr);
                
                this.doSearch();
                this.updateSearchHistoryPosition();
            }
        },

        //update component search-history state
        updateSearchHistoryPosition:function(){
            //console.log(this.$children[0]);

            this.$refs.searchHistory.updateList();
        },
        //do category search
        doCategorySearch:function(id){
            var param={
                id:id,
            };
            this.http.get(
                this.api.search.byCategory,
                param,
                response=>{
                    if(response.data.code==200){
                        this.searchResult.productList=response.data.data.indata;
                        this.searchResult.totalNum=response.data.data.numFound;
                    }
                    //no data
                    else if(response.data.code==400){
                        //alert("no data");
                    }


                    
                },
            )
            this.onSearch=true;

        },

        //search options
        doSearch:function(orderRule){
            var param={
                name:this.searchContent,
                pageindex:1,
                pagesize:20,
               
            };
            if(orderRule){
                param.field=orderRule.field;
                param.judge=orderRule.judge;
            }

            var _this=this;
            this.http.get(
                this.api.search.byKeyword,
                param,
                response=>{
                    if(response.data.code==200){
                        this.searchResult.productList=response.data.data.indata;
                        this.searchResult.totalNum=response.data.data.numFound;
                    }
                    //no data
                    else if(response.data.code==400){
                        alert("no data");
                    }


                    
                },
            )

            this.onSearch=true;
        },
        //when user close the popover,reset all the status of this component
        reset:function(){
            this.searchContent='';
            this.onSearch=false;
        }
    }
    
}
</script>

<style lang="less" scoped>
.search-panel{
    height:100%;
    width:100%;
    .van-nav-bar{
        .van-nav-bar__left{
            color:@color-gray-font;
            .van-icon{
                color:inherit;
                font-weight:700;
            }
            .van-nav-bar__text{
                color:inherit;
            }
        }

        .van-nav-bar__title{
            margin-left:23%;
            max-width: 60%;
            height:46px;
            
            .van-search{
                position:relative;
                top:23px;
                margin-top:-17px;
                padding:0px;
            
            /deep/ .van-icon{
                color:@color-gray-font;
            }
            
            }
        }

        .van-nav-bar__right{
            right:5px;
            .search-action{
                font-size: 14px;
                padding:0 0px;
                min-width: 55px;
                border:0px;
                color:@color-gray-font;
            }
        }
    }
}
</style>
