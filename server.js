import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8' };

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  const file = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  try {
    const data = await readFile(join(root, file));
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'text/plain; charset=utf-8', 'Cache-Control':'no-store' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});
server.listen(port, '0.0.0.0', () => console.log(`Save State listening on ${port}`));
