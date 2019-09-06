<template>
    <main-frame>
        <span slot="title-slogan">
           <div class="row1">Sign up</div>
           <div class="row2">Find a new life style here.</div>
        </span>

        <div slot="center-area" class="g-center-col">
            <input-box label="Email" v-model="user.email"></input-box>
            <input-box label="Phone Number" v-model="user.phoneNumber"></input-box>
            <input-box label="Username" v-model="user.userLogin.username"></input-box>
            <input-box label="Password" type="password" v-model="user.userLogin.password"></input-box>
            <input-box label="Confirm Password" type="password" v-model="user.confirmPassword"></input-box>
            <div class="identify-code">
                <input-box label="Identify Code" v-model="identifyCode">
                </input-box>
                <van-button type="info" :disabled="countDown.status" 
                            plain @click="getIndentify" size="small">
                        {{countDown.status?countDown.seconds+" s":" Get Identify Code"}}
                </van-button>
            </div>
            <van-button class="sign-up" type="info" @click="signUp" 
                        :loading="isLoading" loading-text="loading" >
                        Sign Up
            </van-button>

            <div class="sign-in-tips">
                 <span>Already have account? </span>
                 <span class="g-tips-href" @click="goSignIn">Sign in</span>
            </div>

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
                email:'',
                phoneNumber:"",
                userLogin:{
                    username:'',
                    password:'',
                },
                //confirmPassword:'',
            },
            identifyCode:'',
            isLoading:false,
            countDown:{
                status:false,
                totalSeconds:60,
                seconds:60,
            },
        }
    },

    methods:{
        countDownOption:function(){

        },
        getIndentify:function(){
           
            this.global.countDownOption(this.countDown);

        },
        signUp:function(){
            var _this=this;
            var data={};
            
            this.isLoading=true;
            this.http.post(
                this.api.user.register,
                this.user,
                response=>{
                    if(response.data.code==200){
                        alert("success");
                    }
                },
                error=>{

                }
            );



            setTimeout(function(){
                _this.isLoading=false;
            },1000*5);
        },
        goSignIn:function(){
           
            this.$router.push({path:'/login'});
        }

    }

}
</script>

<style lang="less" scoped>
   
       
   
        .g-center-col{
            
            .identify-code{
                width:100%;
                height:70px;
               .input-box{
                   float:left;
                    width:50%;
                }
                .van-button{
                    float:right;
                    width:44%;
                    margin-top:20px;
                    height:35px;
                    //padding:0 5px;
                }
                
            }

            .sign-up{
                margin-top:10px;
                width:100%;
                background-color:@color-blue;

            }

            .sign-in-tips{
                margin-top:10px;
                padding-bottom:10px;
                color:@color-gray-font;
                font-size:14px;

            }

        }

      
    
    
</style>
