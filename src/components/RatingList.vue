<template>  
    <div class="content">
      <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0"> -->
      <div class="tips" v-if="ratings.length<=0">
        <p class="text">暂无相关评论</p>
      </div>
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="scrollDisabled" infinite-scroll-distance="250">
          <li class="ratingItem" :key="rating.id" v-for="rating in ratings" >
            <div class="header vux-1px-b">
              <div class="left">
                <img :src="rating.avatar" class="avatar" alt="">
              </div>
              <div class="right">
                <div class="top">
                  <span class="name">{{rating.nickname}} <span class="phone" v-if="rating.phone">{{rating.phone}}</span></span>
                  <star-rating :star-size="15" :read-only="true" :show-rating="false" :rating="rating.rating"></star-rating>
                </div>
                <p class="comment">{{rating.comment}}</p>
                <div class="bottom sub"><span v-if="rating.staffname">发型师： {{rating.staffname}}</span><span>{{ rating.createTime | formatDate('{y}-{m}-{d}') }}</span></div>
              </div>
            </div>
          </li>
      </ul>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { listComment } from '../api/api'
export default {
  name: 'RatingList',
  data () {
    return {
      page: 1,
      loading: false,
      ratings: []
    }
  },
  components: { StarRating },
  props: {
    row: {
      type: Number,
      default () {
        return 10
      }
    },
    status: {
      type: Number,
      default () {
        return 1
      }
    },
    shopId: {
      type: String,
      default () {
        return ''
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    loadonce: {
      type: Boolean,
      default () {
        return false
      }
    },
    filterStaffId: {
      type: String,
      default () {
        return ''
      }
    }
  },
  watch: {
    data: function (val, oldVal) {
      this.ratings = val
    }
  },
  methods: {
    loadMore () {
      if (this.loading || this.data.length || !this.shopId) {
        console.log('not going to fetch data, this.loading: %s, this.data: %j, this.shopId: %s', this.loading, this.data, this.shopId)
        return
      }
      this.loading = true
      listComment(this.shopId, this.page, this.row, this.status).then(res => {
        this.page++
        let comments = res.comments
        if (this.filterStaffId) {
          comments = comments.filter(c => {
            return c.staffs.map(s => s.userid).includes(this.filterStaffId)
          })
        }
        this.ratings = [...this.ratings, ...comments]
        if (res.comments.length < this.row) {
          this.loading = true
          return
        }
        this.loading = false
      })
    }
  },
  computed: {
    scrollDisabled () {
      return this.loading || this.loadonce
    }
  },
  mounted () {
    console.log('rating list init data ====', this.data)
    // 外部传数据则取外部
    if (this.data.length) {
      this.ratings = this.data
    } else {
      this.loadMore()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/styles/variable';
@import '../assets/styles/icon';
.tips{
  padding-top: 20px;
  text-align: center;
}
.content{
  height: 100%;
}
 .vue-star-rating{
   display: inline-block;
 }
 .ratingItem{
   width:100%;
   background: #fff;
 }
 .header{
  display: flex;
  padding: 20px 10px;
  .left{
    flex: 0 70px;
  }
  .avatar{
    width: 60px;
    height: 60px; 
    border-radius: 50%;
  }
  .right{
    flex:1;
    font-size: 16px;
    .top{
      display: flex;
    }
    .name{
      flex:1;
    }
    .phone{
      color:$sub;
    }
    .comment{
      font-size: 16px;
      line-height: 22px;
      color:$main;
      margin: 8px 0;
    }
  }
  .bottom{
    display: flex;
    span{
      flex: 1;
    }
    span+span{
      flex: 1;
      text-align: right;
    }
  }
}
</style>
