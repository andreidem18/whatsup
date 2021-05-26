"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("rooms", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      screenname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      owner: {
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
      private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "/public/static/img/uploads/room.jpg",
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
    return queryInterface.dropTable("rooms");
  },
};
