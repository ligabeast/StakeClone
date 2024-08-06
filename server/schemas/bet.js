const { Sequelize, DataTypes } = require("sequelize");

const schema = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  gameid: {
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
    allowNull: true,
  },
  transactionid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "Transactions",
      key: "id",
    },
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: "USD",
  },
  bet_status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "pending",
  },
  odds: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
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
