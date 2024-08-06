"use strict";
const { schema } = require("../schemas/game.js");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", schema);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Games");
  },
};
