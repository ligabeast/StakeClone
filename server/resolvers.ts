import { schema as gameResolver } from './schemas/game.js';
import { schema as betResolver } from './schemas/bet.js';
import { schema as userResolver } from './schemas/user.js';
import e = require('express');
import { where } from 'sequelize';
import { get } from 'http';

const resolvers = {
    Query: {
        game: (parent, args, context) => {
            const Game = context.db.define('Game', gameResolver);
            return Game.findByPk(args.id);
        },
        games: (parent, args, context) => {
            const Game = context.db.define('Game', gameResolver);
            return Game.findAll();
        },
        bet: (parent, args, context) => {
            const Bet = context.db.define('Bet', betResolver);
            return Bet.findByPk(args.id);
        },
        bets: (parent, args, context) => {
            const Bet = context.db.define('Bet', betResolver);
            const queryOptions = {
                where: {},
                limit: args.limit || undefined,
                order: [],
            };

            if (args.status) {
                queryOptions.where = { betStatus: args.status };
            }

            if (args.order_by && args.order_dir) {
                queryOptions.order = [[args.order_by, args.order_dir]];
            }

            return Bet.findAll(queryOptions);
        },
        getDepositOfUser: async (parent, args, context) => {
            const { username } = args;
            const User = context.db.define('User', userResolver);
            const user = await User.findOne({
                attributes: ['deposit'],
                where: {
                    username: username,
                },
            });
            return user.deposit;
        },
    },
};

export default resolvers;
