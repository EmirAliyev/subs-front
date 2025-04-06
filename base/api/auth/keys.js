import { concatApiPaths } from '~/base/utils/concatApiPaths'

const basePath = 'auth'

const paths = {
  login: concatApiPaths(basePath, 'login'),
}

export async function login(dto) {
  const { data } = await useNuxtApp().$axios.post(paths.login, dto)
  return data
}

export const authApi = {
  login,
}
