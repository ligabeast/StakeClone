import { Game } from "./models/game";

const resolvers = {
  Query: {
    game: (parent, args) => {
      return Game.findByPk(args.id);
    },
    games: () => {
      return Game.findAll();
    },
  },
};

export default resolvers;
