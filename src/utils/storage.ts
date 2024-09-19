import EncryptedStorage from 'react-native-encrypted-storage'

export const setStorage = async (key: string, value: unknown) => {
  await EncryptedStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = async <T>(key: string): Promise<T | null> => {
  const value = await EncryptedStorage.getItem(key)

  return value ? JSON.parse(value) : null
}

export const removeStorage = async (key: string) => {
  const data = await EncryptedStorage.getItem(key)

  if (data) {
    await EncryptedStorage.removeItem(key)
  }
}
