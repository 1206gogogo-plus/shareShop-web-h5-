<template>
    <van-popup class="product-sku" position="bottom" v-model="visibility.page">
        <div class="head">
            <div class="thumb">
                <img :src='images' alt="wait a minute">
            </div>
            <div class="info">
                <div class="title">{{productData.productName}}</div>
                <div class="price" v-if="flag">{{productData.minPriceVip}}---{{productData.maxPriceVip}}</div>
                <div class="price" v-if="!flag">{{productData.minPriceVip}}</div>
                <div class="stock">{{productData.stock}}</div>
            </div>
            <div class="close-button">
                <van-icon name="close" @click="hideSkuPage"></van-icon>
            </div>
        </div>
        
        <div class="body" v-for="(item,key) in attributeList">
            <panel-with-title :title='item.attributeKey' >   
                <div slot="main" class=""><product-attr :value="item.attributeValue" ref="proattr" ></product-attr></div>
            </panel-with-title>    
        </div>
        <div class="body">
            <panel-with-title title='Purchase quantity' >   
                <div slot="main" class="addNum"><van-stepper v-model="num"/></div>
            </panel-with-title>    
        </div>
        <van-submit-bar button-text="Add to Cart" @submit="addtoCart()"></van-submit-bar>

    </van-popup>
</template>

<script>
import panelWithTitle from '@/components/public/panel-with-title';
import productattr from '@/components/product/product-attr';

export default {

    props:{
        value:{
            type:Boolean,
            default:false,
        },
       
    },
    components:{
        panelWithTitle,
        'product-attr':productattr,
    },
    data:function(){
        return{
            visibility:{
                page:this.value,
            },
            num:1,
            productData:{},
            images:'',
            flag:true,
            minPrice:'',
            maxPrice:'',
            attributeList:[{}],
            productSpecs:[{}],
            prospec:[],         //存选中的属性
            specs:{},       //存放规格
            attrkey:[],     //存放属性key
        }
    },
    watch:{
        value:function(val){
            this.visibility.page=val;
        },
        'visibility.page':function(val){
            this.$emit("input",val);
        }
    },
    methods:{
        hideSkuPage:function(){
            this.visibility.page=false;
        },
        getDetailById(){
            //console.log(this.$route.params.id);
            var _this=this;
            var params={
                id:this.$route.params.id,
            };

            this.http.get(
                this.api.product.getDetailById,
                params,
                response=>{
                    if(response.data.code==200){
                          this.productData=response.data.data;
                          this.images=response.data.data.mainImage;
                          this.minPrice=response.data.data.minPrice;
                          this.maxPrice=response.data.data.maxPrice;
                          this.attributeList=JSON.parse(this.productData.attributeList);
                          this.productSpecs=this.productData.productSpecs;
                          //console.log(this.productSpecs);
                          if(this.minPrice==this.maxPrice){
                              this.flag=false;
                          }
                          //console.log(JSON.parse("\'"+_this.productData.attributeList+"\'"));
                          console.log(response);
                          //console.log(this.attributeList);
                    }
                    else{
                        
                    }
                  
                },
                error=>{

                }
            )

        },
        addtoCart(){
            //将商品添加到购物车，要做一些验证
            //console.log('addtocart');
            
            let ch = this.$refs.proattr;
            //console.log(ch);
            var len = this.$refs.proattr.length;
            for(var i = 0 ; i < len; i++){
                ch[i].buntt();      //暂未解决
                this.prospec.push(ch[i].sel);
                //console.log(this.prospec);
            }
            
            for(var x = 0; x < this.attributeList.length; x++){
                var m = this.attributeList[x].attributeKey;
                this.attrkey.push(m);
            }
            console.log(this.attrkey);
            var index1 = 0;
            var index2 = 0;
            for(var j = 0; j < this.productSpecs.length; j++){
                this.specs=JSON.parse(this.productSpecs[j].specs);
                console.log(this.prospec[index1++]);
                var y = this.attrkey[index2++];
                console.log(y)
                //console.log(this.specs.y);      //就是得不到属性的key
                    
                //console.log(this.specs.color)
                //console.log(this.specs.size)
            }
            
            this.attrkey=[];

            var params={
                productId:this.$route.params.id,   //商品id
                productSpecsId:1,       //规格id
                productQuantity:this.num,
            };

            this.http.post(
                this.api.cart.addToCart, 
                params,
                response=>{
                    if(response.data.code==200){
                          alert("success to shopcart")
                    }
                    else{
                        
                    }
                  
                },
                error=>{

                }
            )
        }
        
    },
    mounted(){
        this.getDetailById();
        
    },

}
</script>

<style lang="less" scoped>
.product-sku{
    height:85%;
    width:100%;
    overflow:visible;
    .head{
        
        height:80px;
        display: flex;
        //border-bottom:1px dashed @color-lightgray-border;
        .thumb{
            z-index:2008;
            margin-top:-20px;
            width:100px;
            height:100px;
            //border:1px solid red;
            background-color:lightgray;
        }

        .info{
            display: flex;
            flex-direction: column;
            margin-left:8px;
            flex-grow: 1;
            text-align: left;
            .title{
                
            }
            .price{
                 padding-top:4px;
                color:@color-red-font;
            }
            .stock{
                padding-top:4px;
                font-size:14px;
                color:@color-gray-font;
                
            }
        }
        .close-button{
            width:30px;
            font-size:20px;
            margin-top:10px;
            margin-right:5px;
            align-self: top;

        }
    }

    .body{
        padding-top:10px;
        .addNum{
            margin-left:10px;
            margin-top:10px;
            float:left;
        }
    }



}
</style>
