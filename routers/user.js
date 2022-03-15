const express = require("express");
const { Router } = require("express");
const router = new Router();

const User = require("../models").user;
const TranspoFootprint = require("../models").transpoFootprint;
const ElectricityFootprint = require("../models").electricityFootprint;
const PlantOffset = require("../models").plantOffset;

const auth = require("../auth/middleware");

//GET all user and all emissions (footprint and offset)
//TODO add auth after :id
router.get("/", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: TranspoFootprint,
          attributes: [
            "id",
            "title",
            "footBikeDistance",
            "trainDistance",
            "carDistance",
            "planeDistance",
            "footBikeDays",
            "trainDays",
            "carDays",
            "planeDays",
          ],
        },
        { model: ElectricityFootprint, attributes: ["id", "consumption"] },
        { model: PlantOffset, attributes: ["id", "plants"] },
      ],
    });
    if (!user) {
      return res.status(403).send("User not found");
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
