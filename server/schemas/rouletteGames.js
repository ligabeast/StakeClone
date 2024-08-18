const Sequelize = require('sequelize');

const schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
    },
    room: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'running', // "running", "completed"
    },
    winningNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    winningColor: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    winningSection: {
        type: Sequelize.STRING,
        allowNull: true, //  "1-18", "19-36", etc.
    },
    isOdd: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
    },
};

module.exports = {
    schema,
};
