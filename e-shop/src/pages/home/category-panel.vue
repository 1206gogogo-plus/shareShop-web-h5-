<template>
    <van-popup  v-model="thisVisible" 
                   position="left">
        <van-nav-bar :fixed="true" 
                    title="Category"
                    @click-right="goBack">
                <span  slot="right">
                    back
                    <van-icon size="1.3em" name="arrow-left"/>
                </span>
            </van-nav-bar>
           
           <div   class="panel-with-nav-bar fix-left">
               <van-badge-group ref="categoryPanelLeftMenu" :active-key="activeCategoryIndex.level1" @change="changeCategory">
                        <van-badge  v-for="(item,index) in goodsCategory" :title="item.categoryName" :key="index">
                        </van-badge>
               </van-badge-group>

            <div class="category-list-detail" ref="categoryPanelRightMenu" >
               
                <category-list-detail   v-for="(item,index) in goodsCategory" :key="index"
                                        v-show="categoryListDetailVisible[index]"
                                        :categoryList="selectedCategoryList[index]"
                                       >
                </category-list-detail>
            </div>



           </div>
    </van-popup>
</template>

<script>
import CategoryListDetail from '@/components/home/sub-pages/base-components/category/category-list-detail';

export default {

    model:{
        prop:'visible',
        event:'changeStatus'
        },

    props:{
        visible:{
            type:Boolean,
            default:false,
        }
    },
    components:{
        CategoryListDetail,
    },
    data:function(){
        return{
            openCount:0,
            thisVisible:this.visible,
            categoryListDetailVisible:[],
            goodsCategory:[],
            selectedCategoryList:[],
            //选中的商品一级分类索引
            activeCategoryIndex:{
                level1:0,
                level2:0
                },

        }
    },

    watch:{
        //vant的badge组件有问题 change事件实际上是click ，所以在此手动添加监控，监控一级菜单选中项的变化
        'activeCategoryIndex.level1':{
            handler: function(val){

                //console.log("change:" +this.activeCategoryIndex.level1+"----"+val);
                if(this.selectedCategoryList[val]===undefined)
                    this.getCategory(val);
            }

        },
        visible:function(val){
            this.thisVisible=val; 
        },
        thisVisible:function(val){
            if(!val)
                this.$emit('changeStatus',val);
            else{
                //当该界面第一次打开时调用
                if(this.openCount==0)
                {
                    //当这个组件受 v-if v-show 影响时，mounted里面使用ref的方式可能获取不到元素 
                    this.$nextTick(()=>{
                        this.$refs.categoryPanelLeftMenu.$el.style.height=window.innerHeight-56+'px';
                        this.$refs.categoryPanelRightMenu.style.height=window.innerHeight-56+'px';
                        //console.log(window.innerHeight-56)
                    })
                }
                this.openCount++;
            }
        }
    },
    
    mounted:function(){
        this.init();

    },

    methods:{
        init:function(){
              
              var _this=this;
              this.http.get(
                this.api.category.getFirstLevel,
                {},
                function(rep){
                    _this.goodsCategory=rep.data.data;
                    _this.categoryListDetailVisible=[];
                //init tabs visible controll array
                    for(var i=0;i<_this.goodsCategory.length;i++)
                    {

                        _this.categoryListDetailVisible.push(i==0?true:false);
                    }

                    _this.getCategory(0);
                },
              )
        },
        getCategory:function(val){
            var _this=this;
            var targetId=this.goodsCategory[val].categoryId;
            var params={
                id:targetId,
            }
            //console.log(val);
            this.http.get(
                this.api.category.getChildrenByParentId,
                params,
                function(rep){
                    switch(rep.data.code){
                        case 200:{
                            _this.$set(_this.selectedCategoryList,val,rep.data.data);
                        };break;
                        case 406:{
                            _this.$set(_this.selectedCategoryList,val,[_this.goodsCategory[val]]);
                        };break;
                        default:

                    }
                }
            );
            
        },
        goBack:function(){
            this.thisVisible=false;
        },
         
        changeCategory:function(key){
            //可优化操作步骤，直接修改原索引下数组的值和选中的值，不需要遍历去重置为false,但可能会带来不可预知的错误，
            this.activeCategoryIndex.level1=key;

            this.categoryListDetailVisible=this.categoryListDetailVisible.map(function(x){
                 return false;
             });
            this.$set(this.categoryListDetailVisible,key,true);
            //this.categoryListDetailVisible[]
            

            //console.log(this.activeCategoryIndex.level1);
        }
    }
    
}
</script>

<style lang="less" scoped>
    
    .van-popup{
        .van-nav-bar{
            height:@nav-bar-height;
            line-height:@nav-bar-height;
            .van-nav-bar__right{
                color:@color-blue;
            }
        }
       
        .panel-with-nav-bar{
            padding-top:0px;
            .van-badge-group{
                overflow: hidden;
                overflow-y:scroll;
                width:85px;
                float:left;
               
                .van-badge{
                    border-bottom: 1px solid #E1E1E1;
                    padding:13px 6px 13px 6px;
                }
                
            };
            .category-list-detail{

                float:right;
                overflow: hidden;
                overflow-y:scroll;
                position:absolute;
                left:85px;
                right:0px;
                padding-top:10px;
            }


        }


    }
</style>
