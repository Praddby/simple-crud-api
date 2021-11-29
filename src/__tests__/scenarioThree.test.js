const server = require("../server");
const supertest = require("supertest");

describe("Scenario 3", () => {
  let id;
  const data = { "name": "Anna", "age": 18, "hobbies": ["anime", "manga"] };
  const newData = { "name": "John", "age": "23", "hobbies": ["chess"] };

  it("Should return empty array, if don't have data in DB", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body).toEqual([]);
  });

  it("Should return status code 201 after add data to DB", async () => {
    const response = await supertest(server).post("/persons").send(data);
    id = response.body.id;
    expect(response.statusCode).toBe(201);
  });

  it("Should return name person (Anna) by id", async () => {
    const response = await supertest(server).get(`/persons/${id}`);
    expect(response.body.name).toBe("Anna");
  });

  it("Should return status code 400, if newData is invalid", async () => {
    const response = await supertest(server).put(`/persons/${id}`).send(newData);
    expect(response.statusCode).toBe(400);
  });
});
