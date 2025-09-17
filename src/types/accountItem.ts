export const RECORD_TYPES = ['LDAP', 'local'] as const

export type RecordTypes = (typeof RECORD_TYPES)[number]

export interface Account {
  id: string
  label: { text: string }[] | null
  recordType: RecordTypes
  login: string
  password: string | null
}
