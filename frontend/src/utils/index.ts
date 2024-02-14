import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const config = {
  getStore: (name: string) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name)
    }
    return null
  },
  setStore: (name: string, value: any) => {
    localStorage.setItem(name, value)
  },
  setStoreJson: (name: string, value: any) => {
    let json = JSON.stringify(value)
    localStorage.setItem(name, json)
  },
  getStoreJson: (name: string) => {
    if (localStorage.getItem(name)) {
      let result: any = localStorage.getItem(name)
      return JSON.parse(result)
    }
    return null
  },
  clearStore: (name: string) => {
    localStorage.removeItem(name)
  }
}

export const { getStore, setStore, setStoreJson, getStoreJson, clearStore } = config

export const mergeValues = (values: object): string => {
  return Object.entries(values)
    .map((entry) => entry[1]) // Extracting values
    .join('')
}
