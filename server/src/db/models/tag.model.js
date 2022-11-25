const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Tag extends Model {}

Tag.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        timestamps: false,
    }
);

module.exports = Tag;
