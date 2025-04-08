import { concatApiPaths } from '~/base/utils/concatApiPaths'

const basePath = 'auth'

const paths = {
  login: concatApiPaths(basePath, 'login'),
  me: concatApiPaths(basePath, 'me'),
}

export async function login(dto) {
  const { data } = await useNuxtApp().$axios.post(paths.login, dto)
  return data
}

export async function getMe() {
  const { data } = await useNuxtApp().$axios.get(paths.me)
  return data
}

export const authApi = {
  login,
  getMe,
}
