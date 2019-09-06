<template>
    <div class="input-box">
        <div ref="boxLabel" :class="'input-label' + (isFocus?' input-label__focus':'') + (isEmpty?'':' not-empty')">{{label}}</div>
        <van-field :required="required" :class="isFocus?'van-field__focus':''" ref="boxValue" v-model="localInputValue" :type="type" @focus="handleFocus" @blur="handleBlur" clearable>
            <slot name="button" slot="button"></slot>
        </van-field>
    </div>    
</template>
<script>
export default {
    model:{
        prop:"inputValue",
        event:"changeValue",
    },
    props:{
        label:{
            type:String,
            default:'default',
        },
        type:{
            type:String,
            default:''
        },
        inputValue:{
            type:String,
            default:''
        },
        required:{
            type:Boolean,
            default:false,
        }
    },
    data:function(){
        return{
            localInputValue:this.inputValue,
            isFocus:false,
            isEmpty:this.inputValue.length==0?true:false,
        }
    },
    watch:{
        inputValue:function(val){
            this.localInputValue=val;
        },
        localInputValue:function(val){
           
            if(val.length==0){
                this.isEmpty=true;
            }
            else{
                this.isEmpty=false;
            }
            
            this.$emit("changeValue",val);
        }
    },
    methods:{
        handleFocus:function(){
            //console.log("focus");
            this.isFocus=true;
        },
        handleBlur:function(){
            this.isFocus=false;
        },

        
    }
}
</script>

<style lang="less" scoped>
    .input-box{
        width:100%;
        height:70px;
        position:relative;
        border:1px solid #fff;
        padding-bottom:0px;
        .input-label{
            //穿透商城元素，避免输入框被遮挡造成输入框点击时无法focus
            pointer-events: none;

            position: absolute;
            z-index:5;
            height:20px;
            width:100%;
            color:@color-gray-font;
            top:25px;
            font-size:14px;
            text-align:left;
            transition: top 0.2s linear;
        }
        .input-label__focus{
            
             color:@color-blue;
             top:0px;
             font-size:15px;
            
        }
        .van-field{
            
            margin-top:20px;
            padding-top:5px;
            padding-left:0px;
            padding-right:0px;
            padding-bottom:5px;
            border-bottom:1px solid @color-darkgray-border;
            transition: all 0.2s linear;
        }
        .van-field__focus{
            border-bottom:2px solid @color-blue;
        }
        .not-empty{
            top:0px;
            font-size:15px;
        }
    }

</style>
