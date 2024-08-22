const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');

import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';

import type { Request, Response } from 'express';
import fs from 'fs';
import type { CorsOptions } from 'cors';
import resolvers from './resolvers';

const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

import Express from 'express';
import { Query, Send } from 'express-serve-static-core';

import bcrypt from 'bcrypt';
import {
    generateSeed,
    LCG,
    calculateWinningAmount,
    calculateOdd,
} from './utils';

interface JWTToken {
    username: string;
    password: string;
    userid: number;
}

interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T;
}
interface TypedRequestBody<T> extends Express.Request {
    body: T;
    cookie: JWTToken;
}
export interface TypedResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}

app.use(bodyParser.json());

const generateToken = (payload): string => {
    const secretKey = process.env.JWT_PRIVATE_KEY;
    const options = {
        expiresIn: '24h',
        algorithm: 'RS256',
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
};

// Load environment variables from the .env file in the root directory
dotenv.config({ path: '../.env' });

const port = process.env.EXPRESS_PORT;
const allowedOrigins = process.env.CORS_ORIGIN.split(',');
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin, like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg =
                'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    methods: 'GET, POST, OPTIONS, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    maxAge: 86400,
};

if (process.env.CORS_ACTIVE === 'true') {
    app.use(cors(corsOptions));

    app.options('*', (req: Request, res: Response) => {
        res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, DELETE'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
        );
        res.header('Access-Control-Max-Age', '86400');
        res.send();
    });
}

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } =
    process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
    dialectOptions: {
        connectTimeout: 3000,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // Zeit in Millisekunden, um eine Verbindung zu erwerben
        idle: 10000, // Zeit in Millisekunden, nach der eine Verbindung in den Leerlauf geht
    },
});

const typeDefs = loadSchemaSync('./schema.graphql', {
    loaders: [new GraphQLFileLoader()],
});
const schema = makeExecutableSchema({ typeDefs, resolvers });

const saltRounds = 10;

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true, // Activates GraphiQL in-browser tool
        context: {
            db: sequelize,
        },
    })
);

import { schema as UserSchema } from './schemas/user.js';
import { schema as DiceBetSchema } from './schemas/diceBet.js';
import { schema as BetSchema } from './schemas/bet.js';
import { schema as TransactionSchema } from './schemas/transaction.js';
import { schema as GameSchema } from './schemas/game.js';
import { schema as RouletteGamesSchema } from './schemas/rouletteGames.js';
import { schema as RouletteBetsSchema } from './schemas/rouletteBet.js';
import { timeStamp } from 'console';

const User = sequelize.define('Users', UserSchema);
const DiceBet = sequelize.define('DiceBets', DiceBetSchema, {
    timestamps: false,
});
const Bet = sequelize.define('Bets', BetSchema);
const Transaction = sequelize.define('Transactions', TransactionSchema);
const Game = sequelize.define('Games', GameSchema);
const RouletteGame = sequelize.define('RouletteGames', RouletteGamesSchema);
const RouletteBets = sequelize.define('RouletteBets', RouletteBetsSchema, {
    timestamps: false,
});

// middleware for jwt token
const verifyToken = (req, res, next) => {
    // get token from header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({
            success: false,
            message: 'A authorization header is required',
        });
    }

    const authHeaderParts = authHeader.split(' ');

    if (authHeaderParts.length !== 2) {
        return res.status(403).json({
            success: false,
            message: 'Auth Header wrong',
        });
    }

    const token = authHeaderParts[1];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'A token is required for authentication',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY, {
            algorithm: 'RS256',
        });
        req.cookie = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};

app.post(
    '/login',
    async (
        req: TypedRequestBody<{ username: string; password: string }>,
        res: TypedResponse<{
            success: boolean;
            message: string;
            token?: string;
            deposit?: number;
            username?: string;
        }>
    ) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(401).json({
                success: false,
                message: 'Please provide username and password',
            });
        }

        try {
            // Query to get the hashed password from the database
            const userFound = await User.findOne({
                where: {
                    username,
                },
                attributes: ['password', 'deposit', 'id'],
            });
            if (userFound?.password) {
                const storedHashedPassword = userFound.password;
                const deposit = userFound.deposit;
                const userid = userFound.id;
                // Compare the provided password with the stored hashed password
                const isPasswordMatch = await bcrypt.compare(
                    password,
                    storedHashedPassword
                );

                if (!isPasswordMatch) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid username or password',
                    });
                }

                // Generate JWT token
                const token = generateToken({
                    username,
                    password: storedHashedPassword,
                    userid,
                });

                // Set the token in a cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000, // 1 hour
                });

                return res.json({
                    success: true,
                    message: 'Login successfully',
                    token: token,
                    username: username,
                    deposit: deposit,
                });
            } else {
                return res.status(402).json({
                    success: false,
                    message: 'Invalid username or password',
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while logging in.',
            });
        }
    }
);

