import Joi from "@hapi/joi";

export function rewardObjValidation(body) {
  const rewardSchema = Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required(),
    name: Joi.string()
      .min(3)
      .max(200)
      .required()
  });

  let { error } = Joi.validate(body, rewardSchema);

  if (error) {
    return error;
  } else {
    return null;
  }
}

export function memberObjValidation(body) {
  const memberSchema = Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required(),
    name: Joi.string()
      .min(3)
      .max(200)
      .required()
  });

  let { error } = Joi.validate(body, memberSchema);

  if (error) {
    return error;
  } else {
    return null;
  }
}

export function memberRewardObjValidation(body) {
  const memberRewardSchema = Joi.object().keys({
    memberId: Joi.number()
      .integer()
      .positive()
      .required(),
    rewardId: Joi.number()
      .integer()
      .positive()
      .required()
  });

  let { error } = Joi.validate(body, memberRewardSchema);

  if (error) {
    return error;
  } else {
    return null;
  }
}
