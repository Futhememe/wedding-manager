import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROUTE}`,
  headers: {
    'User-Agent': 'HTTPie'
  }
})
