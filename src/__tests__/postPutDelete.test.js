const server = require("../server");
const supertest = require("supertest");

describe("POST /persons", () => {

  it("Should return empty array, if don't have data in the DB", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body).toEqual([]);
  });

  it("Should return count persons (1), if add data to DB successfully", async () => {
    const data = {
      "name": "Anna",
      "age": 18,
      "hobbies": ["anime", "manga"]
    };
    await supertest(server).post("/persons").send(data);
    const response = await supertest(server).get("/persons");
    expect(response.body.length).toBe(1);
  });

  it("Should return count persons (2), if add data to DB successfully", async () => {
    const data = {
      "name": "John",
      "age": 23,
      "hobbies": ["tennis", "chess", "computer games"]
    };
    await supertest(server).post("/persons").send(data);
    const response = await supertest(server).get("/persons");
    expect(response.body.length).toBe(2);
  });

  it("Should return count persons (3), if add data to DB successfully", async () => {
    const data = {
      "name": "Marfa",
      "age": 52,
      "hobbies": ["knitting"]
    };
    await supertest(server).post("/persons").send(data);
    const response = await supertest(server).get("/persons");
    expect(response.body.length).toBe(3);
  });
  
  it("Should return status code 404, if invalid params request", async () => {
    const data = {
      "name": 123,
      "age": "33",
      "hobbies": ["knitting"]
    };
    const response = await supertest(server).post("/persons").send(data);
    expect(response.statusCode).toBe(400);
  });
});

describe("PUT /persons/:id", () => {

  let firstId;
  const data = { "name": "Helena", "age": 19, "hobbies": ["anime", "manga"] };

  beforeEach(async () => {
    const response = await supertest(server).get("/persons");
    firstId = response.body[0].id;
  });

  it("Should return count persons (3), before update first data", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body.length).toBe(3);
  });

  it("Should return name person (Helena), if update data to DB successfully", async () => {
    const response = await supertest(server).put(`/persons/${firstId}`).send(data);
    expect(response.body.name).toBe("Helena");
  });

  it("Should return count persons (3), after update first data", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body.length).toBe(3);
  });

  it("Should return status code 400, if id is invalid", async () => {
    const response = await supertest(server).put("/persons/123").send(data);
    expect(response.statusCode).toBe(400);
  });

  it("Should return status code 404, if not found id in DB", async () => {
    const response = await supertest(server).put("/persons/1b98f69c-63ac-4357-9f73-81e0ad879ec2").send(data);
    expect(response.statusCode).toBe(404);
  });

  it("Should return status code 404, if invalid params request", async () => {
    data.age = "18";
    const response = await supertest(server).put(`/persons/${firstId}`).send(data);
    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE /persons/:id", () => {

  let arrId = [];

  beforeAll(async () => {
    const res = await supertest(server).get("/persons");
    return arrId = res.body.map(el => el.id);
  });

  it("Should return count persons (3), before delete all data", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body.length).toBe(3);
  });

  // test.each(arrId)('Should return 204 for deleted id: %s',
  //   async (id) => {
  //     const response = await supertest(server).delete(`/persons/${id}`);
  //     expect(response.statusCode).toBe(204);
  //   }    
  // );

  it("Should return 204 for each deleted person from DB", async () => {
    for (let i = 0; i < arrId.length; i++) {
      const response = await supertest(server).delete(`/persons/${arrId[i]}`);
      expect(response.statusCode).toBe(204);
    }
  });

  it("Should return count persons (0), after delete all data", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body.length).toBe(0);
  });

  it("Should return status code 400, if id is invalid", async () => {
    const response = await supertest(server).delete("/persons/123");
    expect(response.statusCode).toBe(400);
  });

  it("Should return status code 404, if not found id in DB", async () => {
    const response = await supertest(server).delete("/persons/1b98f69c-63ac-4357-9f73-81e0ad879ec2");
    expect(response.statusCode).toBe(404);
  });
});
