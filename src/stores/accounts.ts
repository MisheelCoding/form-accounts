import type { Account } from '@/types/accountItem'
import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    // *** Добавление пустого
    addEmptyAccount() {
      const newAccount: Account = {
        id: uuidv4(),
        label: null,
        login: '',
        password: null,
        recordType: 'local',
      }
      this.accounts.push(newAccount)
    },
    // *** Обновление
    updateAccount(updatedAccount: Account) {
      const idx = this.accounts.findIndex((a) => a.id === updatedAccount.id)
      if (idx !== -1) {
        this.accounts[idx] = updatedAccount
      }
    },
    // *** Удаление аккаунта
    removeAccount(accountId: string) {
      this.accounts = this.accounts.filter((a) => a.id !== accountId)
    },
  },
})
