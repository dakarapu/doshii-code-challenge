import request from "supertest";
import server from "../../src/app";
import * as MemberModel from "../../src/db/models/member";
import * as RewardModel from "../../src/db/models/reward";

describe("Testing Members Rewards enpoint", () => {
  beforeAll(async () => {
    await MemberModel.truncateMemberTable();
    await MemberModel.truncateMemberRewardTable();
    await RewardModel.truncateRewardTable();
    await MemberModel.createMember({ id: 100, name: "User_1" });
    await RewardModel.createReward({ id: 400, name: "REWARD_1" });
  }, 6000);
  afterAll(async () => {
    await MemberModel.deleteMember(100);
    await RewardModel.deleteReward(400);
    server.close();
  });

  describe("POST /members/:memberId/rewards/:rewardId", () => {
    it("should throw validation error when passing invalid arguments in url", async () => {
      const res = await request(server).post("/members/abc/rewards/400");
      expect(res.status).toBe(400);
    });
    it("should successfully add existing reward to a member in database", async () => {
      const res = await request(server).post("/members/100/rewards/400");
      expect(res.status).toBe(201);
    });

    it("should throw 500 error when passing invalid member ID", async () => {
      const res = await request(server).post("/members/160/rewards/400");
      expect(res.status).toBe(500);
    });

    it("should throw 500 error when passing invalid reward ID", async () => {
      const res = await request(server).post("/members/100/rewards/460");
      expect(res.status).toBe(500);
    });
  });
});
