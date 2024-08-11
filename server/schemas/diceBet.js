const { timeStamp } = require("console");
const { Sequelize, DataTypes } = require("sequelize");

const schema = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  rollMode: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  rollValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = {
  schema,
};
