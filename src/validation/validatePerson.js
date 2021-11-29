const isAge = (person) => person.age && typeof person.age === "number" && true;
const isName = (person) => person.name && typeof person.name === "string" && true;
const isHobbies = (person) => person.hobbies && Array.isArray(person.hobbies) && person.hobbies.filter(el => typeof el === "string").length && true;
module.exports = validatePerson = (person) => person && typeof person === "object" && isAge(person) && isName(person) && isHobbies(person) && true;
