import axios from 'axios'

/**
 * Resolve API base URL for local (relative / Vite proxy) and production.
 * If the env value is only the backend origin (no /api/v1), append it automatically.
 */
function resolveApiBaseUrl(raw: string | undefined): string {
  const value = (raw || '/api/v1').trim().replace(/\/+$/, '')

  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    return value.startsWith('/') ? value : `/${value}`
  }

  try {
    const url = new URL(value)
    const path = url.pathname.replace(/\/+$/, '') || '/'

    if (path === '/' || path === '/api' || !path.includes('/api/v1')) {
      url.pathname = '/api/v1'
    }

    url.search = ''
    url.hash = ''
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}`
  } catch {
    return '/api/v1'
  }
}

const API_BASE_URL = resolveApiBaseUrl(
  import.meta.env.VITE_API_BASE_URL as string | undefined,
)

export const AUTH_TOKEN_KEY = 'auth_token'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

function isAuthFormRequest(config: { url?: string }): boolean {
  const url = config.url ?? ''
  return url.includes('/login')
}

authApi.interceptors.request.use(
  (config) => {
    if (isAuthFormRequest(config)) {
      if (config.headers) {
        delete config.headers.Authorization
        delete config.headers.authorization
      }
      return config
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAuthFormRequest(error.config ?? {})) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }

    return Promise.reject(error)
  },
)

export default api
