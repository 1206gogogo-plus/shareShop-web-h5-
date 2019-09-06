<template>
   <div class="sort-menu">

       <div class="left-results-num">
           Total  {{totalNum}} results
           <!-- {{startProductIndex}} - {{endProductIndex}} of total {{resultNum}} results -->
       </div>
       
       <div class="right-sort-button" @click="openSortDialgram">
          <div class="sort-text">
              Sort & Filter
          </div>
           <!-- <van-icon name="arrow-down"/> -->
       </div>

        <van-popup v-model="visiblity.sortDialgram" position="bottom">
            <van-row class="nav-top" >
                
                <van-col :span="10" :offset="1" class="left-reset">
                    <div class="reset-button" @click="reset">Reset</div>
                </van-col>
                <van-col :span="10" :offset="2" class="right-done">
                    <div class="done-button" @click="doneSort">Done</div>
                </van-col>
            </van-row> 

            <van-collapse v-model="activeFilterModule" accordion>
                <van-collapse-item class="sort-rule-collapse"  name="1">
                    <div slot="title" class="slot-title">
                        Sort By
                        <div class="selected-sort-rule">{{selectedSortRule.sortRuleMsg}}</div>
                    </div>
                    <van-radio-group class="sort-rule-radio" v-model="sortRule">
                            <van-radio  v-for="(item,index) in sortRuleList" :key="index" :name="item.sortRuleCode">
                                {{item.sortRuleMsg}}
                            </van-radio>
                            
                        
                    </van-radio-group>
                </van-collapse-item>
            </van-collapse>

        </van-popup>
   </div>
</template>
<script>
export default {
    props:{
        totalNum:{
            type:Number,
            default:0,
        },
    },
    data:function(){
        return{
            resultNum:3,
            pages:{
                currentPages:1,
                totalPages:1,
                numsOfOnePage:30,
            },
            visiblity:{
                sortDialgram:false,
            },
            sortRule:'1',
            sortRuleList:[
                {
                    sortRuleCode:"1",
                    sortRuleMsg:"Best Match",
                },
                {
                    sortRuleCode:"2",
                    sortRuleMsg:"Best Sellers",
                },
                {
                    sortRuleCode:"3",
                    sortRuleMsg:"Price: low to high",
                },
                {
                    sortRuleCode:"4",
                    sortRuleMsg:"Price: hight to low",
                },
                {
                    sortRuleCode:"5",
                    sortRuleMsg:"Highest Rating",
                },
                {
                    sortRuleCode:"6",
                    sortRuleMsg:"New",
                },
            ],
            activeFilterModule:'1',
        }
    },
    computed:{
        //the product start index , just like 1-48 ,the 1 is the start index
        startProductIndex:function(){
            return this.resultNum==0?0:this.pages.numsOfOnePage*(this.pages.currentPages-1)+1;
        },
        //1-48 the 48 is the end index
        endProductIndex:function(){
            var tep=0;
            if((this.startProductIndex-1+this.pages.numsOfOnePage)<=this.resultNum){
                tep=this.startProductIndex-1+this.pages.numsOfOnePage;
            }
            else{
                tep=this.resultNum;
            }     
            return tep;
        },
        selectedSortRule:function(){
            var _this=this;
            return this.sortRuleList.find(function(rule){
                return rule.sortRuleCode===_this.sortRule;
            })

        }

    },

    methods:{
        openSortDialgram:function(){
            //console.log("enter search -> search-list -> Sort");
            this.visiblity.sortDialgram=true;
        },
        doneSort:function(){
            var params={}
            switch(this.sortRule){
                case '2':{
                    params.field="sales";
                    params.judge=-1;
                    };break;
                case '3':{
                    params.field="minPrice";
                    params.judge=1;
                };break;
                case '4':{
                    params.field="minPrice";
                    params.judge=-1;
                };break;
                case '5':{
                    params.field="pscore";
                    params.judge=-1;
                };break;
                case '6':{
                    params.field="inputTime";
                    params.judge=-1;
                };break;
                default:{
                    
                };break;

            }
            
            //doSort 
            this.$emit("reOrder",params)

            this.visiblity.sortDialgram=false;
        },
        reset:function(){
            this.sortRule='1';
        }
    }

}
</script>

