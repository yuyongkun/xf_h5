<template>
  <div class="myticket-view">

    <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected" fixed>
      <mt-tab-item id="1">待消费</mt-tab-item>
      <mt-tab-item id="2">已使用</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="tab-content">
      <mt-tab-container-item id="1">
        <ticket-list :tickets="unusedTickets"></ticket-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ticket-list :tickets="usedTickets"></ticket-list>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
  import { listTicketsByOpenid } from '../api/api'
  import TicketList from '../components/TicketList.vue'

  export default {
    name: 'MyTicket',

    components: {
      TicketList
    },

    data () {
      return {
        selected: '1',
        usedTickets: [],
        unusedTickets: []
      }
    },

    mounted () {
      let openid = window._openid
      listTicketsByOpenid(openid).then(data => {
        let tickets = data.data.tickets
        for (let ticket of tickets) {
          if (ticket.used) {
            this.usedTickets.unshift(ticket)
            continue
          }
          this.unusedTickets.unshift(ticket)
        }
      }).catch(e => {
        console.error(e)
        this.$toast('获取数据失败')
      })
    }
  }
</script>

<style scoped>
  p {
    margin: 0;
  }

  .tab-content {
    padding-top: 50px;
  }


</style>
