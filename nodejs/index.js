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
  const query = myURL.search;
  //Get payloads
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    if (headers['content-type'] === 'application/json') {
      buffer = JSON.parse(buffer);
    }

    if (cleanPath.indexOf('/') > -1) {
      var [pathURL, index] = cleanPath.split('/');
    }
    //Order data
    const data = {
      index,
      path: pathURL || cleanPath,
      query,
      method,
      headers,
      payload: buffer,
    };

    console.log({ data });

    let handler;
    if (data.path && router[data.path] && router[data.path][method]) {
      handler = router[data.path][method];
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
      if (data.index) {
        if (resources.mascots[data.index]) {
          return cb(200, resources.mascots[data.index]);
        }
        return cb(404, {
          message: `Mascot with the index ${data.index} not found`,
        });
      }
      cb(200, resources.mascots);
    },

    post: (data, cb) => {
      resources.mascots.push(data.payload);
      cb(201, data.payload);
    },
  },
  notFound: (data, cb) => {
    cb(404, { message: 'Not Found' });
  },
};

server.listen(5000, () => {
  console.log('server is listening on port 5000');
});
