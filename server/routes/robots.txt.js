export default defineEventHandler(async (event) => {
  event.node.res.setHeader('content-type', 'text/plain')
  const config = useRuntimeConfig(event)

  const result = `

User-agent: *
Allow: /
Disallow: /admin
Disallow: /expenses
Sitemap: ${config.public.baseUrl}/sitemap.xml
Host: ${config.public.baseUrl}
`

return result
})
