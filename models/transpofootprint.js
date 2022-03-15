"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transpoFootprint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transpoFootprint.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  transpoFootprint.init(
    {
      title: DataTypes.STRING,
      footBikeDistance: DataTypes.INTEGER,
      trainDistance: DataTypes.INTEGER,
      carDistance: DataTypes.INTEGER,
      planeDistance: DataTypes.INTEGER,
      footBikeDays: DataTypes.INTEGER,
      trainDays: DataTypes.INTEGER,
      carDays: DataTypes.INTEGER,
      planeDays: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transpoFootprint",
    }
  );
  return transpoFootprint;
};
