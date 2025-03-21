'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'avatar', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'bio', {
        type: Sequelize.TEXT,
        allowNull: true,
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'avatar'),
      queryInterface.removeColumn('Users', 'bio'),
    ])
  }
};
