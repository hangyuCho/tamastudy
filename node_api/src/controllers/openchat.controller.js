const expressAsyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {
  createOpenchat,
  findOpenchatById,
  findOpenchatList,
  updateOpenchatById,
  deleteOpenchatById,
} = require('../services/openchat.service');

module.exports.getOpenchatList = expressAsyncHandler(async (req, res) => {
  const cursor = req.query.cursor;
  const limit = parseInt(req.query.limit, 10) || 10;
  const CategoryId = req.query.CategoryId;
  const title = req.query.title;

  let query = {};

  if (cursor) {
    query['where'] = {
      ...query.where,
      id: {
        [Op.lt]: cursor,
      },
    };
  }

  if (CategoryId) {
    query['where'] = {
      ...query.where,
      CategoryId,
    };
  }

  if (title) {
    query['where'] = {
      ...query.where,
      title: {
        [Op.like]: '%' + title + '%',
      },
    };
  }

  query = { ...query, limit: limit + 1 };
  let { openchatList } = await findOpenchatList({ query });
  const hasNextPage = openchatList.length > limit;
  openchatList = hasNextPage ? openchatList.slice(0, -1) : openchatList;

  res.status(201).json({
    openchatList,
    pageInfo: {
      nextPageCursor: hasNextPage
        ? openchatList[openchatList.length - 1].id
        : null,
      hasNextPage,
    },
  });
});

module.exports.getOpenchat = expressAsyncHandler(async (req, res) => {
  const { openchat } = await findOpenchatById({
    openchatId: req.params.openchatId,
  });
  res.status(201).json(openchat);
});

module.exports.createOpenchat = expressAsyncHandler(async (req, res) => {
  let { openchat } = await createOpenchat({
    UserId: req.user.id,
    requestBody: req.body,
  });
  openchat = await findOpenchatById({ openchatId: openchat.id });
  res.status(201).json(openchat);
});

module.exports.editOpenchat = expressAsyncHandler(async (req, res) => {
  await updateOpenchatById({
    requestBody: req.body,
    openchatId: req.params.openchatId,
  });
  const { openchat } = await findOpenchatById({
    openchatId: req.params.openchatId,
  });
  res.status(201).json(openchat);
});

module.exports.deleteOpenchat = expressAsyncHandler(async (req, res) => {
  await deleteOpenchatById({
    openchatId: req.params.openchatId,
  });
  res.status(200).json(parseInt(req.params.openchatId, 10));
});
