const { DataTypes: Sequelize } = require("sequelize");
import { resolvers as gameResolver } from "./schemas/game.js";

const resolvers = {
  Query: {
    game: (parent, args, context) => {
      console.log("resolvers", gameResolver);
      const Game = context.db.define("Game", gameResolver);
      return Game.findByPk(args.id);
    },
    games: () => {
      return {};
    },
  },
};

export default resolvers;