app.post(
    '/register',
    async (
        req: TypedRequestBody<{ username: string; password: string }>,
        res: TypedResponse<{
            success: boolean;
            message: string;
            token?: string;
            deposit?: number;
            username?: string;
        }>
    ) => {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //check if user already exists

        const checkDb = await User.findAll({
            where: {
                username,
            },
            attributes: ['id'],
        });

        if (checkDb.length > 0) {
            return res.status(401).json({
                success: false,
                message: 'Username already exists',
            });
        }

        const user = await User.create({
            username,
            password: hashedPassword,
            deposit: '50.00',
        });

        const token = generateToken({
            username,
            password: hashedPassword,
            userid: user.id,
        });

        if (user) {
            res.json({
                success: true,
                message: 'User registered successfully',
                token: token,
                username: username,
                deposit: 50.0,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to register user',
            });
        }
    }
);

app.listen(port, async () => {
    console.log(`Server running at Port:${port}`);
    try {
        await sequelize.authenticate();
        console.log('Connection to DB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the DB:', error);
    }
});

app.post(
    '/play/dice',
    verifyToken,
    async (
        req: TypedRequestBody<{
            rollMode: string;
            rollValue: number;
            amount: number;
        }>,
        res: TypedResponse<{
            success: boolean;
            message: string;
            randomNumber?: number;
            newBalance?: number;
            error?: string;
        }>
    ) => {
        const { rollMode, rollValue, amount } = req.body;

        if (!rollMode || !rollValue || (!amount && amount !== 0)) {
            return res.json({
                success: false,
                message: 'Please provide all the required fields',
            });
        }

        if (rollValue < 1 || rollValue > 99) {
            return res.json({
                success: false,
                message: 'Roll value should be between 1 and 99',
            });
        }

        if (amount < 0) {
            return res.json({
                success: false,
                message: 'Amount should be greater than 0',
            });
        }

        if (rollMode !== 'Roll Under' && rollMode !== 'Roll Over') {
            return res.json({
                success: false,
                message:
                    "Roll mode should be either 'Roll Under' or 'Roll Over'",
            });
        }
        // Take only the first two digits
        const amountFixed = Number(amount.toFixed(2));
        const winChance =
            (rollMode === 'Roll Over' ? 100 - rollValue : rollValue) / 100;
        const odd = calculateOdd(winChance);
        const potentialWin = calculateWinningAmount(amountFixed, winChance);

        const generatedSeed = generateSeed();
        const lcg = new LCG(generatedSeed);
        const randomNumber = lcg.next();

        const rollValueDecimal = Number('0.' + rollValue);

        const userHasWon =
            (rollMode === 'Roll Over' && randomNumber > rollValueDecimal) ||
            (rollMode === 'Roll Under' && randomNumber < rollValueDecimal);

        const user = await User.findOne({
            where: {
                username: req.cookie.username,
            },
            attributes: ['deposit', 'id'],
        });

        console.log('user found:', user);

        if (potentialWin + user.deposit === user.deposit) {
            return res.json({
                success: userHasWon,
                message: userHasWon ? 'You won!' : 'You lost!',
                randomNumber,
                newBalance: user.deposit,
            });
        }

        if (user.deposit < amountFixed) {
            return res.status(401).json({
                success: false,
                message: 'Insufficient funds',
            });
        }

        const transaction = await sequelize.transaction();
        try {
            const { referenceId } = await storeDiceBet({
                amountFixed,
                rollValue,
                rollMode,
                generatedSeed,
                transaction,
                odd,
                potentialWin,
                userHasWon,
                user,
            });

            user.deposit -= amountFixed;

            if (userHasWon) {
                const message = `Won ${amountFixed}$ on a ${rollMode} of ${rollValue}`;
                Transaction.create(
                    {
                        message,
                        amount: potentialWin,
                        userId: user.id,
                        referenceId: referenceId,
                        transactionType: 'win',
                    },
                    { transaction }
                );
                await User.update(
                    { deposit: user.deposit + potentialWin },
                    {
                        where: {
                            id: user.id,
                        },
                        transaction,
                    }
                );
                await transaction.commit();
                return res.json({
                    success: true,
                    message: 'You won!',
                    randomNumber,
                    newBalance: potentialWin + user.deposit,
                });
            } else {
                await transaction.commit();
                return res.json({
                    success: false,
                    message: 'You lost!',
                    randomNumber,
                    newBalance: user.deposit,
                });
            }
        } catch (error) {
            console.error('Error during dice play:', error);
            await transaction.rollback();
            return res.status(500).json({
                success: false,
                message: 'An error occurred while playing dice.',
                error: error,
            });
        }
    }
);

