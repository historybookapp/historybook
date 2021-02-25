import axios, { AxiosError } from 'axios'

import { Category } from './category-helper'

const httpClient = axios.create({
  baseURL: '/api',
  responseType: 'json',
})

export const fetcher = <T = any>(url: string) =>
  httpClient.get<T>(url).then((res) => res.data)

export function getErrorMessage(err: Error): string {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      return (
        (err as AxiosError<{ message: string }>).response?.data.message ||
        'Unable to parse the API response.'
      )
    }
    return err.message
  }
  return err.message
}

export function fetchCategoryList(): Promise<Category[]> {
  return httpClient.get('/categories').then((res) => res.data)
}

export default httpClient
