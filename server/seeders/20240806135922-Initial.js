"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const games = [
      {
        name: "Mines",
        img: "/assets/games/Mines.jpg",
      },
      {
        name: "Dice",
        img: "/assets/games/Dice.jpg",
      },
      {
        name: "Roulette",
        img: "/assets/games/Roulette.jpg",
      },
    ];
    await queryInterface.bulkInsert("Games", games, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
