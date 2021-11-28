const http = require("http");
const { getAll, getOne, create, update, destroy } = require("./controllers");

const server = http.createServer(async (req, res) => {
  const isUrlCorrectWithId = /^\/persons\/[-\w]*$/g.test(req.url);
  const isUrlCorrectWithoutId = /^\/persons$/g.test(req.url);
  const id = req.url.split('/').reverse()[0];
  
  if (isUrlCorrectWithoutId && req.method === 'GET') {
    const data = await getAll(req, res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else if (isUrlCorrectWithId && req.method === 'GET') {
    const data = await getOne(req, res, id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else if (isUrlCorrectWithoutId && req.method == 'POST') {
    create(req, res)
      .then(result => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      })
      .catch(err => {
        res.writeHead(err.code, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `${err.message}` }));
      });
  } else if (isUrlCorrectWithId && req.method == 'PUT') {
    update(req, res, id)
    .then(result => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    })
    .catch(err => {
      res.writeHead(err.code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `${err.message}` }));
    });
  } else if (isUrlCorrectWithId && req.method == 'DELETE') {
    await destroy(req, res, id);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Page with url: ${req.url} not fount page` }));
  }
});

module.exports = server;
