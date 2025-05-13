import * as SecureStore from 'expo-secure-store'

const save = async (key: string, value: string) => await SecureStore.setItemAsync(key, value)

const get = async (key: string) => await SecureStore.getItemAsync(key)


export {save, get}