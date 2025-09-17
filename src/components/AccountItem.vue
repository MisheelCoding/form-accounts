<template>
  <li class="account flex gap-5">
    <el-input
      class="flex-1/4"
      v-model="labelInput"
      placeholder="Please input"
      @blur="saveLabel"
      :maxlength="VALIDATION.LABEL_MAX_LENGTH"
      :show-word-limit="true"
    />
    <!-- *** recordType SELECT-->
    <el-select
      class="flex-1/4"
      @change="onChange"
      v-model="localAccount.recordType"
      placeholder="Select"
      size="large"
    >
      <el-option
        v-for="item in RECORD_TYPES"
        :key="item"
        :label="RECORD_TYPE_TEXT[item]"
        :value="item"
      />
    </el-select>
    <!-- *** LOGIN-->
    <el-input
      class="flex-1/4"
      :class="[{ 'flex-2/4': localAccount.recordType === 'LDAP' }, { 'is-invalid': errors.login }]"
      v-model="localAccount.login"
      placeholder="Введите логин"
      @blur="validateLogin"
      :show-word-limit="true"
      :maxlength="VALIDATION.LOGIN_MAX_LENGTH"
    />
    <!-- *** PASSWORD -->
    <el-input
      v-if="localAccount.recordType === 'local'"
      class="flex-1/4"
      :class="{ 'is-invalid': errors.password }"
      v-model="localAccount.password"
      placeholder="Введите пароль"
      @blur="validatePassword"
      :show-word-limit="true"
      :maxlength="VALIDATION.PASSWORD_MAX_LENGTH"
    />
    <!-- *** remove button  -->

    <button
      class="cursor-pointer opacity-55 hover:opacity-100 transition"
      type="button"
      aria-label="Кнопка удалить аккаунт"
      @click="emitRemove"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
        <path
          fill=""
          d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"
          stroke-width="1"
          stroke="#cc"
        />
      </svg>
    </button>
  </li>
</template>

<script setup lang="ts">
import { RECORD_TYPES, RECORD_TYPE_TEXT, VALIDATION, type Account } from '@/types/accountItem'

import { ref, toRef, watch } from 'vue'

const emit = defineEmits<{
  'remove:account': [accountId: string]
  'update:account': [account: Account]
}>()

const props = defineProps<{
  account: Account
}>()

const accountRef = toRef(props, 'account')

const localAccount = ref<Account>({ ...accountRef.value })

const labelInput = ref(accountRef.value.label?.map((l) => l.text).join(';') || '')

const errors = ref<{ label?: boolean; recordType?: boolean; login?: boolean; password?: boolean }>(
  {},
)

const emitRemove = () => {
  emit('remove:account', accountRef.value.id)
}

function emitUpdate() {
  if (
    errors.value.login ||
    errors.value.password ||
    errors.value.recordType ||
    errors.value.label
  ) {
    return
  }
  emit('update:account', {
    ...localAccount.value,
    password: localAccount.value.password === '' ? null : localAccount.value.password,
  })
}
// *** Валидаций
function validateLogin() {
  errors.value.login = !localAccount.value.login || localAccount.value.login.length > 100
  emitUpdate()
}

function validatePassword() {
  if (localAccount.value.recordType === 'local') {
    errors.value.password = !localAccount.value.password || localAccount.value.password.length > 100
  } else {
    errors.value.password = false
  }
  emitUpdate()
}
//

function onChange() {
  if (localAccount.value.recordType === 'LDAP') localAccount.value.password = null

  emitUpdate()
}

function saveLabel() {
  const newLabel = labelInput.value
    .split(';')
    .map((text) => ({ text: text.trim() }))
    .filter((l) => l.text)
  localAccount.value.label = newLabel.length ? newLabel : null
  console.log(accountRef.value.label)
  emitUpdate()
}
watch(
  () => accountRef.value,
  (newAccount) => {
    localAccount.value = { ...newAccount }
    labelInput.value = newAccount.label?.map((l) => l.text).join(';') || ''
  },
)
</script>

<style scoped>
.is-invalid :deep(.el-input__wrapper) {
  border-color: #f56c6c !important; /* красный из Element Plus */
  box-shadow: 0 0 0 1px #f56c6c inset !important;
}
</style>
