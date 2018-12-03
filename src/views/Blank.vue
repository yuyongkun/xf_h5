<template>
  <div class="blank-view">
    <input-number :min="1" :max="10" :value="5"></input-number>
  </div>
</template>

<script>
  export default {
    name: 'Blank'
  }
</script>

<style>
  .blank-view h1 {
    text-align: center;
  }
</style>
