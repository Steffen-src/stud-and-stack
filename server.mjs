import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('./', import.meta.url)));
const port = Number(process.env.PORT || 4168);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

function byteRange(header, length) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return null;
  const start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), length - 1) : length - 1;
  return start <= end ? { start, end } : null;
}

createServer(async (request, response) => {
  try {
    const { pathname } = new URL(request.url, 'http://localhost');
    const file = resolve(root, '.' + decodeURIComponent(pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + sep) || !Object.hasOwn(types, extname(file))) {
      response.writeHead(404).end('Nicht gefunden');
      return;
    }
    const content = await readFile(file);
    const headers = {
      'Content-Type': types[extname(file)],
      'Content-Length': content.length,
      'X-Content-Type-Options': 'nosniff',
    };
    let body = content;
    let status = 200;
    if (extname(file) === '.mp4') {
      headers['Accept-Ranges'] = 'bytes';
      if (request.headers.range) {
        const range = byteRange(request.headers.range, content.length);
        if (!range) {
          response.writeHead(416, { 'Content-Range': `bytes */${content.length}` }).end();
          return;
        }
        const { start, end } = range;
        body = content.subarray(start, end + 1);
        headers['Content-Range'] = `bytes ${start}-${end}/${content.length}`;
        headers['Content-Length'] = body.length;
        status = 206;
      }
    }
    response.writeHead(status, headers).end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end('Nicht gefunden');
  }
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}/`));
