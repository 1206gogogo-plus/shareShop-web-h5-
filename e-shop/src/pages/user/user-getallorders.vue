<template>
    <div class="user-getallorders">

         <van-nav-bar
        title="All Orders"
        left-text="Back"
        right-text="Add"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onAdd"
        />

    </div>
    
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        onClickLeft() {
        this.$router.back(-1);
        },
        onAdd(){
            this.$toast("to be written")
        }
    }
}
</script>