import * as SecureStore from 'expo-secure-store'

const save = async (key: string, value: string) => await SecureStore.setItemAsync(key, value)


const get_async = async (key: string) => await SecureStore.getItemAsync(key)

const get = (key: string) => SecureStore.getItem(key)

export {save, get, get_async}