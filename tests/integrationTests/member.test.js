import server from "../../src/app";

import request from "supertest";

describe("Testing Members model enpoints", () => {
  // beforeEach(async () => {
  //   server = await require("../../src/app");
  // });
  // afterEach(() => {
  //   server.close();
  // });

  describe("GET /members", () => {
    it("Should fetch all the Members successfully", async () => {
      const res = await request(server).get("/members");
      expect(res.status).toBe(200);
    });
  });
});
