"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class plantOffset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      plantOffset.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  plantOffset.init(
    {
      plants: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "plantOffset",
    }
  );
  return plantOffset;
};
