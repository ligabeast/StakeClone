const { DataTypes: Sequelize } = require("sequelize");

const resolvers = {
  Query: {
    game: (parent, args, context) => {
      const Game = context.db.define("Game", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      });
      return Game.findByPk(args.id);
    },
    games: () => {
      return {};
    },
  },
};

export default resolvers;
