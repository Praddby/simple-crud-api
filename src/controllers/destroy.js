const personApi = require("../service");
const { validate : uuidValidate  } = require('uuid');

const destroy = async (_, res, id) => {
  const isExsitId = await personApi.hasPerson(id);
  try {
    if (!uuidValidate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `The id: ${id} is invalid` }));
    } else if (!isExsitId) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Person with id: ${id} not found` }));
    } else {
      return await personApi.destroy(id);
    }
  } catch (err) {
    console.log(`${err}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

module.exports = destroy;
