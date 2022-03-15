"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class electricityFootprint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      electricityFootprint.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  electricityFootprint.init(
    {
      consumption: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "electricityFootprint",
    }
  );
  return electricityFootprint;
};
