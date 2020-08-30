const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Openchat extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        desc: {
          type: DataTypes.STRING(10000),
          allowNull: false,
        },
        code: {
          type: DataTypes.INTEGER(10),
          allowNull: true,
        },
      },
      {
        modelName: 'Openchat',
        tableName: 'openchats',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장 , 이모티콘 저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Openchat.belongsTo(db.User);
    db.Openchat.belongsTo(db.Category, {
      foreignKey: {
        field: 'CategoryId',
        allowNull: false,
      },
    });
  }
};
