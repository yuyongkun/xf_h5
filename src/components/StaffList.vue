<template>
  <div class="staff-list-view">
    <div class="list-inner hairline-top">
      <ul>
        <li v-for="staff in staffs" :key="staff.userid" class="staff-item hairline-bottom">
          <div class="media">
            <div class="media-left">
              <div class="avatar" slot="icon">
                <img :src="staff.photo" alt="头像">
              </div>
            </div>
            <div class="media-body">
              <p class="staff-intro">{{ staff.intro }}</p>
              <p class="wait-time">{{ formatWaitTime(staff.wait) }}</p>
            </div>
            <div class="media-right">
              <div class="btn-box">
                <mt-button 
                  type="primary" 
                  size="small"
                  :disabled="!staff.working"
                  @click="handleMakeAppointment(staff)"
                  class="appointment-btn">{{ getBtnText(staff.working) }}</mt-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { listStaff, makeAppointment } from '../api/api'
import { getApmWaitTime } from '../utils'

export default {
  name: 'StaffList',

  props: ['shopId', 'category'],

  data () {
    return {
      staffs: []
    }
  },

  methods: {
    fetchData () {
      listStaff(this.shopId).then(data => {
        this.staffs = data.data.staffs
      }).catch(e => {
        console.error(e)
      })
    },

    handleMakeAppointment (staff) {
      if (!staff.working) { return }

      this.$messagebox({
        message: '请安排好时间到店，如过号需重新取号',
        showCancelButton: true,
        confirmButtonText: '确定取号',
        cancelButtonText: '取消'
      }).then(() => {
        return makeAppointment(this.shopId, staff.userid, window._openid)
      }).then(() => {
        this.$toast('成功预约')
      }).catch(e => {
        console.error(e)
        if (e.message.indexOf('409') > 0) {
          this.$toast('你已预约，请勿重复取号')
        } else {
          this.$toast(`预约失败。请稍后重试：${e.message}`)
        }
      })
    },

    getBtnText (working) {
      return working ? '一键取号' : '下班了'
    },

    formatWaitTime (count) {
      return getApmWaitTime(count)
    }
  },

  mounted () {
    console.log(this.shopId)
    this.fetchData()
  }
}
</script>

<style lang="scss">
.staff-list-view {
  background: #fff;
  margin-top: 15px;
  .staff-item {
    padding: 8px;
  }
  .avatar {
    width: 42px;
    height: 42px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .staff-intro, .wait-time {
    margin: 0;
  }
  .wait-time {
    padding-top: 4px;
    font-size: 12px;
    color: #969696;
  }
  .btn-box {
    width: 76px;
  }
  .appointment-btn {
    font-size: 13px;
    width: 76px;
  }
}
</style>
