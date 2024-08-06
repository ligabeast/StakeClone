"use strict";
const { schema } = require("../schemas/bet.js");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bets", schema);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bets");
  },
};
