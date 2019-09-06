
export default{

    //分类
    category:{
        getFirstLevel:'pro/category/getList',
        getChildrenByParentId:'pro/category/getListByParentId',
    },
    user:{
        register:'member/login/add',
        login:'member/login/in',
        logOut:'member/login/out',
        getInfo:'member/info/getDetail',
        
    },
    search:{
        byKeyword:'pro/info/search',                //按商品名
        byCategory:'pro/info/getListByCategorySearch',    //按分类
        getList:{
            url:'pro/info/getListSearch',
            field:{
                hotSale:'sales',
                newArrival:'inputTime'
            }
        }
    },

    product:{
        getDetailById:'pro/info/getDetail',
        getDetailByCode:'pro/info/getDetailByCode',
        getList:'pro/info/getList',
        getPicList:'pro/info/getPicList',    //获取商品的所有图片
        getRecommendPro:'pro/info/getRecommendPro'  //获取推荐的商品用作轮播图
    },
    cart:{
        addToCart:'member/shopcart/add',
        getList:'member/shopcart/getListByUser',//获取某用户购物车列表
    },
    //优惠券
    coupon:{
        getList:'pro/coupon/getList',
        getDetail:'pro/coupon/getCouponDetailById', 
        getListOfUser:'pro/coupon/getCouponByUId',  //获取用户优惠券
        receiveOne:'pro/coupon/addCouponReceive',// 领取优惠券
    },
    //收藏
    collect:{
        getListOfUser:'member/collect/getListByUser', //收藏列表
        collectOrNot:'member/collect/collectOrNot',//新增收藏
        getIsCollected:'member/collect/getIsCollected',
    },
    address:{
        getListByUser:'member/address/getListByUser',   //某用户收货地址
        add:'member/address/add'
    }

}