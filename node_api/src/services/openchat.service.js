const { User, Category, Openchat } = require('../db/models');

module.exports.findOpenchatList = async ({ query }) => {
  const openchatListRecord = await Openchat.findAll({
    ...query,
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
    ],
    order: [
      ['id', 'DESC'],
      ['updatedAt', 'DESC'],
    ],
  });
  return { openchatList: openchatListRecord };
};

module.exports.findOpenchatById = async ({ openchatId }) => {
  const openchatRecord = await Openchat.findOne({
    where: {
      id: openchatId,
    },
    include: [
      {
        model: User,
        attributes: [
          'id',
          'username',
          'email',
          'facebook',
          'twitter',
          'github',
        ],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
    ],
  });
  return { openchat: openchatRecord };
};

module.exports.createOpenchat = async ({ UserId, requestBody }) => {
  const openchatRecord = await Openchat.create({
    UserId,
    ...requestBody,
  });
  return { openchat: openchatRecord };
};

module.exports.updateOpenchatById = async ({ requestBody, openchatId }) => {
  let openchatRecord = await Openchat.update(requestBody, {
    where: {
      id: openchatId,
    },
    logging: true,
  });
  return { openchat: openchatRecord };
};

module.exports.deleteOpenchatById = async ({ openchatId }) => {
  const openchatRecord = await Openchat.destroy({
    where: {
      id: openchatId,
    },
  });
  return { openchat: openchatRecord };
};
