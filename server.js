import crypto from 'crypto'

const server = Bun.serve({
  port: 7285,

  async fetch(req) {
    const url = new URL(req.url)
    const path = url.pathname

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      })
    }

    if (path === '/api/download') {
      const ckSize = parseInt(url.searchParams.get('ckSize')) || 100
      const size = ckSize * 1024
      const randomData = crypto.randomBytes(size)

      return new Response(randomData, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Content-Length': size.toString(),
        },
      })
    }

    if (path === '/api/upload' || path === '/api/ping') {
      if (req.method === 'POST') {
        await req.arrayBuffer()
      }

      return new Response('', {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      })
    }

    if (path === '/api/ip') {
      const clientIP =
        req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        req.headers.get('x-real-ip') ||
        'unknown'

      let response = {
        processedString: clientIP,
        rawIspInfo: clientIP,
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      })
    }

    return new Response('Not Found', {
      status: 404,
      headers: corsHeaders,
    })
  },
})

console.log(`server running on http://localhost:${server.port}`)
