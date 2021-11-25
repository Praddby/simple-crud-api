const personApi = require("../service");
const { validatePerson, validateHobbies } = require("../validation");
const { validate : uuidValidate  } = require('uuid');

const update = async (req, res, id) => {
  const isExsitId = await personApi.hasPerson(id);
  try{
    return new Promise((resolve, reject) => {
      req.on('data', (chunck) => {
        const person = JSON.parse(chunck);
        if (!validatePerson(person)) {
          reject({code: 400, message: "Error, invalid params request"});
        } else if (!uuidValidate(id)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: `The id: ${id} is invalid` }));
        } else if (!isExsitId) {
          reject({code: 404, message: `Person with id: ${id} not found`});
        } else {
          const { name, age, hobbies } = person;
          const newHobbies = validateHobbies(hobbies);
          const data = { id, name, age, newHobbies };
          personApi.update(id, data);
          resolve(data);
        }
      });
    });
  } catch (err) {
    console.log(`${err}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

module.exports = update;
