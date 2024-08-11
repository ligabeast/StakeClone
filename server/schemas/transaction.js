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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  referenceId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    // reference to game , deposit ...
  },
  transactionType: {
    type: DataTypes.STRING, // deposit, withdrawal, bet, payout, ...
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
