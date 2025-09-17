<template>
  <div class="container">
    <AccountAdd />
    <AccountList />
  </div>
</template>

<script setup lang="ts">
import AccountAdd from '@/components/AccountAdd.vue'
import AccountList from './components/AccountList.vue'
</script>

<style scoped>
.container {
  max-width: 90%;
  margin: 0 auto;
}
</style>
