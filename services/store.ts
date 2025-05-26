import * as SecureStore from 'expo-secure-store'

const save = (key: string, value: string) =>  SecureStore.setItem(key, value)


const get_async = async (key: string) => await SecureStore.getItemAsync(key)

const get = (key: string) => SecureStore.getItem(key)

export {save, get, get_async}