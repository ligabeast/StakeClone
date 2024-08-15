const Sequelize = require("sequelize");

const schema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT,
  },
  winningNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  winningColor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  winningSection: {
    type: Sequelize.STRING,
    allowNull: false, //  "1-18", "19-36", etc.
  },
  isOdd: {
    type: Sequelize.BOOLEAN,
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
