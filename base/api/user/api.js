import { concatApiPaths } from '~/base/utils/concatApiPaths'

const basePath = 'user'

const paths = {
  user_subs: (id) => concatApiPaths(basePath, 'subs', id),
  user_subs_categories: (id) => concatApiPaths(basePath, 'subs-categories', id),
}

export async function getUserSubs(id) {
  const { data } = await useNuxtApp().$axios.get(paths.user_subs(id))

  return data
}

export async function getUserSubsCategories(id) {
  const { data } = await useNuxtApp().$axios.get(paths.user_subs_categories(id))

  return data
}

export const userApi = {
  getUserSubs,
  getUserSubsCategories,
}
