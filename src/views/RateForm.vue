
<template>
  <div class="container">
    <div class="shopRating">
      <!-- <div class="title">服务已完成</div> -->
      <p class="sub vux-1px-b">以下发型师参与了这次服务，请给他们一个中肯的评价吧</p>
      <h4 class="h4">评价服务</h4>
      <div class="rateCate" v-for="(item, index) in staffs" :key="index" v-if="staffs.length">
        <span class="staffAvatar"><img class="avatar" :src="item.photo" alt="头像"></span>
        <star-rating :star-size="30" :read-only="readOnly" :show-rating="false" v-model="item.rating"></star-rating>
        <span v-show="item.rating === 5">非常满意</span>
        <span v-show="item.rating === 4">比较满意</span>
        <span v-show="item.rating === 3">满意</span>
        <span v-show="item.rating === 2">不满意</span>
        <span v-show="item.rating === 1">非常不满意</span>
      </div>
      <h4 class="h4">店务整洁</h4>
      <div class="rateCate">
        <star-rating :star-size="30" :read-only="readOnly" :show-rating="false" v-model="rate_shopClean"></star-rating>      
      </div>
      <!-- <h4 class="h4">店铺服务</h4> -->
      <!-- <div class="rateCate">
        <star-rating :star-size="30" :read-only="readOnly" :show-rating="false" v-model="rate_shopServe"></star-rating>      
      </div>   -->
      <textarea  v-model="comment" class="textarea" maxlength="80" rows="6"  :readonly="readOnly" placeholder="发型师的手艺如何，服务如何，门店环境如何。写下您的评价，会让发型师做得更好"  ></textarea>
      <mt-button type="primary" size="normal" :disabled="readOnly"  @click="submit">{{readOnly ? '已评价' : '提交并领取积分'}}</mt-button>
    </div>

  </div>
</template>

<script>
import { addComment, getComment, getApmCase } from '../api/api'
import StarRating from 'vue-star-rating'

export default {
  name: 'RateForm',
  components: { StarRating },
  data () {
    return {
      readOnly: false,
      shopId: '',
      staffId: '',
      staff: {},
      apmId: '',
      rating: 5,
      comment: '',
      rate_shopClean: 5,
      rate_shopServe: 5,
      staffs: []
    }
  },
  mounted () {
    this.shopId = this.$route.params.shopId
    this.apmId = this.$route.params.apmId
    // this.staffId = this.$route.params.staffId
    // getStaff(this.staffId).then(res => {
    //   this.staff = res.data.staff
    //   this.staff.rating = 5
    //   this.staffs.push(this.staff)
    // })
    getComment(this.apmId).then(res => {
      this.readOnly = true
      this.rating = res.data.comment.rating
      this.rate_shopClean = res.data.comment.rate_shopClean
      this.rate_shopServe = res.data.comment.rate_shopServe
      this.comment = res.data.comment.comment
    })
    getApmCase(this.apmId).then(res => {
      if (res.data.staffs) {
        this.staffs.push(...res.data.staffs)
        // let staffs = res.data.staffs
        // let staffIds = {}
        // let _staffs = []
        // for (let s of staffs) {
        //   if (!staffIds[s.staffIds]) {
        //     _staffs.push(s)
        //     staffIds[s.staffId] = 1
        //   }
        // }
        // this.staffs = _staffs
      }
    })
  },
  methods: {
    submit () {
      let staffs = []
      let totalRating = 0
      if (!this.comment.length) {
        this.$toast('请填写您对发型师的评价')
        return
      }
      if (this.staffs.length) {
        this.staffs.map(staff => {
          totalRating += staff.rating
          staffs.push({userid: staff.userid, rating: staff.rating})
        })
        this.rating = parseInt(totalRating / this.staffs.length)
      }
      this.$indicator.open()
      addComment({
        apmId: this.apmId,
        shopId: this.shopId,
        rating: this.rating,
        comment: this.comment,
        rate_shopClean: this.rate_shopClean,
        rate_shopServe: this.rate_shopServe,
        staffs: staffs
      }).then(res => {
        this.$indicator.close()
        this.$router.push({name: 'CouponCenter', params: {shopId: this.shopId, lastView: 'RateForm'}})
      }).catch(e => {
        this.$toast('提交数据失败')
        this.$indicator.close()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/styles/variable';
@import '../assets/styles/icon';
.container{
  background-color: #fff;
  min-height: 100vh;
}
.textarea{
  border-radius: 6px;
  background: #f3f3f3;
  margin: 10px auto;
  padding: 10px;
  width: 90%;
  border:none;
  display: block;
}
.avatar{
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.h4{
  margin: 4px;
} 
.rateCate{
  line-height: 30px;
  padding: 10px 20px;
  height: 40px;
  .cate{
    margin: 0 18px;
    position: relative;
    top: -6px;
  }
}
.shopRating{

  text-align: center;
  .vue-star-rating{
    display: inline-block;
  }
  .sub{
    padding: 10px 30px 20px;
  }
  .title{
    text-align: center;
    font-size: 24px;
    color: $main;
    padding:30px 0 10px;
  }

}
</style>
