<template>
     <div >    
        <div v-for="(item,key) in value">
           <attr-button ref="ab" :tag='item'></attr-button>
        </div>
        
     </div>
</template>

<script>
import attrbutton from '@/components/product/attr-button.vue'

export default {
    data(){
        return{
            sel:'',
        }
    },
    props:{
        value:{
            type:Array
        },
    },
    components:{
        'attr-button':attrbutton,
        
    },
    methods:{
        buntt(){
            let chil = this.$refs.ab;           
            var len = chil.length;
            for(var i = 0; i < len; i++){ 
                if(chil[i].flag == true){
                    this.sel=chil[i].sel;
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
