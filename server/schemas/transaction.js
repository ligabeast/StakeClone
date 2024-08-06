const { Sequelize, DataTypes } = require("sequelize");

const schema = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = {
  schema,
};
