import EncryptedStorage from 'react-native-encrypted-storage'

export const setEncryptStorage = async (key: string, value: unknown) => {
  await EncryptedStorage.setItem(key, JSON.stringify(value))
}

export const getEncryptStorage = async (key: string) => {
  const value = await EncryptedStorage.getItem(key)

  return value ? (JSON.parse(value) as string) : null
}

export const removeEncryptStorage = async (key: string) => {
  await EncryptedStorage.removeItem(key)
}
