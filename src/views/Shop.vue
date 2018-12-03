<template>
  <div class="shop-view">
    <div class="shop-view-banner">
      <div>
        <!-- <img :src="item" alt="门店图片" class="shop-img"> -->
        <mt-swipe :show-indicators="false" v-for="(item,index) in shop.banners" :key="index">
          <mt-swipe-item><a :href="item.link"><img :src="item.img" alt="门店图片" class="shop-img"></a></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="shop-detail hairline">
        <h3>{{ shop.name }}</h3>
        <p>营业时间：10:00-23:00</p>
      </div>
      <div class="shop-address">
        <p>{{ shop.address }}</p>
      </div>
    </div>

    <div class="entry-list">
      <!-- <ul>
        <li>
          <a href="javascript:;" @click="showDialog">
            <span class="icon"><img src="../assets/images/jianfa.jpeg" alt="剪发"></span>
            <span class="name">剪发</span>
          </a>
        </li>
        <li>
          <router-link  :to="{name: 'Staffs', params:{ shopId: $route.params.id, cateId: xcCate}}" tag="div" class="menu_detail_link">
            <span class="icon"><img src="../assets/images/xichui.jpg" alt="洗吹"></span>
            <span class="name">洗吹</span>
          </router-link>
        </li>
        <li>
          <router-link  :to="{name: 'Staffs', params:{shopId: $route.params.id, cateId: trCate}}" tag="div" class="menu_detail_link">
            <span class="icon"><img src="../assets/images/tangran.jpg" alt="烫染"></span>
            <span class="name">烫染护</span>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <router-link :to="{ name: 'Product', params: { shopId: $route.params.id, cateId: cjCate, prodId: cjProd.prodId, staffId: 0 } }">
            <span class="icon"><img src="../assets/images/buchajia.jpg" alt="补差价"></span>
            <span class="name">补差价</span>
          </router-link>
        </li>
        <li>
          <a href="http://www.fanxify.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=diypage&id=39" style="display:block;">
            <span class="icon"><img src="../assets/images/faxing-3.jpeg" alt="发型"></span>
            <span class="name">发型</span>
          </a>
        </li>
      </ul> -->
      <ul>
        <li v-for="(entry, index) in entries" :key="index" v-if="entry.show">
          <router-link v-if="entry.type === '1' && entry.show" :to="{name: entry.targetView, params:{shopId: $route.params.id, cateId: entry.category}}" tag="div" class="menu_detail_link">
            <span class="icon"><img :src="entry.photo" :alt="entry.name"></span>
            <span class="name">{{ entry.name }}</span>
          </router-link>
          <a v-if="entry.type === '2' && entry.showDialog && entry.show" href="javascript:;" @click="showDialog">
            <span class="icon"><img :src="entry.photo" :alt="entry.name"></span>
            <span class="name">{{ entry.name }}</span>
          </a>
          <a v-if="entry.type === '3' && entry.show" :href="entry.link">
            <span class="icon"><img :src="entry.photo" :alt="entry.name"></span>
            <span class="name">{{ entry.name }}</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- <staff-list :shop-id="shopId"></staff-list> -->

    <div class="shop-intro">
      <div class="title">门店详情</div>
      <div class="intro hairline">
        <p>{{ shop.intro }}</p>
      </div>
      <div class="tags">
        <ul>
          <li><span><i class="fa fa-check-square-o"></i> 品质保障</span></li>
          <li><span><i class="fa fa-check-square-o"></i> 减少等待</span></li>
          <li><span><i class="fa fa-check-square-o"></i> 消费透明</span></li>
          <li><span><i class="fa fa-check-square-o"></i> 优惠特价</span></li>
        </ul>
      </div>
    </div>
    <div class="rate-intro" >
      <div class="title">服务评价</div>
      <div class="rate-info vux-1px-b">  
          <div class="col">
            <span>{{shopRating.score}}</span>
            <star-rating :star-size="15" :read-only="true" :show-rating="false" :rating="shopRating.score"></star-rating>
          </div>
          <div class="col text">
            <span>{{shopRating.count}}</span>
            <span>评论数</span>
          </div>   
          <div class="col text">
            <span>{{shopRating.percent}}%</span>
            <span>上月好评率</span>   
          </div> 
      </div>
      <section style="height:52px;">
        <mt-navbar class="page-part" v-model="selectedCommentList">
          <mt-tab-item id="1">精选</mt-tab-item>
          <mt-tab-item id="2">最新</mt-tab-item>
        </mt-navbar>
      </section>
      <mt-tab-container v-model="selectedCommentList">
        <mt-tab-container-item id="1">
          <rating-list :row="2" :status="2" :data="featuredRatings" :shopId="shopId" loadonce></rating-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <rating-list :row="2" :status="1" :data="latestRatings" :shopId="shopId" loadonce></rating-list>
        </mt-tab-container-item>
      </mt-tab-container>
      <router-link  :to="{name: 'Ratings', params:{ shopId: shopId}}" >
        <mt-button type="default" size="large">查看更多评论</mt-button>
      </router-link>
    </div>
    <el-dialog 
      custom-class="el-dialog-custom"
      width="80%"
      :show-close="false"
      :visible="dialogVisible">
      <ul class="cate-btn-list">
        <li>
          <router-link  :to="{name: 'Staffs', params:{ shopId: this.$route.params.id, cateId: jjCate }}" tag="div">
            <p class="btn-text">净剪</p>
            <p class="btn-desc">不含洗头费用更优惠，剪完后的碎发会被吸干净</p>
          </router-link>
        </li>
        <li>
          <router-link  :to="{name: 'Staffs', params:{ shopId: this.$route.params.id, cateId: xjCate }}" tag="div">
            <p class="btn-text">洗剪</p>
            <p class="btn-desc">含洗头费用价更高，头发被清洁后更利于修剪</p>
          </router-link>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <mt-button size="large" @click="closeDialog">取消</mt-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { getShop, listCategory, listProductGroup, listComment, getShopEntryConfig } from '../api/api'
  import StaffList from '../components/StaffList.vue'
  import RatingList from '../components/RatingList.vue'
  import StarRating from 'vue-star-rating'
  const COMMENTPAGE = 1
  const COMMENTROW = 2
  const LATEST_COMMENT_STATUS = 1
  const FEATURED_COMMENT_STATUS = 2

  export default {
    name: 'Shop',
    components: { StaffList, StarRating, RatingList },
    data () {
      return {
        shop: {},
        banners: [],
        categoryGroup1: [],
        categoryGroup2: [],
        shopId: this.$route.params.id,
        xjCate: '1',
        jjCate: '2',
        xcCate: '3',
        trCate: '4',
        cjCate: '5',
        cjProd: { prodId: 'a' },
        dialogVisible: false,
        shopRating: {
          score: 0,
          count: '',
          percent: ''
        },

        entries: [],

        featuredRatings: [],
        latestRatings: [],
        selectedCommentList: '1'
      }
    },

    methods: {
      getCJProductInfo () {
        listProductGroup(this.shopId, this.cjCate)
          .then(data => {
            let groups = data.data.groups
            if (groups.length < 1) { return }
            let products = groups[0].products
            if (products.length < 1) { return }
            this.cjProd = products[0]
            console.log(this.cjProd)
          })
      },
      showDialog () {
        this.dialogVisible = true
      },
      closeDialog () {
        this.dialogVisible = false
      },
      getEntryConfig () {
        getShopEntryConfig(this.shopId).then(data => {
          this.entries = data.data
        })
      }
    },

    mounted () {
      let shopId = this.$route.params.id
      this.shopId = shopId
      getShop(shopId).then(data => {
        this.shop = data.data.shop
        // todo 获取优惠券、广告banner,同一接口返回 {img,link}
        this.shop.banners = [{img: this.shop.photo, link: ''}]
        return listCategory()
      }).then(data => {
        let categories = data.data.categories
        this.categoryGroup1 = categories.slice(0, 3)
        this.categoryGroup2 = categories.slice(3)
        return this.getCJProductInfo()
      }).then(() => {
        return this.getEntryConfig()
      }).catch(e => {
        console.error(e)
        Toast(`系统错误: ${e.message}`)
      })

      // 列出评论数据
      listComment(this.shopId, COMMENTPAGE, COMMENTROW, LATEST_COMMENT_STATUS).then(res => {
        if (!res.count) {
          return
        }
        this.shopRating.score = res.score
        this.shopRating.count = res.count
        this.shopRating.percent = res.percent
        this.latestRatings = res.comments
      })

      // 列出精选评论
      listComment(this.shopId, COMMENTPAGE, COMMENTROW, FEATURED_COMMENT_STATUS).then(res => {
        if (!res.count) {
          return
        }
        this.featuredRatings = res.comments
      })
    }
  }
