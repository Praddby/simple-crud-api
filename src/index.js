const http = require("http");
const url = require('url');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const server = http.createServer((req, res) => {
  
  const isUrlCorrectGet = /^\/persons[/]{0,1}[\d]*$/g.test(req.url);
  const isUrlCorrectPost = /^\/persons[/]{0,1}$/g.test(req.url);
  const isUrlCorrectPutAndDelete = /^\/persons[/]{0,1}[\d]+$/g.test(req.url);

  if (isUrlCorrectGet && req.method === 'GET') {
    const id = +req.url.split('/').reverse()[0];
    if (isNaN(id)) {
      // TODO: get all
    } else {
      // TODO: get one
    }
    console.log("GET", id);
  } else if (isUrlCorrectPost && req.method == 'POST') {
    // TODO: add person and get it
  } else if (isUrlCorrectPutAndDelete && req.method == 'PUT') {
    const id = +req.url.split('/').reverse()[0];
    // TODO: edit person :id and get it
  } else if (isUrlCorrectPutAndDelete && req.method == 'DELETE') {
    const id = +req.url.split('/').reverse()[0];
    // TODO: delete person :id and get it
  } else {
    // TODO: get 404
  }
});

server.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT} ...`);
});