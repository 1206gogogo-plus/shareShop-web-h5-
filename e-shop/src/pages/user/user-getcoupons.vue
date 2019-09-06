<template>
  <div class="my-coupons">
    <div class="header">
      <div class="left" @click="goBack">
        <van-icon name="arrow-left" />
        <span class="label">back</span>
      </div>
      <div class="center">My Coupons</div>
      <div class="right"></div>
    </div>
    <div class="main">
      <div class="coupon-list" >
        <v-couponlist :couponList="couponList"></v-couponlist>
      </div>
    </div>
  </div>
</template>


<script>
import CouponList from "@/components/coupon/coupon-list"
export default {
  data(){
    return{
      couponList:[],
    }
  },
  mounted: function() {
    this.getCouponList();
  },
  components:{
    'v-couponlist':CouponList
  },
  methods: {
    goBack: function() {
      this.$router.back(-1);
    },
    getCouponList:function(){
            
            this.http.get(
                //获取后台数据 在request中的api.js中
                this.api.coupon.getListOfUser,
                //无参数 
                '',
                //拿到数据
                response=>{
                    //判断是否拿到数据
                    if(response.status==200&&response.data.code==200){
                        //控制台输出拿到的东西response
                        console.log(response);
                        //将拿到的收藏列表数据赋值给couponList
                        this.couponList=response.data.data.indata;
                        console.log(this.couponList);
                    }
                }

            )


        }
  }
};
</script>


<style lang="less" scoped>
@header-height: 50px;
@normal-width: 96%;
@normal-radius: 15px;
.my-coupons {
  .header {
    z-index: 20;
    background: @color-blue;
    height: @header-height;
    position: fixed;
    top: 0;
    width: 100%;
    color: #fff;

    line-height: @header-height - 20px;

    margin-bottom: 10px;
    display: flex;
    .left {
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      //padding-bottom:20px;
      .van-icon {
      }
      .label {
      }
    }
    .center {
      flex-grow: 1;
      text-align: center;
      margin-right: (100% - @normal-width) / 2;
      font-size: 20px;
      font-weight: bold;
      line-height: @header-height;
      letter-spacing: 0.4px;
      //padding-bottom:20px;
    }
    .right {
      width: 70px;
    }
  }
  .main {
    margin-top: @header-height;
    padding-top: 10px;
    z-index: 10;
    .coupon-list {
      //.g-card-shadow();
      width: @normal-width;
      min-height: 100px;
      margin: 0 auto;
      //border-radius:@normal-radius;
      //border:1px solid red;
    }
  }
}
</style>