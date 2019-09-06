<template>
    <div class="selected-panel"> 
        <van-checkbox  v-model="isSelected" @input="handleSelectedClick" @change="handleChange"></van-checkbox>
        <div class="right">
            <slot name="right">

            </slot>
        </div>

    </div>
</template>

<script>
export default {
   props:{
       value:{
           type:Boolean,
           default:false,
       },
       //标识isSelected  deep 模式
       deep:{
           type:Boolean,
           default:false
       }
   },
    data:function(){
        return{
            clickFlag:false,
            isSelected:this.value,
        }

    },
    watch:{
        isSelected:function(val){
            this.$emit("input",val);
        },
        value:function(val){
            this.isSelected=val;
        }
    },
   
    methods:{

        //when you click the checkbox , emit a event to adjust the check status of other checkbox of your products card 
        handleSelectedClick:function(){
            this.clickFlag=true;
            
            console.log("click");
        },
        handleChange:function(val){
            if(this.clickFlag||this.deep){
                //console.log(this.clickFlag+"    " + this.deep);
                this.$emit("selected-change",val);
            }
            //this.$emit("selected-change",val);
            this.clickFlag=false;
        }

    }

}
</script>

<style lang="less" scoped>
.selected-panel{
    height:100%;
    display: flex;
    align-items:center;
    /deep/ .van-checkbox{
        flex-shrink:0;
        width:20px;
        margin-top:-3px;
        margin-left:10px;
         .van-icon{
           border-color:@color-darkgray-border;
        }
        
       
    }
    .right{
        align-items:center;
        flex-grow: 1;
        height:100%;
        //border:1px solid red;
    }

}
</style>
