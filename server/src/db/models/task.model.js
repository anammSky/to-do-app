const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Task extends Models {}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defultValue: false,
    },
    finishBy: {
      type: DataTypes.STRING,
    },
    authorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Task;
