const server = require("../server");
const supertest = require("supertest");

describe("Scenario 4", () => {
  const id = "1b98f69c-63ac-4357-9f73-81e0ad879ec-";
  const data = { "name": "Anna", "age": 18, "hobbies": ["anime", "manga"] };

  it("Should return empty array, if don't have data in DB", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body).toEqual([]);
  });

  it("Should return name person (Anna) after add data to DB", async () => {
    const response = await supertest(server).post("/persons").send(data);
    expect(response.body.name).toBe("Anna");
  });

  it("Should return status code 400, if id is invalid", async () => {
    const response = await supertest(server).delete(`/persons/${id}`);
    expect(response.statusCode).toBe(400);
  });
});
