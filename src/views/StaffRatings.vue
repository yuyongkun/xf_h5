
<template>
  <div class="container">
    <rating-list :row="10" :shopId="shopId" :status="1" :filterStaffId="staffId"></rating-list>
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
      shopId: this.$route.params.shopId,
      staffId: this.$route.params.staffId
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