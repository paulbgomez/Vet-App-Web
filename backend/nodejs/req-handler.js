const { StringDecoder } = require('string_decoder');
const router = require('./router');

module.exports = (req, res) => {
  const baseURL = 'http://' + req.headers.host + '/';
  const myURL = new URL(req.url, baseURL);
  const pathURL = myURL.pathname;

  //clean path
  const cleanPath = pathURL.replace(/^\/+|\/+$/g, '');
  //method
  const method = req.method.toLowerCase();
  //CORS

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Request-Methods',
    'OPTIONS, GET, PUT, POST, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (method === 'options') {
    res.writeHead(200);
    res.end();
    return;
  }
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
};
