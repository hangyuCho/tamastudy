'use strict';
const faker = require('faker');

const generatePosts = async ({ CategoryIds, UserIds }) => {
  let posts = [];
  for (let i = 0; i <= 99; i++) {
    let title = faker.lorem.sentence();
    let desc = faker.lorem.paragraph();
    let view = faker.random.number();
    let categoryRanNum = Math.floor(
      Math.random() * Math.floor(CategoryIds.length - 1)
    );
    let userRanNum = Math.floor(Math.random() * Math.floor(UserIds.length));
    let createdAt = faker.date.between('2020-01-01', '2020-08-26');
    let updatedAt = faker.date.between('2020-01-01', '2020-08-26');
    posts.push({
      title,
      desc,
      view,
      CategoryId: CategoryIds[categoryRanNum].id,
      UserId: UserIds[userRanNum].id,
      createdAt,
      updatedAt,
    });
  }
  return { data: posts };
};

module.exports = {
  up: async (queryInterface) => {
    try {
      const findCategories = await queryInterface.sequelize.query(
        'SELECT id from categories;'
      );
      const findUsers = await queryInterface.sequelize.query(
        'SELECT id from users;'
      );
      const CategoryIds = findCategories[0];
      const UserIds = findUsers[0];
      let { data: posts } = await generatePosts({ CategoryIds, UserIds });
      await queryInterface.bulkInsert('posts', posts, {});
    } catch (err) {
      console.error(err);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
