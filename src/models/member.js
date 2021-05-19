'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
     
    }
  };
  Member.init({
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    roomId: {
      type: DataTypes.INTEGER,
      field: "room_id"
    }
  }, {
    sequelize,
    modelName: 'Member',
    underscored: true
  });
  return Member;
};

