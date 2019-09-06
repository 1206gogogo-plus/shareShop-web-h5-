<template>
  <div class="main-body">
    <div class="header">
      <div class="left" @click="goBack()">
        <van-icon name="arrow-left"  />
        <span class="label">back</span>
      </div>
      <div class="center">Personal information</div>
      <div class="right"></div>
    </div>
    <div class="main">
      <div class="photo">
        <img
          class="head-img"
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3914950518,3569645197&fm=26&gp=0.jpg"
          alt
        />
      </div>

      <van-uploader
        :after-read="onRead"
        accept="image/gif, image/jpeg, image/jpg"
        multiple
        class="photo-upload"
      >
        <van-icon name="photograph" color="#fff" size="20px"/>
      </van-uploader>

      <!-- 修改中
            去掉了left-icon="contact"
      -->
      <van-cell-group>
        <van-field
          v-model="userData.username"
          label="UserName："
          input-align="right"
          label-align="left"
          placeholder="Please edit your username"
          disabled
        />
        <van-field
          v-model="userData.name"
          label="Name："
          input-align="right"
          label-align="left"
          placeholder="Please edit your name"
          disabled
        />
        <van-field
          v-model="userData.gender"
          label="Gender："
          input-align="right"
          label-align="left"
          placeholder="Please edit your gender"
          disabled
        />
        <van-field
          v-model="userData.email"
          label="Email："
          input-align="right"
          label-align="left"
          placeholder="Please edit your email address"
          disabled
        />
        <van-field
          v-model="userData.phoneNumber"
          label="PhoneNumber："
          label-width="100px"
          input-align="right"
          label-align="left"
          placeholder="Please edit your phone number"
          disabled
        />
        <van-field
          v-model="userData.birthday"
          label="Birthday："
          label-width="100px"
          input-align="right"
          label-align="left"
          placeholder="Please edit your birthday"
          disabled
        />
      </van-cell-group>
      <button class="van-button van-button--primary van-button--large" @click="edit()">
        <span class="van-button__text">Edit Information</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {}
    };
  },
  methods: {
    init() {
      this.http.get(
        this.api.user.getInfo,
        "",
        response => {
          if (response.data.code == 200) {
            this.userData = response.data.data;
            console.log(this.userData);
          } else {
          }
        },
        error => {}
      );
    },
    goBack: function() {
      this.$router.back(1);
    },
    edit() {
      console.log("Edit the message没实现");
    },
    onRead(file) {
      console.log(file); //打印文件的信息
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@header-height: 50px;
@normal-width: 96%;
@normal-radius: 15px;
.main-body {
  background: @color-blue;
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
    padding-top: 50px;
    z-index: 10;
    .photo {
      width: 100px;
      //border:1px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px 33%;
      margin-bottom: 5%;
      .head-img {
        overflow: hidden;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        border: 2px solid rgba(255, 255, 255, 0.86);
      }
    }
    .photo-upload {
      position: relative;
      margin-right: 20px;
    }
  }
}
</style>
