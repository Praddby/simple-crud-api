const server = require("../server");
const supertest = require("supertest");

describe("GET /persons", () => {

  const firstPerson = { "name": "Anna", "age": 18, "hobbies": ["anime", "manga"] };
  const secondPerson = { "name": "John", "age": 23, "hobbies": ["tennis", "chess", "computer games"] };

  it("Should return status code 200, if DB works", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.statusCode).toBe(200);
  });

  it("Should return empty array, if don't have data in the DB", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body).toEqual([]);
  });

  it("Should return name person (Anna), if add data to DB successfully", async () => {
    const response= await supertest(server).post("/persons").send(firstPerson);
    expect(response.body.name).toBe("Anna");
  });

  it("Should return status code 201, if add second data to DB successfully", async () => {
    const response = await supertest(server).post("/persons").send(secondPerson);
    expect(response.statusCode).toBe(201);
  });

  it("Should return count data in DB (2)", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body.length).toBe(2);
  });
});

describe("GET /persons/:id", () => {
  let firstId;
  let secondId;

  beforeEach(async () => {
    const response = await supertest(server).get("/persons");
    firstId = response.body[0].id;
    secondId = response.body[1].id;
  });
  
  it("Should return status code 200, if DB has first data", async () => {
    const person = await supertest(server).get(`/persons/${firstId}`);
    expect(person.statusCode).toBe(200);
  });

  it("Should return name person (Anna), if DB has first data", async () => {
    const person = await supertest(server).get(`/persons/${firstId}`);
    expect(person.body.name).toBe("Anna");
  });

  it("Should return status code 200, if DB has second data", async () => {
    const person = await supertest(server).get(`/persons/${secondId}`);
    expect(person.statusCode).toBe(200);
  });

  it("Should return name person (John), if DB has second data", async () => {
    const person = await supertest(server).get(`/persons/${secondId}`);
    expect(person.body.name).toBe("John");
  });

  it("Should return status code 400, if id is invalid", async () => {
    const response = await supertest(server).get("/persons/123");
    expect(response.statusCode).toBe(400);
  });

  it("Should return status code 404, if not found id in DB", async () => {
    const response = await supertest(server).get("/persons/1b98f69c-63ac-4357-9f73-81e0ad879ec2");
    expect(response.statusCode).toBe(404);
  });
});