import * as Schemas from "../../src/utilities/schemaDefinitions";

describe("Validation Schema Suit", () => {
  it("Test Successful Reward Validation", () => {
    let res = Schemas.rewardObjValidation({ id: 100, name: "REWARD_1" });
    expect(res).toBe(null);
  });

  it("Test Successful Reward Validation", () => {
    let res = Schemas.rewardObjValidation({ id: 100, name: "RE" });
    expect(res).toHaveProperty("name", "ValidationError");
  });

  it("Test Successful Reward Validation", () => {
    let res = Schemas.memberObjValidation({ id: 500, name: "member_name" });
    expect(res).toBe(null);
  });

  it("Test Successful Reward Validation", () => {
    let res = Schemas.memberObjValidation({ name: "RE" });
    expect(res).toHaveProperty("name", "ValidationError");
    expect(res).toHaveProperty(
      "message",
      'child "id" fails because ["id" is required]'
    );
  });

  it("Test Successful Reward Validation", () => {
    let res = Schemas.memberRewardObjValidation({
      memberId: 500,
      rewardId: 100
    });
    expect(res).toBe(null);
  });

  it("Test Successful Reward Validation", () => {
    let res = Schemas.memberRewardObjValidation({
      memberId: 500,
      rewardId: "REWARD_1"
    });
    expect(res).toHaveProperty("name", "ValidationError");

    expect(res).toHaveProperty(
      "message",
      'child "rewardId" fails because ["rewardId" must be a number]'
    );
  });
});
