<template>
    <van-popup v-model="visible.page" position="bottom">
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            @add="onAdd"
            @edit="onEdit"/>
    </van-popup>
</template>

<script>
export default {
    props:{
        value:{
            type:Boolean,
            default:false,
        }
    },
    data:function(){
        return{
            visible:{
                page:this.value,
            },
            chosenAddressId: '1',
            list: [
                {
                id: '1',
                name: '张三',
                tel: '13000000000',
                address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                },
                {
                id: '2',
                name: '李四',
                tel: '1310000000',
                address: '浙江省杭州市拱墅区莫干山路 50 号'
                }
            ],
            disabledList: [
                {
                id: '3',
                name: '王五',
                tel: '1320000000',
                address: '浙江省杭州市滨江区江南大道 15 号'
                }
            ]
        }
    },
    watch:{
        value:function(val){
            this.visible.page=val;
        },
        'visible.page':function(val){
            this.$emit('input',val);
        }
    },
    methods:{
        onAdd() {
            Toast('新增地址');
        },

        onEdit(item, index) {
            Toast('编辑地址:' + index);
        }
    }
}    

</script>

<style lang="less" scoped>

</style>
