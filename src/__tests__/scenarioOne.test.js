const server = require("../server");
const supertest = require("supertest");

describe("Scenario 1", () => {
  let id;
  const data = { "name": "Anna", "age": 18, "hobbies": ["anime", "manga"] };
  const newData = { "name": "John", "age": 23, "hobbies": ["chess"] };

  it("Should return empty array, if don't have data in DB", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body).toEqual([]);
  });

  it("Should return data after add data to DB", async () => {
    const response = await supertest(server).post("/persons").send(data);
    id = response.body.id;
    expect(response.body.name).toBe(data.name);
    expect(response.body.age).toBe(data.age)
    expect(response.body.hobbies).toContain(...data.hobbies);
  });

  it("Should return object person by id", async () => {
    const response = await supertest(server).get(`/persons/${id}`);
    expect(response.body.name).toBe(data.name);
    expect(response.body.age).toBe(data.age)
    expect(response.body.hobbies).toContain(...data.hobbies);
  });

  it("Should return updated object person by id", async () => {
    const response = await supertest(server).put(`/persons/${id}`).send(newData);
    expect(response.body.name).toBe(newData.name);
    expect(response.body.age).toBe(newData.age)
    expect(response.body.hobbies).toContain(...newData.hobbies);
  });

  it("Should return status code 204, after delete data in DB", async () => {
    const response = await supertest(server).delete(`/persons/${id}`);
    expect(response.statusCode).toBe(204);
  });

  it("Should return empty array, after delete data in DB", async () => {
    const response = await supertest(server).get("/persons");
    expect(response.body).toEqual([]);
  });

});
