<template>
  <div class="add-account flex gap-5 items-center py-5">
    <span class="add-account__title">Учетная запись</span>
    <button
      @click="addEmptyAccount"
      class="add-account__button border border-gray-400 w-8 h-8 flex justify-center items-center rounded cursor-pointer"
    >
      <span class="scale-130">+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'

const { addEmptyAccount } = useAccountsStore()
</script>

<style scoped></style>
