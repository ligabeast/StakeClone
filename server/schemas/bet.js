const { Sequelize, DataTypes } = require("sequelize");

const schema = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  gameId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "Games",
      key: "id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payout: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // ref to game specific bet
  referenceId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: "USD",
  },
  betStatus: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "pending",
  },
  odd: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
  updatedAt: {
    allowNull: true,
    type: Sequelize.DATE,
  },
};

module.exports = {
  schema,
};