app.post(
    '/play/roulette',
    verifyToken,
    async (
        req: TypedRequestBody<{
            placedAdditionalBets: number[];
            placedNumberBets: number[];
        }>,
        res: TypedResponse<{
            success: boolean;
            message: string;
            newBalance?: number;
        }>
    ) => {
        const { placedNumberBets, placedAdditionalBets } = req.body;
        const user = await User.findOne({
            where: {
                username: req.cookie.username,
            },
            attributes: ['deposit', 'id'],
        });

        const betAmount =
            placedNumberBets.reduce((acc, bet) => acc + bet, 0) +
            placedAdditionalBets.reduce((acc, bet) => acc + bet, 0);

        if (betAmount > user.deposit) {
            return res.status(401).json({
                success: false,
                message: 'Insufficient funds',
            });
        }

        // Find current running Roulette Game
        const room = 1;
        const currentGame = await RouletteGame.findOne({
            where: {
                status: 'running',
                room: room,
            },
            order: [['createdAt', 'DESC']],
            attributes: ['id'],
        });

        const game = await Game.findOne({
            where: {
                name: 'Roulette',
            },
            attributes: ['id'],
        });

        const transaction = await sequelize.transaction();
        try {
            // Update User Deposit
            await User.update(
                { deposit: user.deposit - betAmount },
                {
                    where: {
                        id: user.id,
                    },
                    transaction,
                }
            );

            // Insert Roulette Bet
            const rouletteBet = await RouletteBets.create({
                numberBets: JSON.stringify(placedNumberBets),
                additionalBets: JSON.stringify(placedAdditionalBets),
                rouletteGameId: currentGame.id,
            });

            // Insert Bet
            const bet = await Bet.create(
                {
                    userId: user.id,
                    gameId: game.id,
                    amount: betAmount,
                    referenceId: rouletteBet.id,
                },
                { transaction }
            );

            const message = `Bet ${betAmount}$ on Roulette room:${room},betId:${bet.id}`;

            // Insert Transaction
            await Transaction.create(
                {
                    message,
                    amount: betAmount,
                    userId: user.id,
                    referenceId: bet.id,
                    transactionType: 'bet',
                },
                { transaction }
            );
            await transaction.commit();
            return res.end(
                JSON.stringify({
                    success: true,
                    message: 'The bet is accepted',
                    newBalance: user.deposit - betAmount,
                })
            );
        } catch (error) {
            console.error('Error during roulette play:', error);
            await transaction.rollback();
            return res.status(500).json({
                success: false,
                message: 'An error occurred while playing roulette.',
            });
        }
    }
);

async function storeDiceBet({
    amountFixed,
    rollValue,
    rollMode,
    transaction,
    odd,
    generatedSeed,
    potentialWin,
    userHasWon,
    user,
}: {
    amountFixed: number;
    rollValue: number;
    rollMode: string;
    odd: number;
    potentialWin: number;
    generatedSeed: string;
    userHasWon: boolean;
    transaction: any;
    user: { deposit: number; id: number };
}): Promise<{ referenceId: number }> {
    const message = `Placed a bet of ${potentialWin}$ on a Dice Roll`;

    const game = await Game.findOne({
        where: {
            name: 'Dice',
        },
        attributes: ['id'],
    });

    await User.update(
        { deposit: user.deposit - amountFixed },
        {
            where: {
                id: user.id,
            },
            transaction,
        }
    );

    const diceBet = await DiceBet.create({
        hashSeed: generatedSeed,
        rollMode,
        odd,
        payout: potentialWin,
        rollValue,
    });

    const bet = await Bet.create(
        {
            userId: user.id,
            gameId: game.id,
            amount: amountFixed,
            referenceId: diceBet.id,
            betStatus: userHasWon ? 'win' : 'lose',
            odd,
        },
        { transaction }
    );

    await Transaction.create(
        {
            message,
            amount: amountFixed,
            userId: user.id,
            referenceId: bet.id,
            transactionType: 'bet',
        },
        { transaction }
    );
    return { referenceId: bet.id };
}
