import { concatApiPaths } from '~/base/utils/concatApiPaths'

const basePath = 'gpt'

const paths = {
  analyze_user: (id) => concatApiPaths(basePath, 'my-subs-analyze', id),
  analyze_sub: concatApiPaths(basePath, 'analyze-sub'),
}

export async function analyzeUserSubs(id) {
  const { data } = await useNuxtApp().$axios.get(paths.analyze_user(id))
  return data
}
export async function analyzeSub(body) {
  const { data } = await useNuxtApp().$axios.post(paths.analyze_sub, body)
  return data
}

export const gptApi = {
  analyzeUserSubs,
  analyzeSub,
}
