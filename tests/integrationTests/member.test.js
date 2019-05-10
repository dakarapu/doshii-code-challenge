import request from "supertest";
import server from "../../src/app";
import * as MemberModel from "../../src/db/models/member";
import * as RewardModel from "../../src/db/models/reward";

describe("Testing Members model enpoints", () => {
  beforeAll(async () => {
    await MemberModel.truncateMemberTable();
    await MemberModel.truncateMemberRewardTable();
    await RewardModel.truncateRewardTable();
  });
  afterAll(() => {
    server.close();
  });

  describe("GET /members", () => {
    it("homepage testing", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
    it("Should throw 404 error when no members found", async () => {
      const res = await request(server).get("/members");
      expect(res.status).toBe(404);
    });

    it("Should fetch all the Members successfully", async () => {
      await MemberModel.createMember({ id: 201, name: "johnny" });
      const res = await request(server).get("/members");
      expect(res.status).toBe(200);
    });

    it("Should fetch member successfully when searching member with an id that exists", async () => {
      const res = await request(server).get("/members/201");
      expect(res.status).toBe(200);
    });

    it("Should throw error fetching all memebers", async () => {
      const res = await request(server).get("/member");
      expect(res.status).toBe(404);
    });

    it("Should throw 404 error when searching member with id that does not exists", async () => {
      await MemberModel.deleteMember(201);
      const res = await request(server).get("/members/123");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /members", () => {
    it("should successfully add member to database", async () => {
      await MemberModel.deleteMember(201);
      const res = await request(server)
        .post("/members")
        .send({ id: 201, name: "jo" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(400);
    });

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

  describe("DELETE /members", () => {
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
