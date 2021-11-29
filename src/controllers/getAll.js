const personApi = require("../service");

const getAll = async (_, res) => {
  try {
    return await personApi.getAll();
  } catch (err) {
    console.log(`${err}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

module.exports = getAll;
