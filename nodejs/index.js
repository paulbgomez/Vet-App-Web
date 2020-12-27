const http = require('http');
const { StringDecoder } = require('string_decoder');

let resources = {
  mascots: [
    {
      type: '',
      name: '',
      owner: '',
    },
  ],
};

const server = http.createServer((req, res) => {
  const baseURL = 'http://' + req.headers.host + '/';
  const myURL = new URL(req.url, baseURL);
  const pathURL = myURL.pathname;

  //clean path
  const cleanPath = pathURL.replace(/^\/+|\/+$/g, '');
  //method
  const method = req.method.toLowerCase();
  //headers
  const headers = req.headers;
  //Query variables
  const query = myURL.searchParams;
  //Get payloads
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();
    //Order data
    const data = {
      path: cleanPath,
      query,
      method,
      headers,
      payload: buffer,
    };

    let handler;
    if (cleanPath && router[cleanPath] && router[cleanPath][method]) {
      handler = router[cleanPath][method];
    } else {
      handler = router.notFound;
    }

    if (typeof handler === 'function') {
      handler(data, (statusCode = 200, message) => {
        const response = JSON.stringify(message);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(response);
      });
    }
  });
});

const router = {
  mascots: {
    get: (data, cb) => {
      cb(200, resources.mascots);
    },

    post: (data, cb) => {
      cb(200, resources.mascots);
    },
  },
  notFound: (data, cb) => {
    cb(404, { message: 'Not Found' });
  },
};

server.listen(5000, () => {
  console.log('server is listening on port 5000');
});
