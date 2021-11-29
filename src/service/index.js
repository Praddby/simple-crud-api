const { personApi } = require("./personApi");
const db = require("../db");

personApi.setDB(db);

module.exports = personApi;