<style lang="less" scoped>
@sort-menu-height:40px;

    .sort-menu{
        height:@sort-menu-height;
        line-height: @sort-menu-height;
        margin-top:20px;
       
        border-bottom:1px dashed  #eeeeee;
        

        .left-results-num{
            height:@sort-menu-height;
            float:left;
            padding-left:10px;
            font-size:14px;
            text-align: left;
            max-width: 80%;
            overflow: hidden;
           
            text-overflow:ellipsis ;
            white-space: nowrap;
        }
        .right-sort-button{
            height:@sort-menu-height;
            line-height: @sort-menu-height;
            float:right;
            margin-right:5px;
            font-size:14px;
            //border:1px solid red;
            padding:0 8px;

            .sort-text{
               
                display: inline-block;
                position:relative;
                //font-weight: 700;
               
                height:@sort-menu-height*0.56;
                line-height: @sort-menu-height *0.56;
                border-radius: @sort-menu-height *0.28;
                
                margin-top:0px;
                padding:0 8px;
                border:1px solid #000;
            }
            .van-icon{
                height:@sort-menu-height;
                line-height: @sort-menu-height;
                font-size:18px;
                color:#1d2736;
               // border:1px solid red;
                //padding-top:4px;
            }

        }

        .van-popup{
            height:100%;
            background-color: @color-gray-background;
            

            .nav-top{
                background-color: #fff;
                height:@sort-menu-height;
                line-height: @sort-menu-height + 2px;
               // border-bottom:1px solid  @color-lightgray-border;
               // box-shadow:0 0 3px 0px @color-lightgray-border;
                letter-spacing: 0.4px;
                
                
               
                .left-reset{
                  
                    font-size:14px;
                    color:@color-blue;
                    
                    .reset-button{
                        border:1px solid #000;
                        height:@sort-menu-height * 0.8;
                        margin-top:@sort-menu-height * 0.1;
                        line-height: @sort-menu-height * 0.8;
                        color:#000;
                        box-sizing: border-box;
                        border-radius: @sort-menu-height * 0.4;
                        font-weight: 700;
                    }
                   
                }
               
                .right-done{
                    font-size:14px;
                    color:@color-blue;
                   
                    height:100%;
                    
                   .done-button{
                        box-sizing: border-box;
                        height:@sort-menu-height * 0.8;
                        margin-top:@sort-menu-height * 0.1;
                        line-height: @sort-menu-height * 0.8;
                        border-radius: @sort-menu-height * 0.4;
                        color:#fff;
                        background-color:@color-blue;
                       font-weight: 700;
                   }
                  
                }
            }   

            .sort-rule-collapse{
                margin-top:5px;
                text-align: left ;
               
                .slot-title{
                    letter-spacing: 0.5px;
                    //border:1px solid red;
                    font-size:18px;
                    font-weight:700;
                    color:#000;
                    .selected-sort-rule{
                        font-weight:500;
                        font-size:14px;
                        color:@color-blue;
                    }
                }

                .sort-rule-radio{
                    background-color: #fff;
                    margin-top:10px;
                    text-align: left;
                    padding-left:10%;

                    .van-radio{
                        padding:3px 0;
                        font-size:14px;
                         //border:1px solid #000 ;
                        /deep/ .van-radio__icon{
                            
                            .van-icon{
                                border-color:#000;
                            }

                        }

                        /deep/ .van-radio__icon--checked{
                            .van-icon{
                                background-color:#fff;
                                color:#000;
                                font-size:18px;
                                font-weight:700;
                            }
                        }

                         /deep/ .van-radio__icon--checked + .van-radio__label{
                             font-weight: 700;
                             font-weight: 16px;
                         }
                             
                            
                         
                        
                    }
                }
            }
        }
    }
</style>
