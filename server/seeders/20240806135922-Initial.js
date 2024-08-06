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
      name: "John Doe",
      email: "test@test.de",
      password: "password",
    }));
    const transactions = Array.from({ length: 1000 }, () => ({
      message: "Test",
    }));
    const bets = [
      {
        id: 1,
        userid: 101,
        gameid: 1,
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
        gameid: 4,
        amount: 75.5,
        payout: 150.0,
        transactionid: 102,
        currency: "EUR",
        bet_status: "won",
        odds: 2.0,
      },
      {
        id: 3,
        userid: 103,
        gameid: 3,
        amount: 25.0,
        payout: null,
        transactionid: 103,
        currency: "GBP",
        bet_status: "pending",
        odds: 3.25,
      },
      {
        id: 4,
        userid: 104,
        gameid: 2,
        amount: 100.0,
        payout: null,
        transactionid: 104,
        currency: "USD",
        bet_status: "lost",
        odds: 1.75,
      },
      {
        id: 5,
        userid: 105,
        gameid: 1,
        amount: 200.0,
        payout: 400.0,
        transactionid: 105,
        currency: "USD",
        bet_status: "won",
        odds: 2.0,
      },
    ];
    const games = [
      {
        name: "Roulette",
      },
      {
        name: "Blackjack",
      },
      {
        name: "Poker",
      },
      {
        name: "Craps",
      },
      {
        name: "Slots",
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
