const personApi = require("../service");
const { v4: uuidv4 } = require('uuid');
const { validatePerson, validateHobbies } = require("../validation");

const create = (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      req.on('data', (chunck) => {
        const person = JSON.parse(chunck);
        if (!validatePerson(person)) {
          reject({code: 400, message: "Error, invalid params request"});
        } else {
          const id = uuidv4();
          const { name, age, hobbies } = person;
          const newHobbies = validateHobbies(hobbies);
          const data = { id, name, age, newHobbies };
          personApi.create(data);
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

module.exports = create;