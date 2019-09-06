import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state={
    user:{
        
    },
    isLogined:false,
    num_productsInCart:0,

};
const mutations={
    update_num_ProductsInCart(state,payload){
        state.num_productsInCart=payload.num;
    },
    update_isLogined(state,payload){
        state.isLogined=payload.isLogined;
    },
    update_userInfo(state,payload){
        state.user=payload.user;
    }
    


};

const store=new Vuex.Store({
    state,
    mutations,

});

export default store;