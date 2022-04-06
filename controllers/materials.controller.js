const Material = require("../models/Material.model");

module.exports.materialsController = {
  addMaterials: async (req, res) => {
    const { name, price, volumeType, left, direction } = req.body;
    try {
      const material = await Material.create({
        name,
        price,
        volumeType,
        left,
        direction,
      });
      res.json(material);
    } catch (e) {
      res.json(e.message);
    }
  },
  getAllMaterials: async (req, res) => {
    try {
      const materials = await Material.find();
      res.json(materials);
    } catch (e) {
      res.json(e.message);
    }
  },
  removeMaterial: async (req, res) => {
    const { id } = req.params;
    try {
      const removeMaterial = await Material.findByIdAndDelete(id);
      res.json(removeMaterial);
    } catch (e) {
      res.json(e.message);
    }
  },
  addingMaterial: async (req, res) => {
    const { volume } = req.body;
    try {
      const increment = await Material.findByIdAndUpdate(
        req.params.id,
        {
          $push: { direction: { volume, date: new Date() } },
          $inc: { left: +volume },
        },
        { new: true }
      );
      res.json(increment);
    } catch (e) {
      res.json("error" + e.toString());
    }
  },
  consumptionMaterial: async (req, res) => {
    const { volume } = req.body;
    try {
      const decrement = await Material.findByIdAndUpdate(
        req.params.id,
        {
          $push: { direction: { volume, date: new Date() } },
          $inc: { left: -volume },
        },
        { new: true }
      );
      res.json(decrement)
    } catch (e) {
      res.json("error" + e.toString());
    }
  },
  getAllMaterialsForThePeriod: async (req, res) => {
    try {
      const getForThePeriod = await Material.aggregate([
        {
          $group: {
            _id: { month: { $month: "$date" } },
            totalPrice: {
              $sum: "$price",
            },
            name: {
              $addToSet: "$name",
            },
          },
        },
      ]);
      res.json(getForThePeriod);
    } catch (e) {
      res.json("error" + e.toString());
    }
  },
};
