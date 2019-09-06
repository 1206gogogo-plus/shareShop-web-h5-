<template>
    <div class="three-part-panel">
        <div class="header">
            <van-icon class="back-icon" @click="goBack" name="arrow-left"></van-icon>
            <div class="title">
                <slot name="title-slogan">
                    <div class="row1">Sign Up</div>
                    <div class="row2">Find a new life style there </div>             
                </slot>
            </div>
        </div>
        <div  class="center-area g-white-card">
            <slot name="center-area">
                
            </slot>
        </div>
        <div class="footer">
            <slot name="footer">
                 <div> Copyright© 2019 ShareShop All Right Reserverd </div> 
            </slot>
        </div>

    </div>    
</template>

<script>
export default {
    data:function(){
        return{

        }
    },
    methods:{
        goBack:function(){
            this.$router.back(1);
        },
    }
}
</script>

<style lang="less" scoped>
@center-area-height:380px;
@center-area-width:100%;

.three-part-panel{
    min-height:100%;
    
    .header{
        min-height:150px;
        position: relative;
        width:100%;
        box-sizing: border-box;
        text-align: left;

        .back-icon{
            //display: none;
            position: absolute;
            top:15px;
            left:15px;
            font-size:26px;
            font-weight:700;
            color:#000;
            //padding:15px 0 0 15px;
            
            width:36px;
            height:36px;
            line-height:36px;
            text-align: center;
            border-radius: 100%;
            //color:#fff;
            //background-color:@color-gray-transparent-background;
        }

        .title{
            position: absolute;
            font-size:30px;
            letter-spacing:0px;
            text-align:left;
            //padding-left:25px;
            bottom:10px;
            left:30px;
            font-weight: 700;
            //border:1px solid red;

            .row2{
                padding-top:10px;
                font-size:20px;
            }
        }

    }
    .center-area{
        position:relative;
        min-height:380px;
       
        padding-top:10px;
        width:100%;
       
    }

    .footer{
        z-index:3;
        //border:1px solid red;
        box-sizing: border-box;
        position: relative;
        width:100%;
        min-height: 50px;
        bottom:0px;

        font-size:8px;
        color:@color-gray-font;
        //margin-top:@center-area-height / 8 *5;

        div{
            position: absolute;;
            bottom:5px;
            width:100%;
        }
}
        
    
}
</style>
