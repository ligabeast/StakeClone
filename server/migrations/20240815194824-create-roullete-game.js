"use strict";
const { schema } = require("../schemas/rouletteGames.js");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RoulleteGames", schema);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RoulleteGames");
  },
};
