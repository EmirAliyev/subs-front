import { concatApiPaths } from '~/base/utils/concatApiPaths'

const basePath = 'categories'

const paths = {
  index: concatApiPaths(basePath),
}

export async function getAllCategories() {
  const { data } = await useNuxtApp().$axios.get(paths.index)

  return data
}

export const categoriesApi = {
  getAllCategories,
}
