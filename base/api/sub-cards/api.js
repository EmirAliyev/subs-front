import { concatApiPaths } from '~/base/utils/concatApiPaths'

const basePath = 'sub-cards'

const paths = {
  index: concatApiPaths(basePath),
  add: concatApiPaths(basePath, 'add'),
  update: concatApiPaths(basePath, 'update'),
  delete: concatApiPaths(basePath, 'delete'),
  top: concatApiPaths(basePath, 'top'),
  one: (slug) => concatApiPaths(basePath, slug),
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

  const { data } = await useNuxtApp().$axios.get(paths.index, {
    params,
  })

  return data
}

export async function addCardToUser(body) {
  const { data } = await useNuxtApp().$axios.post(paths.add, body)
  return data
}

export async function updateUserCard(body) {
  const { data } = await useNuxtApp().$axios.put(paths.update, body)
  return data
}

export async function removeCardFromUser(body) {
  const { data } = await useNuxtApp().$axios.delete(paths.delete, { data: body })
  return data
}

export async function getTopSubs(take = 10) {
  const { data } = await useNuxtApp().$axios.get(paths.top, {
    params: { take },
  })

  return data
}

export async function getSubBySlug(slug) {
  const { data } = await useNuxtApp().$axios.get(paths.one(slug))

  return data
}

export const subCardsApi = {
  getAllSubCards,
  addCardToUser,
  updateUserCard,
  getSubBySlug,
  removeCardFromUser,
  getTopSubs,
}
