const server = require("../server");
const supertest = require("supertest");

describe("Scenario 2", () => {
  const id = "1b98f69c-63ac-4357-9f73-81e0ad879ec2";
  const data = { "name": "Anna", "age": 18, "hobbies": ["anime", "manga"] };

  it("Should return empty array, if don't have data in DB", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body).toEqual([]);
  });

  it("Should return status code 201 after add data to DB", async () => {
    const response = await supertest(server).post("/persons").send(data);
    expect(response.statusCode).toBe(201);
  });

  it("Should return status code 404, if not found person by id", async () => {
    const response = await supertest(server).get(`/persons/${id}`);
    expect(response.statusCode).toBe(404);
  });
});
