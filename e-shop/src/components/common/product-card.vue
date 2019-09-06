<template>
  <div class="product-card g-white-card">
    <div class="top">
      <selected-panel @selected-change="handleShopSelected" v-model="productsCard.isSelected">
        <div class="store-title" slot="right">
          <van-icon name="shop-o"></van-icon>
          <span class="store-name">{{productsCard.storeName}}</span>
        </div>
      </selected-panel>
    </div>

    <div class="main">
      <product-card-swipe
        slot="right"
        :deep="deep"
        @products-item-selected-change="handleItemChange"
        @delete-product="handleProductDelete"
        v-for="(item,index) in productsCard.goodsList"
        :key="item.productId"
        v-model="productsCard.goodsList[index]"
      ></product-card-swipe>
    </div>

    <div></div>
  </div>
</template>

<script>
import selectedPanel from "@/components/common/selected-panel";
import productCardSwipe from "@/components/common/product-card-swipe";

export default {
  props: {
    value: {
      type: Object,
      default: {}
    },
    deep: {
      type: Boolean,
      default: false
    }
  },
  components: {
    selectedPanel,
    productCardSwipe
  },
  data: function() {
    return {
      shop: false,
      productsCard: this.value,
    };
  },
  computed: {},
  watch: {
    productsCard: function(val) {
      this.$emit("input", val);
    },
    "productsCard.isSelected": function(val) {
      this.$emit("selected-shop");
    }
  },

  methods: {
    handleShopSelected(val) {
      for (var i = 0; i < this.productsCard.goodsList.length; i++) {
        var tep = {};
        // tep=JSON.parse(JSON.stringify(this.productsCard.goodsList[i]));
        //console.log(tep);
        //tep.isSelected=val;
        this.productsCard.goodsList[i].isSelected = val;
        tep = this.productsCard.goodsList[i];
        this.$set(this.productsCard.goodsList, i, tep);
      }
    },
    handleProductDelete: function(val) {
      for (var i = 0; i < this.productsCard.goodsList.length; i++) {
        var tepItem = this.productsCard.goodsList[i];
        if (val.productId == tepItem.productId && val.skuId == tepItem.sku.id) {
          this.productsCard.goodsList.splice(i, 1);
        }
      }

      this.$emit("delete-product", val);
    },
    handleItemChange: function() {
      var tep = true;

      for (var i = 0; i < this.productsCard.goodsList.length; i++) {
        tep = tep && this.productsCard.goodsList[i].isSelected;
      }
      this.productsCard.isSelected = tep;
    }
  }
};
</script>

<style lang="less" scoped>
.product-card {
  box-sizing: border-box;
  margin-bottom: 15px;

  padding-top: 10px;
  min-height: 170px;
  text-align: left;

  .top {
    height: 30px;
    line-height: 30px;
    .store-title {
      height: 100%;
      padding-left: 10px;
      position: relative;
      .van-icon {
        position: absolute;
        top: 50%;
        margin-top: -9px;
        font-size: 18px;
        color: @color-gray-font;
      }
      .store-name {
        margin-left: 25px;
        font-size: 14px;
      }
    }
  }

  .main {
    margin-top: 5px;
  }
}
</style>
