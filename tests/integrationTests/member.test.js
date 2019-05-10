const request = require("supertest");

let server;

describe("Testing Members model enpoints", () => {
  beforeEach(() => {
    server = require("../../src/app");
  });
  afterEach(() => {
    server.close();
  });

  describe("GET /members", () => {
    it("Should fetch all the Members successfully", async () => {
      const res = await request(server).get("/members");
      expect(res.status).toBe(200);
    });
  });
});
