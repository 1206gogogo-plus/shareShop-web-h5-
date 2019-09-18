<template>
  <div class="user-evaluation">

    <van-nav-bar
        title="Evaluation Center"
        left-text="Back"
        right-text="All Orders"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onAllOrders"
    />

    <div class="summary">
      <div class="left" @click="onHeadImg()">
          <img
            class="head-img"
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3914950518,3569645197&fm=26&gp=0.jpg"
            alt
          />
      </div>
      <div class="right" >
        <div class="right-child" @click="onAllEval()">All Eval<br>
          {{this.evalCount}}
        </div>
        <div class="right-child" @click="onPicEval()">Pic Eval<br>
          {{this.picEvalCount}}
        </div>
        <div class="right-child" @click="onQnA()">Q&A<br>
          {{this.qaCount}}
        </div>
      </div>
      
      <div class="comment-goods">
        

      </div>


    </div>

  </div>

 

</template>

<script>
  export default {
    data(){
      return {
        evalCount:30,
        picEvalCount:10,
        qaCount:20,
        goodList:{
            
        },
      }
    },
    mounted:function(){
        this.http.get(
                this.api.category.getFirstLevel,
               'status:1',
                response=>{
                    if(response.status==200&&response.data.code==200){
                      this.goodList=response.data.data;
                      console.log(response.data.msg);
                    }      
                },
                error=>{
                    console.log(error);
                }
                )
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      onAllOrders() {
        this.$router.push({name:'getAllOrders'});
      },
      onHeadImg(){
        this.$router.push({name:'editmsg'});
      },
      onQnA(){
        console.log("获取全部问答待实现。。。");
      },
      onAllEval(){
        console.log("获取全部评价待实现。。。");
      },
      onPicEval(){
        console.log("获取带图评价待实现。。。");
      },

    }

  }
</script>
<!--scoped属性使得设置的样式只作用于当前组件-->
<style lang="less" scoped>
.user-evaluation{
  background-color:#f5f5f5;

  .summary{
    display:flex;
    margin:5px;
    background-color:white;
    height:100px;
    border-radius: 15px;

    .left{
      //display:inline;
      width: 60px;
      margin-right: 5px;
      padding:10px;
      //border:1px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      .head-img{
        overflow: hidden;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        border: 2px solid rgba(255, 255, 255, 0.86);
      }
    }
    .right{
      margin:5px;
      padding-top:15px;
      display:flex;
      height:65px;
      width:100%;
      //text-decoration-color: aquamarine;
      .right-child{
        flex:1;
        text-align: center;       
        line-height: 30px;
      }
    }
    
  }
}

</style>