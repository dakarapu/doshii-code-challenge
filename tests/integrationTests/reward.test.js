import request from "supertest";
import server from "../../src/app";
import * as MemberModel from "../../src/db/models/member";
import * as RewardModel from "../../src/db/models/reward";

describe("Testing Rewards model enpoints", () => {
  beforeAll(async () => {
    await MemberModel.truncateMemberTable();
    await MemberModel.truncateMemberRewardTable();
    await RewardModel.truncateRewardTable();
  });
  afterAll(() => {
    server.close();
  });

  describe("GET /rewards", () => {
    it("Should throw 404 error when no rewards found", async () => {
      const res = await request(server).get("/rewards");
      expect(res.status).toBe(404);
    });

    it("Should fetch all the Rewards successfully", async () => {
      await RewardModel.createReward({ id: 500, name: "REWARD_1" });
      const res = await request(server).get("/rewards");
      expect(res.status).toBe(200);
    });

    it("Should fetch reward successfully when searching reward with an id that exists", async () => {
      const res = await request(server).get("/rewards/500");
      expect(res.status).toBe(200);
    });

    it("Should throw error fetching all rewards", async () => {
      const res = await request(server).get("/reward");
      expect(res.status).toBe(404);
    });

    it("Should throw 404 error when searching reward with id that does not exists", async () => {
      await RewardModel.deleteReward(201);
      const res = await request(server).get("/rewards/123");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /rewards", () => {
    it("should throw validation error while adding reward to database", async () => {
      await RewardModel.deleteReward(500);
      const res = await request(server)
        .post("/rewards")
        .send({ id: 500, name: "R" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(400);
    });

    it("should successfully add reward to database", async () => {
      await RewardModel.deleteReward(500);
      const res = await request(server)
        .post("/rewards")
        .send({ id: 500, name: "REWARD_1" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(201);
    });

    it("should error add reward to database for duplication", async () => {
      const res = await request(server)
        .post("/rewards")
        .send({ id: 500, name: "REWARD_1" })
        .set("Content-Type", "application/json");
      expect(res.status).toBe(500);
    });
  });

  describe("DELETE /rewards", () => {
    it("should successfully delete reward from database if exists", async () => {
      const res = await request(server).delete("/rewards/500");
      expect(res.status).toBe(200);
    });

    it("should throw error delete reward from database if not exists", async () => {
      const res = await request(server).delete("/rewards/500");
      expect(res.status).toBe(404);
    });
  });
});
