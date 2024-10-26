const http = require('node:http');
const fs = require('node:fs/promises');

const server = http.createServer();

const handlePage = (url, res) => {
  switch (url) {
    case ('/'):
      servepage('./pages/index.html', res);
      break;
    case ('/about'):
      servepage(`./pages${url}.html`, res);
      break;
    case ('/contact-me'):
      servepage(`./pages${url}.html`, res);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      servepage('./pages/404.html', res);
      break;
  }
};

const servepage = async (path, res) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    res.end(content);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('error');
  }
};
server.on('request', (req, res) => {
  const { url } = req;
  handlePage(url, res);
});

server.listen(8080, () => console.log('listening on port 8080 \n'));
