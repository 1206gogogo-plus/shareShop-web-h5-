<template>
    <div class="coupon" >
        <div class="outer" >
            <div class="left">
                    <div class="value">
                        <div class="up-sub">$</div>
                        <div class="true-value">{{couponData.couponMoney}}</div>
                    </div>
                    <div class="name">coupon</div>
            </div>
            <div class="right">
                <div class="v-center">
                    <ul>
                        <li class="use-condition">满{{couponData.fullMoney}}可用</li>
                        <li class="interval">{{couponData.receiveTime|formatDate}}前可用</li>
                        <!-- 类目需要传 -->
                        <li class="category">{{couponData.categoryName}}类目可用</li>
                        <li class="coupon-info">这里是优惠券的使用信息~~~~</li>
                    </ul>
                </div>
            </div>
       </div>
    </div>    
</template>



<script>
export default {
  
   methods:{
       init(){
            
       }
   },
    props:{
        couponData:{
                
        }
    },
    mounted(){
       this.init()
   },
}
</script>
<style lang="less" scoped>
@blue:#0065FF;
.coupon{
    display: inline-block;
    margin-right:10px;
    height: 110px;

   
    .outer{
       
        height:100px;
        display: flex;
        width: 330px;
       
        overflow: hidden;
        border-radius:8px;
        box-shadow:4px 0px 3px -2px #dcdfe6;
        .left{
            position:relative;
            box-sizing: border-box;
            width:100px;
            height:100%;
            background-color:@blue;
            color:#fff;
            display: flex;
            flex-wrap: wrap;
            
            align-content:center;
            
            
            
            &>div{
                width:100%;
            }
            .value{
                position: relative;
                font-size:0px;
                height:30px;
              
                &>div{
                    display:inline-block;
                }
                .up-sub{
                    vertical-align: top;
                    font-size:14px;
                    padding-top:2px;
                    padding-right:1px;
                }
                .true-value{
                    vertical-align: top;
                    font-size:24px;
                }

            }
            .name{
                font-size:13px;

                height:30px;
                line-height:30px;
            }
         
            
        }
        .right{
            width: 230px;
            background:
            radial-gradient(circle at top left,
            transparent 6px,#fff 0)top left,
            radial-gradient(circle at top right,
            transparent 0px,#fff 0)top right,
            radial-gradient(circle at bottom right,
            transparent 0px, #fff 0)bottom right,
            radial-gradient(circle at bottom left,
            transparent 6px,#fff 0)bottom left;
            background-size:50% 50%;
            background-repeat:no-repeat;
           
            
            


            font-size:12px;
            color:@blue;
            .v-center{
                display: flex;
               height:100%;
                align-items: center;


            ul{
               // height:100%;
                padding-left:25px;
                list-style: disc;
                text-align: left;
                
                
                &>li{
                    width:100%;
                    text-indent: -5px;
                    margin-top:3px;
                    
                }
                .coupon-info{
                    color:#808080;
                }
                
            }
            }
        }
    }

}

    .old-coupon{
        margin-left:10px;
        border-radius: 10px;
        display: inline-block;
        height:70px;
        width:140px;

        // background: #FDC830;  /* fallback for old browsers */
        // background: -webkit-linear-gradient(to left, #F37335, #FDC830);  /* Chrome 10-25, Safari 5.1-6 */
        // background: linear-gradient(to left, #F37335, #FDC830); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */





        background: #FC5C7D;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #6A82FB, #FC5C7D);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #6A82FB, #FC5C7D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
        color:#fff;
        .main-info{
            height:40px;
           
            border-bottom:1.2px dashed #fff;
             font-size:26px;
             
            .left-amount{
                box-sizing: border-box;
                height:100%;
                width:65%;
                padding-right:5px;
                text-align:right;
                float:left;
                font-size:26px;
                font-weight:bold;
            }
            .right-desc-text{
                box-sizing: border-box;
                float:right;
                height:100%;
                width:34%;
                text-align: left;
                line-height:270%;
                font-size:16px;
            }

        }
        .sub-info{
            
            font-size:12px;
            height:30px;
        }

    }



</style>