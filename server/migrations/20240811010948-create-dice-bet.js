"use strict";
const { schema } = require("../schemas/diceBet.js");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DiceBets", schema);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DiceBets");
  },
};
