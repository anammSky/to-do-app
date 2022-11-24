const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Task extends Model {}

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
    },
    {
        sequelize: db,
    }
);

module.exports = Task;
