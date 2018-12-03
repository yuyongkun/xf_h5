<template>
  <div class="booking-view">
   <section class="fixed_box">
       <mt-navbar class="page-part" v-model="selected" fixed>
        <mt-tab-item id="1">待消费</mt-tab-item>
        <mt-tab-item id="2">服务中</mt-tab-item>
        <mt-tab-item id="3">已完成</mt-tab-item>
        <mt-tab-item id="4">已取消</mt-tab-item>
       </mt-navbar>
    </section>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <booking-list :bookings="waitingBookings" @updateBookingList="fetchData"></booking-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <booking-list :bookings="servingBookings" @updateBookingList="fetchData"></booking-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <booking-list :bookings="doneBookings" @updateBookingList="fetchData"></booking-list>
        <mt-button size="large" type="default" @click="loadMoreDoneBookings" v-show="!doneBookingListEnd" plain>加载更多</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <booking-list :bookings="cancelBookings" @updateBookingList="fetchData"></booking-list>  
        <mt-button size="large" type="default" @click="loadMoreCancelBookings" v-show="!cancelBookingListEnd" plain>加载更多</mt-button>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import { listAppointments } from '../api/api'
  import BookingList from '../components/BookingList.vue'
  import { APPOINTMENT_STATUS } from '../config/constants'

  export default {
    name: 'MyBooking',
    components: {
      BookingList
    },

    data () {
      return {
        selected: '1',
        bookings: [],
        allLoaded: false,
        servingBookings: [],
        waitingBookings: [],
        doneBookings: [],
        cancelBookings: [],
        loadDoneBookingOffset: 0,
        loadCancelBookingOffset: 0,
        doneBookingListEnd: false,
        cancelBookingListEnd: false
      }
    },

    methods: {
      async fetchData () {
        this.$indicator.open()
        setTimeout(() => { this.$indicator.close() }, 1500)
        this.loadDoneBookingOffset = 0
        this.loadCancelBookingOffset = 0
        this.doneBookingListEnd = false
        this.cancelBookingListEnd = false
        try {
          await this.loadBookings(APPOINTMENT_STATUS.WAITING, 'waitingBookings')
          await this.loadBookings(APPOINTMENT_STATUS.SERVING, 'servingBookings')
          await this.loadBookings(APPOINTMENT_STATUS.DONE, 'doneBookings')
          await this.loadBookings(APPOINTMENT_STATUS.CANCEL, 'cancelBookings')
        } catch (e) {
          console.log(e)
          this.$toast('系统错误')
        }
      },

      async loadMoreDoneBookings () {
        this.loadDoneBookingOffset += 10
        let resp = await listAppointments(status, this.loadDoneBookingOffset, 10)
        console.log('loadMoreDoneBookings: %j', resp)
        let bookings = resp.data.bookings || []
        this.doneBookingListEnd = this.bookings.length < 10
        this.doneBookings.push(...bookings)
      },

      async loadMoreCancelBookings () {
        this.loadCancelBookingOffset += 10
        let resp = await listAppointments(status, this.loadCancelBookingOffset, 10)
        let bookings = resp.data.bookings || []
        this.cancelBookingListEnd = this.bookings.length < 10
        this.cancelBookings.push(...bookings)
      },

      async loadBookings (status, dataset, offset = 0, limit = 10) {
        let resp = await listAppointments(status, offset, limit)
        console.log('loadBookings resp: %j', resp)
        this[dataset] = resp.data.bookings
      }
    },

    mounted () {
      this.fetchData()
    }
  }
</script>

<style lang="scss" scoped>
  .booking-view{
    height: 100%;
    position: relative;
    overflow: scroll;
  }

</style>

