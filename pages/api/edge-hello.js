// api/edge-hello.js
export default async function handler(req, event) {
    return new Response('Hello, world!', {
      headers: { 'content-type': 'text/plain' },
    });
  }
  