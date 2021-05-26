"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
<<<<<<< HEAD
        onDelete: 'cascade'
=======
>>>>>>> 3b96a4a685fa5c131b00d1fa5f8d63985a1b2f7d
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "rooms",
          key: "id",
        },
<<<<<<< HEAD
        onDelete: 'cascade'
=======
>>>>>>> 3b96a4a685fa5c131b00d1fa5f8d63985a1b2f7d
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("messages");
  },
};
