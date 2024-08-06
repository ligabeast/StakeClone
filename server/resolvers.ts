const { DataTypes: Sequelize } = require("sequelize");
import { resolvers as gameResolver } from "./schemas/game.js";
import { resolvers as betResolver } from "./schemas/bet.js";

const resolvers = {
  Query: {
    game: (parent, args, context) => {
      const Game = context.db.define("Game", gameResolver);
      return Game.findByPk(args.id);
    },
    games: () => {
      return {};
    },
    bet: (parent, args, context) => {
      const Bet = context.db.define("Bet", betResolver);
      return Bet.findByPk(args.id);
    },
  },
};

export default resolvers;
