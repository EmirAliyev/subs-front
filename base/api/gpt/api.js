import { concatApiPaths } from '~/base/utils/concatApiPaths'

const basePath = 'gpt'

const paths = {
  analyze_user: (id) => concatApiPaths(basePath, 'my-subs-analyze', id),
  analyze_sub: (id) => concatApiPaths(basePath, 'analyze-sub', id),
}

export async function analyzeUserSubs(id) {
  const { data } = await useNuxtApp().$axios.get(paths.analyze_user(id))
  return data
}
export async function analyzeSub(id) {
  const { data } = await useNuxtApp().$axios.get(paths.analyze_sub(id))
  return data
}

export const gptApi = {
  analyzeUserSubs,
  analyzeSub,
}
