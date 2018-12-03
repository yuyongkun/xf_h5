
<template>
  <div class="container">
    <section class="fixed_box">
       <mt-navbar class="page-part" v-model="selected" fixed>
        <mt-tab-item id="1">精选好评</mt-tab-item>
        <mt-tab-item id="0">最新好评</mt-tab-item>
       </mt-navbar>
    </section>
    <mt-tab-container v-model="selected" style="height:100%;overflow:scroll">
      <mt-tab-container-item id="1">
        <rating-list :row="10" :shopId="shopId" :status="2" style="margin-top:50px;"></rating-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="0" style="height:100%;">
        <rating-list :row="10" :shopId="shopId" :status="1" style="margin-top:50px;"></rating-list>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
import RatingList from '../components/RatingList.vue'
export default {
  name: 'Ratings',
  components: { RatingList },
  data () {
    return {
      selected: '1',
      page: 1,
      ratings: [],
      selectedratings: [],
      loading: false,
      shopId: ''
    }
  },
  methods: {
  },
  created () {
    this.shopId = this.$route.params.shopId
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  height: 100%;
}
</style>