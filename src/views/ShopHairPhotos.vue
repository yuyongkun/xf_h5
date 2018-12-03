<template>
  <div class="shop-hair-photos">
    <p class="no-prod-tip" v-show="!loading && photos.length === 0">这里还没有发型照片呢^_^</p>
    <p class="no-prod-tip" v-show="loading">努力加载中^_^</p>
    <ul class="photo-list">
      <li v-for="(photo, index) in photos" :key="index">
        <a v-if="photo.link" :href="photo.link">
          <img :src="photo.photo" alt="image">
        </a>
        <img class="not-link" :src="photo.photo" alt="image" v-else>
      </li>
    </ul>
  </div>
</template>

<script>
import { getShopHairPhoto } from '../api/api'

export default {
  name: '',

  data () {
    return {
      shopId: this.$route.params.shopId,
      loading: false,
      photos: []
    }
  },

  methods: {
    fetchData () {
      this.photos = []
      this.loading = true
      getShopHairPhoto(this.shopId).then(resp => {
        this.$toast('获取数据成功')
        this.photos = resp.data
        this.loading = false
      }).catch(e => {
        this.loading = false
        this.$toast.error('系统错误')
      })
    }
  },

  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
.shop-hair-photos {
  .no-prod-tip {
    text-align: center;
  }
  .photo-list {
    padding: 30px 15px;
    a, img {
      display: block;
    }
    a, img.not-link {
      margin-bottom: 15px;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
