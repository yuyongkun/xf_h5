<template>
  <div class="product-group-view">
    <p class="no-prod-tip" v-if="prodGroups.length === 0">
      暂时没有相关商品^_^
    </p>
    <el-collapse v-model="activeGroups" @change="handleCollapse">
      <el-collapse-item
        v-for="group in prodGroups"
        :key="group.groupId"
        :title="group.name"
        :name="group.groupId">
        <ul>
          <li v-for="product in group.products"
            :key="product.prodId"
            class="group-product-item">
            <router-link class="item-content-link" 
              :to="{ name: 'Product', params: { shopId: $route.params.shopId, prodId: product.prodId } }">
              <div class="media">
                <div class="media-left">
                  <img class="media-object prod-img" :src="product.photos[0]" alt="产品图片">
                </div>
                <div class="media-body">
                  <p class="title">{{ product.name }}</p>
                  <p class="price">
                    <span class="symbol">￥</span><span class="num">{{ product.price }}</span>
                  </p>
                  <p class="desc" v-if="product.desc">{{ product.desc }}</p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { listProductGroup } from '../api/api'

export default {
  name: 'ProductGroup',

  data () {
    return {
      prodGroups: [],
      activeGroups: []
    }
  },

  methods: {
    fetchData () {},

    handleCollapse () {}
  },

  mounted () {
    const shopId = this.$route.params.shopId
    const cateId = this.$route.params.cateId
    listProductGroup(shopId, cateId)
      .then(data => {
        this.prodGroups = data.data.groups
        this.prodGroups.forEach(group => {
          if (group.expand) {
            this.activeGroups.push(group.groupId)
          }
        })
        console.log(data)
      })
      .catch(e => {
        console.error(e)
        this.$toast(`系统错误: ${e.message}`)
      })
  }
}
</script>

<style lang="scss" scoped>
.product-group-view {
  padding: 8px;
  background-color: #fff;
  
  .no-prod-tip {
    text-align: center;
  }

  .item-content-link {
    display: block;
    border-bottom: 1px solid #b0b8c2;
    padding: 8px 0;
  }
  .prod-img {
    position: relative;
    width: 64px;
    width: 64px;
  }
  .prod-img img {
    width: 100%;
  }
  .prod-detail {
    margin: 0;
    padding-left: 12px;
  }
  .title, .price, .desc {
    margin: 0;
  }
  .title {
    color: #000000;
    font-size: 16px;
    font-weight: bold;
  }
  .price {
    padding-top: 15px;
    font-weight: bold;
    color: red;
  }
  .price .symbol {
    font-size: 12px;
  }
  .desc {
    font-size: 12px;
    color: #b3b3b3;
  }
}
</style>
