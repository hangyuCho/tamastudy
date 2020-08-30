const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// filter = [{column: 'title', mode: 'like'}, {column: 'CategoryId', mode: 'normal'}]
const advancedResults = (service, filter = []) => async (req, res, next) => {
  let query = {};
  let reqQuery = { ...req.query };

  const removeFields = ['limit', 'cursor'];

  removeFields.forEach((param) => delete reqQuery[param]);

  filter.forEach((f) => {
    if (f.mode === 'normal') {
      if (!reqQuery[f.column]) {
        return;
      }
      query['where'] = {
        ...query.where,
        [f.column]: reqQuery[f.column],
      };
    } else if (f.mode === 'like') {
      if (!reqQuery[f.column]) {
        return;
      }
      query['where'] = {
        ...query.where,
        [f.column]: {
          [Op.like]: '%' + reqQuery[f.column] + '%',
        },
      };
    }
  });

  const cursor = req.query.cursor;
  const limit = parseInt(req.query.limit, 10) || 5;

  if (cursor) {
    query['where'] = {
      ...query.where,
      id: {
        [Op.lt]: cursor,
      },
    };
  }

  query = {
    ...query,
    limit: limit + 1,
    order: [
      ['id', 'DESC'],
      ['updatedAt', 'DESC'],
    ],
  };

  let dataList = await service({ query });

  const hasNextPage = dataList.length > limit;
  dataList = hasNextPage ? dataList.slice(0, -1) : dataList;

  req.advancedResults = {
    dataList,
    pageInfo: {
      nextPageCursor: hasNextPage ? dataList[dataList.length - 1].id : null,
      hasNextPage,
    },
  };

  next();
};

module.exports = advancedResults;
