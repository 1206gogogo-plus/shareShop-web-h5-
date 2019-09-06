<template>


    <main-frame>
        <span slot="title-slogan">
            <div class="row1">Sign in</div>
            <div class="row2">Welcome Back!</div>
        </span>
        
        <div slot="center-area" class="g-center-col">

            
                <input-box label="Username or Email" v-model="user.username">
                </input-box>

                <input-box label="Password" v-model="user.password" type="password">
                </input-box>

                <div class="remember-password">
                    <van-checkbox shape="square" v-model="isRememberPasssword">Remember password</van-checkbox>
                </div>

                <div class="sign-in">
                <van-button type="info" :loading="loading" @click="doSignIn">Sign in</van-button> 
                </div>


                <div class="forget-password">Forget password?</div>

                <div class="input-box sign-up">
                    <div class="tips">Don't have account?</div>
                <van-button type="info" plain @click="gotoSignUp">Sign up</van-button> 
                </div>
        </div>
        

        <div slot="footer">
            <div> Copyright© 2019 ShareShop All Right Reserverd </div> 
        </div>

    </main-frame>


    

</template>

<script>
import mainFrame from '@/components/common/three-part-panel';
import inputBox from '@/components/common/input-box';

export default {
    components:{
        mainFrame,
        inputBox,
    },
    data:function(){
        return{
            user:{
                username:"",
                password:"",
            },
            loading:false,
            isRememberPasssword:false,
        }
    },
    mounted(){
        var locuser=this.$cookies.get("user");
        if(locuser){
            this.$forceUpdate();
            this.$set(this.user,'username',locuser.username);
            this.$set(this.user,'password',locuser.password);
           
        }
    },
    methods:{
        doSignIn:function(){

            var _this=this;
            var redirect=this.$route.query.redirect;
            this.loading=true; 
            this.http.post(
                this.api.user.login,
                this.user,
                response=>{
                    if(response.data.code==200)
                    { 
                        this.$store.commit("update_isLogined",{isLogined:true});
                        this.$cookies.set("token",response.data.data);

                        

                        if(this.isRememberPasssword){
                            
                            this.rememberPassword();
                            
                        }
                        if(redirect){
                            this.$router.push({path:redirect});    
                            
                        }
                        else{
                            this.$router.push({path:'/home'});
                            
                        }
                        this.getUserInfo();   
                    }

                    this.loading=false; 
                },
                error=>{
                    this.loading=false; 
                    console.log(error);
                    alert("error");
                }
            );

        },
        //登录完成后获取用户信息存入vuex
        getUserInfo:function(){
            this.http.get(
                this.api.user.getInfo,
                '',
                response=>{
                    if(response.status==200&&response.data.code==200){
                      
                        this.$store.commit("update_userInfo",response.data.data);
                    }
                    //console.log(response.data.data);
                },
                error=>{

                }
            )
        },
        rememberPassword:function(){
            this.$cookies.set("user",this.user)
        },
        goBack:function(){
            this.$router.back(1);
        },
        gotoSignUp:function(){
            //console.log("asdads");
            this.$router.push({path:'/register'});
        }
    }
}
</script>

<style lang="less" scoped>

@center-area-height:380px;
@center-area-width:100%;

   
    
.g-center-col{
    position:relative;
    height:380px;
    .remember-password{
        font-size:14px;
        padding:5px 0px;
        text-align: left;
    }
    
    .sign-in{
        margin-top:10px;;
        .van-button{
            width:100%;
            font-size:16px;
            background-color:@color-blue;
        }
    }

    .forget-password{
        margin-top:5px;
        font-size: 14px;
        color:@color-gray-font;
        text-decoration: underline;

    }

    .sign-up{
        position:absolute;
        bottom:5px;
        height:80px;
        width:100%;
      
        .tips{
            color:@color-gray-font;
            font-size:14px;
        }
        .van-button{
            width:100%;
            margin-top:5px;
        }
    }
}
        //border-radius: 10px;
        //box-shadow:0 1px 5px 0px @color-lightgray-border;
    


</style>
