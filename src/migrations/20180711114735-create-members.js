"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
<<<<<<< HEAD
    queryInterface.createTable("members", {      
=======
    return queryInterface.createTable("members", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
>>>>>>> 3b96a4a685fa5c131b00d1fa5f8d63985a1b2f7d
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
<<<<<<< HEAD
    //Composite primary key
    return queryInterface.addConstraint('members', {
      fields: ['user_id', 'room_id'],
      type: 'primary key',
      name: 'members_pkey'
    });
=======
>>>>>>> 3b96a4a685fa5c131b00d1fa5f8d63985a1b2f7d
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("members");
  },
};
