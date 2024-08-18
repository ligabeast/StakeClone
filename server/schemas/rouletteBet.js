const { Sequelize, DataTypes } = require('sequelize');

const schema = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    numberBets: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    additionalBets: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

module.exports = {
    schema,
};
