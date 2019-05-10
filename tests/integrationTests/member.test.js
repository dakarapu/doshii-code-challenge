import request from "supertest";
import server from "../../src/app";
import * as MemberModel from "../../src/db/models/member";

describe("Testing Members model enpoints", () => {
  afterAll(() => {
    server.close();
  });

  describe("GET /members", () => {
    it("homepage testing", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
    it("Should fetch all the Members successfully", async () => {
      const res = await request(server).get("/members");
      expect(res.status).toBe(200);
    });

    it("Should fetch a member with id 123", async () => {
      const res = await request(server).get("/members/123");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /members", () => {
    it("should successfully add member to database", async () => {
      await MemberModel.deleteMember(201);
      const res = await request(server)
        .post("/members")
        .send({ id: 201, name: "johnny" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(201);
    });

    it("should error add member to database for duplication", async () => {
      const res = await request(server)
        .post("/members")
        .send({ id: 201, name: "johnny" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(500);
    });
  });

  describe("POST /members", () => {
    it("should successfully delete member from database if exists", async () => {
      const res = await request(server).delete("/members/201");
      expect(res.status).toBe(200);
    });

    it("should throw error delete member from database if not exists", async () => {
      const res = await request(server).delete("/members/201");
      expect(res.status).toBe(404);
    });
  });
});
