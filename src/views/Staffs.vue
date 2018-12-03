
<template>
  <div class="staff-view">
    <div class="shop-view-header">
      <img src="../assets/images/shop-banner.jpg" alt="门店图片" class="shop-img">
      <div class="info">
        <h3>{{ shop.name }} | 10:00-23:00</h3>
        <p class="shopAddress">{{ shop.address }}</p>
      </div>
    </div>
    <staff-queue :shop-id="shopId" :cate-id="cateId"></staff-queue>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { getShop, listCategory } from '../api/api'
  import StaffQueue from '../components/StaffQueue.vue'

  export default {
    name: 'Staffs',
    components: { StaffQueue },
    data () {
      return {
        shop: {},
        shopId: this.$route.params.shopId,
        cateId: this.$route.params.cateId,
        dialogVisible: false
      }
    },

    methods: {
      showDialog () {
        this.dialogVisible = true
      },
      closeDialog () {
        this.dialogVisible = false
      }
    },

    mounted () {
      getShop(this.shopId).then(data => {
        this.shop = data.data.shop
        // todo 获取优惠券、广告banner,同一接口返回 {img,link}
        this.shop.banners = [{img: this.shop.photo, link: ''}]
        return listCategory()
      }).then(data => {
      }).catch(e => {
        console.error(e)
        Toast('系统错误')
      })
    }
  }
</script>

<style lang="scss" scoped>
.staff-view{
  background: #fff;
  height: 100%;
}
$icon-size: 80px;
.shop-view-header{
  color:#fff;
  background: #000;
  position: relative;
  text-align: center;
  .info{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .shopAddress{
    margin: 0;
    padding: 0;
    color: #a3a3a3;
    font-size: 13px;
  }
}

.shop-img {
  display: block;
  width: 100vw;
  height: 50vw;
}

</style>

<template>
  <div class="staff-view">
    <div class="shop-view-header">
      <img src="../assets/images/shop-banner.jpg" alt="门店图片" class="shop-img">
      <div class="info">
        <h3>{{ shop.name }} | 10:00-23:00</h3>
        <p class="shopAddress">{{ shop.address }}</p>
      </div>
    </div>
    <staff-queue :shop-id="shopId" :cate-id="cateId"></staff-queue>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { getShop, listCategory } from '../api/api'
  import StaffQueue from '../components/StaffQueue.vue'

  export default {
    name: 'Staffs',
    components: { StaffQueue },
    data () {
      return {
        shop: {},
        shopId: this.$route.params.shopId,
        cateId: this.$route.params.cateId,
        dialogVisible: false
      }
    },

    methods: {
      showDialog () {
        this.dialogVisible = true
      },
      closeDialog () {
        this.dialogVisible = false
      }
    },

    mounted () {
      getShop(this.shopId).then(data => {
        this.shop = data.data.shop
        // todo 获取优惠券、广告banner,同一接口返回 {img,link}
        this.shop.banners = [{img: this.shop.photo, link: ''}]
        return listCategory()
      }).then(data => {
      }).catch(e => {
        console.error(e)
        Toast('系统错误')
      })
    }
  }
</script>

<style lang="scss" scoped>
.staff-view{
  background: #fff;
  height: 100%;
}
$icon-size: 80px;
.shop-view-header{
  color:#fff;
  background: #000;
  position: relative;
  text-align: center;
  .info{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .shopAddress{
    margin: 0;
    padding: 0;
    color: #a3a3a3;
    font-size: 13px;
  }
}

.shop-img {
  display: block;
  width: 100vw;
  height: 50vw;
}

</style>

