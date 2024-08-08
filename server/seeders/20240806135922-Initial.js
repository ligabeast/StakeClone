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
    const users = Array.from({ length: 1000 }, () => ({
      // generate random username
      username: Math.random().toString(36).substring(7),
      password: "password",
    }));
    const transactions = Array.from({ length: 1000 }, () => ({
      message: "Test",
    }));
    const bets = [
      {
        id: 1,
        userid: 101,
        gameid: 2,
        amount: 50.0,
        payout: null,
        transactionid: 100,
        currency: "USD",
        bet_status: "pending",
        odds: 1.5,
      },
      {
        id: 2,
        userid: 102,
        gameid: 1,
        amount: 75.5,
        payout: 150.0,
        transactionid: 102,
        currency: "EUR",
        bet_status: "won",
        odds: 2.0,
      },
    ];
    const games = [
      {
        name: "Mines",
        img: "/assets/games/Mines.jpg",
      },
      {
        name: "Dice",
        img: "/assets/games/Dice.jpg",
      },
    ];
    await queryInterface.bulkInsert("Transactions", transactions, {});
    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("Games", games, {});
    await queryInterface.bulkInsert("Bets", bets, {});
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
