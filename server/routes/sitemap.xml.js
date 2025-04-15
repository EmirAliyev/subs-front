export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const baseUrl = config.public.baseUrl

  const staticRoutes = ['/', '/subs'].filter((route) => !['/admin', '/my-subs'].includes(route))

  const podpiskaSlugs = [
    'yandex-plus',
    'ivi',
    'okko',
    'netflix',
    'youtube-premium',
    'spotify',
    'apple-music',
    'vk-muzika',
    'vkusvill-10',
    'yandex-muzika',
    'yandex-lavka',
    'ozon-premium',
    'pyaterochka',
    'tinkoff-pro',
    'ps-plus-essential',
    'ps-plus-extra',
    'ps-plus-premium',
    'x-game-pass',
    'wink',
    'wink-premium',
    'sberprajm',
    'khalva-desyatka',
    'yandex-alisa',
    'premier',
    'premier-match',
    'premier-sport',
  ]

  const dynamicRoutes = podpiskaSlugs.map((slug) => `/subs/podpiska-${slug}`)

  const allUrls = [...staticRoutes, ...dynamicRoutes]

  // Генерируем XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  allUrls.forEach((url) => {
    xml += `
  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  })

  xml += `
</urlset>`

  event.node.res.setHeader('content-type', 'application/xml')
  return xml
})
