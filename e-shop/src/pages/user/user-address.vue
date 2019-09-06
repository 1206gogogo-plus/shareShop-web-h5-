<template>
    <div>
        <van-nav-bar
        title="My Address"
        left-text="Back"
        right-text="Add"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onAdd"
        />

          
        <van-address-list
        v-if="flag"
        v-model="chosenAddressId"
        :list="list"
        @edit="onEdit"
        @add="onAdd"
        />
          
    
    </div>
</template>

<script>
export default {
  data() {
    return {
      flag:false,
      chosenAddressId: '',
      list: [
        {
          id: '',
          name: '',
          tel: '',
          address: ''
        }
      ],
      list1:{
          id: '',
          name: '',
          tel: '',
          address: ''
      },
    }
  },
  methods: {
    onClickLeft() {
        this.$router.back(-1);
    },
    onAdd() {
        this.$router.push({name:'addAddress'});
    },

    onEdit(item, index) {
        Toast('编辑地址:' + index);
    },
    getListByUser(){
        this.http.get(
            this.api.address.getListByUser, 
            '',
            response=>{
                if(response.status==200){
                  
                  //console.log(response)
                  if(response.data.code == 200){
                      let ch = response.data.data.indata;
                  
                      if(ch.length > 0){
                          this.list[0].id=ch[0].userAddrId;
                          this.list[0].name=ch[0].consigneeName;
                          this.list[0].tel=ch[0].phone;
                          this.list[0].address=ch[0].firstAddr + "  " + ch[0].city + "  " + ch[0].state ;
                          if(ch[0].isDefault == 1)
                              this.chosenAddressId=ch[0].userAddrId;
                      }
                      
                      for(var i = 1; i < ch.length; i++){
                          //console.log(this.list1);
                          this.list1 = {};  //每次要先清空，不然重复添加
                          this.list1.id = ch[i].userAddrId;
                          this.list1.name = ch[i].consigneeName;
                          this.list1.tel=ch[i].phone;
                          this.list1.address=ch[i].firstAddr + "  " + ch[i].city + "  " + ch[i].state ;
                          //console.log(this.list1);
                          if(ch[i].isDefault == 1)
                              this.chosenAddressId=ch[i].userAddrId;
                          this.list.push(this.list1);

                      }
                      this.flag=true;
                  }
                   
                }
                
            },
            error=>{

            }
            )
    }
  },
  mounted(){
      this.getListByUser();
  }
}
</script>

<style scoped>
.vbutt{
  margin-top: 10px;
}
</style>


