<template>
  <ul class="account-list-title flex gap-5">
    <li class="flex-1/4" v-for="item in accountTitles" :key="item">
      {{ item }}
    </li>
    <li class="w-10"></li>
  </ul>

  <transition-group name="account-item" tag="ul" class="accounts-list flex flex-col gap-5">
    <account-item
      v-for="acc in accounts"
      :key="acc.id"
      :account="acc"
      @remove:account="store.removeAccount($event)"
      @update:account="store.updateAccount($event)"
    />
  </transition-group>
</template>

<script setup lang="ts">
import AccountItem from '@/components/AccountItem.vue'
import { useAccountsStore } from '@/stores/accounts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useAccountsStore()

const { accounts } = storeToRefs(store)

type ACCOUNT_LIST_TITLE = 'Метки' | 'Тип записи' | 'Логин' | 'Пароль'

const accountTitles = ref<Array<ACCOUNT_LIST_TITLE>>(['Метки', 'Тип записи', 'Логин', 'Пароль'])
</script>

<style scoped>
.account-item-enter-active,
.account-item-leave-active {
  transition: all 0.3s ease;
}
.account-item-enter-from,
.account-item-leave-to {
  opacity: 0;
}
.account-item-enter-from {
  transform: translateY(-20px);
}

.account-item-leave-to {
  transform: translateX(50px);
}
</style>
