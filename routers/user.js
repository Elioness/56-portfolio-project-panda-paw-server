//const express = require("express");
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

//POST sumbit transpo calculation
router.post("/submitEmissionTranspo", auth, async (req, res, next) => {
  console.log("Trying to post a new transpo cal");
  try {
    //These are the attributes of a new transpo emission I want to fill in
    const {
      title,
      footBikeDistance,
      trainDistance,
      carDistance,
      planeDistance,
      footBikeDays,
      trainDays,
      carDays,
      planeDays,
    } = req.body;
    const userId = req.user.id;
    console.log("user id", userId);
    //console.log("user id", userId);

    const newTranspoCalculation = await TranspoFootprint.create({
      title: title,
      footBikeDistance: footBikeDistance,
      trainDistance: trainDistance,
      carDistance: carDistance,
      planeDistance: planeDistance,
      footBikeDays: footBikeDays,
      trainDays: trainDays,
      carDays: carDays,
      planeDays: planeDays,
      userId: userId,
    });
    res.send(newTranspoCalculation);
  } catch (e) {
    next(e);
  }
});

//POST sumbit electricity calculation
router.post("/submitEmissionElectricity", auth, async (req, res, next) => {
  console.log("Trying to post a new elec cal");
  try {
    const { consumption } = req.body;
    const userId = req.user.id;
    console.log("user id", userId);

    const newElectricityCalculation = await ElectricityFootprint.create({
      consumption: consumption,
      userId: userId,
    });
    res.send(newElectricityCalculation);
  } catch (e) {
    next(e);
  }
});

//POST sumbit plant offset calculation
router.post("/submitPlantOffset", auth, async (req, res, next) => {
  console.log("Trying to post a new plant cal");
  try {
    const { plants } = req.body;
    const userId = req.user.id;
    console.log("user id", userId);

    const newPlantCalculation = await PlantOffset.create({
      plants: plants,
      userId: userId,
    });
    res.send(newPlantCalculation);
  } catch (e) {
    next(e);
  }
});

//Patch Goal
router.patch("/:newGoal", auth, async (req, res, next) => {
  try {
    const newGoal = req.params.newGoal;
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    console.log("user", user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log("newGoal", newGoal);
    await user.update({ goal: newGoal });

    res.send(user.goal);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//DELETE Reservations
router.delete("/deleteTranspoFootprint", auth, async (req, res, next) => {
  console.log("IamHERE");
  try {
    const transpoFootprintId = req.user.userEmissions.transpoFootprints.id;
    const transpoFootprint = await TranspoFootprint.findByPk(
      transpoFootprintId
    );

    if (!transpoFootprintId) {
      return res.status(404).send("Does not exist");
    }

    await transpoFootprint.destroy();
    res.send(`This transpoFootprint has been deleted: ${transpoFootprintId}`);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
