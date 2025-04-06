import { concatApiPaths } from '~/base/utils/concatApiPaths'

const basePath = 'sub-cards'

const paths = {
  index: concatApiPaths(basePath),
}

export async function getAllSubCards(dto = {}) {
  const { page = 1, limit = 15, categoryIds = [], search = '' } = dto

  const params = { page, limit }

  if (categoryIds.length > 0) {
    params.categoryIds = categoryIds.join(',')
  }

  if (search.length > 0) {
    params.search = search
  }

  console.log(params, 53)
  const { data } = await useNuxtApp().$axios.get(paths.index, {
    params,
  })

  return data
}

export const subCardsApi = {
  getAllSubCards,
}