</script>

<style lang="scss">
@import '../assets/styles/variable';
$icon-size: 80px;
.shop-view {
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .mint-swipe {
    height: 50vw;
  }
  .shop-img {
    display: block;
    width: 100vw;
    height: 50vw;
  }
  .shop-detail, .shop-address {
    padding: 12px;
    background-color: #fff;
  }
  .shop-detail h3 {
    margin: 0;
    font-size: 16px;
  }
  .shop-address p, .shop-detail p {
    margin: 0;
    color: #a3a3a3;
    font-size: 13px;
  }
  .shop-detail p {
    padding-top: 4px;
  }
  .hairline:after {
    background-color: #e3e3e3;
    bottom: 0;
  }

  .entry-list {
    margin-top: 10px;
  }
  .entry-list ul {
    display: flex;
    padding: 18px 20px 9px;
    background-color: #ffffff;
    flex-wrap: wrap;
  }
  .entry-list ul li {
    width: 30%;
  }
  .entry-list ul li a {
    color: #434a55;
    text-decoration: none;
  }
  .entry-list ul li a:active,
  .entry-list ul li a:focus,
  .entry-list ul li a:hover {
    background-color: #a3a3a3;
  }
  .entry-list ul li span {
    display: block;
    width: $icon-size;
  }
  .entry-list ul li span.icon {
    width: $icon-size;
    height: $icon-size;
  }
  .entry-list ul li span.icon img {
    width: 100%;
  }
  .entry-list ul li span.name {
    text-align: center;
    font-size: 12px;
    padding-top: 8px;
  }

  .shop-intro, .rate-intro {
    background-color: #ffffff;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .shop-intro .title, .rate-intro .title {
    font-size: 16px;
    color: #e04171;
    padding: 12px 30px;
    border-bottom: 1px solid #e04171;
  }
  .shop-intro .intro {
    padding-bottom: 0px;
  }
  .shop-intro .intro p {
    color: #a3a3a3;
    margin: 0;
    padding: 14px 30px;
    font-size: 14px;
  }
  .shop-intro ul {
    display: flex;
    justify-content: space-around;
    padding: 15px 6px;
  }
  .shop-intro ul li {
    font-size: 12px;
  }
  .shop-intro ul li i {
    color: green;
  }
  .rate-info{
    display: flex;
    margin-top: 10px;
    padding-bottom: 10px;
    font-size: 24px;
    .vue-star-rating{
      display: inline-block;
     
    }
    .col{
      flex:1;
      text-align: center; 
      margin:0 10px;
      &.text span{
        display: block;
        font-size: 24px;
      }
      &.text span + span{
        margin-top: 8px;
        font-size: 12px;
        color: $sub;
      }
    }
  }
  .el-dialog-custom {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 16px 8px 16px;
    }
    .el-dialog__footer {
      padding-bottom: 40px;
    }
  }

  .cate-btn-list {
    padding-top: 30px;
    li {
      background: #4193e0;
      border-radius: 4px;
      color: #fff;
      margin-bottom: 35px;
      text-align: center;
      p {
        padding: 0 6px;
        margin: 0;
        color: #fff;
      }
      p.btn-text {
        padding-top: 20px;
        padding-bottom: 6px;
        font-size: 32px;
        font-weight: bold;
      }
      p.btn-desc {
        font-size: 16px;
        padding-top: 6px;
        padding-bottom: 15px;
      }
    }
  }

  .coupon-entry {
    .content {
      background: #fff;
      text-align: center;
      padding: 15px 0;
      margin-top: 10px;
    }
  }
}

</style>
