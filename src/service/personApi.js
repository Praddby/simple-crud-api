class PersonApi {
  constructor() {
    this._db = null;
  }

  setDB(db) {
    this._db = db;
  }

  async hasPerson(id) {
    return new Promise((resolve, _) => {
      resolve(this._db.has(id));
    });
  }

  async getAll() {
    return new Promise((resolve, _) => {
      const persons = [];
      for (let person of this._db.values()) {
        person && persons.push(person);
      }
      resolve(persons);
    });
  }

  async getOne(id) {
    return new Promise((resolve, _) => {
      resolve(this._db.get(id));
    });
  }

  create(data) {
    return new Promise((resolve, _) => {
      this._db.set(data.id, data);
      resolve(this._db.get(data.id));
    });
  }

  update(id, data) {
    return new Promise((resolve, _) => {
      this._db.delete(id);
      this._db.set(id, data);
      resolve(data);
    });
  }

  destroy(id) {
    return new Promise((resolve, _) => {
      resolve(this._db.delete(id));
    });
  }
}

exports.personApi = new PersonApi();
