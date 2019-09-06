<template>
    <div>
        <van-nav-bar
        title="My Address"
        left-text="Back"
        left-arrow
        @click-left="onClickLeft"
        />
        
        <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
export default {
  data() {
    return {
        areaList:{
            province_list: {
            110000: 'Alabama',
            120000: '天津市'
            },
            city_list: {
            110100: 'Montgomery',
            110200: '县',
            120100: '天津市',
            120200: '县'
            },
        },
        searchResult: [],
        addressInfo:{
            name:'',
            tel:'',
            postalCode:"",
            province:'',
            city:'',
            addressDetail:'',
            isDefault:false,
        }
    }
  },

  methods: {
    onClickLeft() {
        this.$router.back(-1);
    },
    onSave(content) {
        
        this.http.post(
            
            this.api.address.add,
            {
                consigneeName:content.name,
                postalCode:content.postalCode,
                phone:content.tel,
                state:content.province,
                city:content.city,
                firstAddr:content.addressDetail,
                isDefault:content.isDefault?'1':'0',
            },
            response=>{
                if(response.status==200&&response.data.code==200){
                    this.$router.push({name:'addressManager'});
                    
                }
            },
            error=>{

            }
        );
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    }
  }
}
</script>

