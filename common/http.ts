import axios from 'axios'

const httpClient = axios.create({
  baseURL: '/api',
})

const fetcher = <T = any>(url: string) =>
  httpClient.get<T>(url).then((res) => res.data)

export default httpClient
export { fetcher }
