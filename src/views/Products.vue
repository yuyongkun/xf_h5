<template>
  <div class="product-list-view">
    <div class="product-list">
      <p class="no-prod-tip" v-show="!loading && products.length === 0">这里还没有商品呢^_^</p>
      <p class="no-prod-tip" v-show="loading">努力加载中^_^</p>

      <div class="list-block accordion-list">
        <ul>
          <li class="accordion-item"
            v-for="product in products" :key="product.prodId"
            :class="{ 'accordion-item-expanded': product.expanded }"
            @click="toggleAcCollapse(product)">
            <a href="javascript:;" class="item-link item-content">
              <div class="item-inner">{{ product.name }}</div>
            </a>
            <div class="accordion-item-content">
              <router-link class="item-content-link" :to="{ name: 'Product', params: { shopId: $route.params.shopId, prodId: product.prodId } }">
                <div class="list-item clearfix">
                  <div class="prod-img">
                    <img :src="product.photos[0]" alt="">
                  </div>
                  <p class="prod-detail">
                    <span class="title">{{ product.name }}</span>
                    <span class="price">
                      <span class="symbol">￥</span><span class="num">{{ product.price }}</span>
                    </span>
                    <span class="desc" v-if="product.desc">{{ product.desc }}</span>
                  </p>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { listProductByShop } from '../api/api'
  export default {
    name: 'Products',

    data () {
      return {
        loading: true,
        products: []
      }
    },

    methods: {
      toggleAcCollapse (product) {
        product.expanded = !product.expanded
      }
    },

    mounted () {
      const shopId = this.$route.params.shopId
      this.loading = true
      listProductByShop(shopId).then(data => {
        this.loading = false
        this.products = data.data.products.map(prod => {
          prod.expanded = true
          return prod
        })
      }).catch(e => {
        this.loading = false
        console.error(e)
        Toast('系统错误')
      })
    }
  }
</script>

<style scoped>
  .no-prod-tip {
    text-align: center;
  }

  .item-content-link {
    display: block;
  }
  .list-item {
    background-color: #ffffff;
    padding: 20px 20px 20px 10px;
  }
  .list-item .prod-img {
    position: relative;
    width: 64px;
    width: 64px;
    float: left;
  }
  .list-item .prod-img img {
    width: 100%;
  }
  .prod-detail {
    float: left;
    overflow: hidden;
    margin: 0;
    padding-left: 12px;
  }
  .prod-detail .title,
  .prod-detail .price,
  .prod-detail .desc {
    display: block;
  }
  .prod-detail .title {
    color: #000000;
    font-size: 16px;
    font-weight: bold;
  }
  .prod-detail .price {
    padding-top: 30px;
    font-weight: bold;
    color: red;
  }
  .prod-detail .price .symbol {
    font-size: 12px;
  }
  .prod-detail .desc {
    font-size: 12px;
    color: #b3b3b3;
  }
</style>
