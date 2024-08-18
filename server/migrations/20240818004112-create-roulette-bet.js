'use strict';
const { schema } = require('../schemas/rouletteBet.js');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('RouletteBets', schema);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('RouletteBets');
    },
};
