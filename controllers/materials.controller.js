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
      res.status(400).json("error" + e.message);
    }
  },
  removeMaterial: async (req, res) => {
    const { id } = req.params;
    try {
      const removeMaterial = await Material.findByIdAndDelete(id);
      res.json(removeMaterial);
    } catch (e) {
      res.status(400).json("error" + e.toString());
    }
  },
  addingMaterial: async (req, res) => {
    const { id } = req.params;
    const { volume } = req.body;
    try {
      const increment = await Material.findByIdAndUpdate(
        id,
        {
          $push: { direction: { volume, date: new Date() } },
          $inc: { left: +volume },
        },
        { new: true }
      );
      res.json(increment);
    } catch (e) {
      res.status(400).json("error" + e.toString());
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
      res.json(decrement);
    } catch (e) {
      res.status(400).json("error" + e.toString());
    }
  },
  getAllMaterialsForThePeriod: async (req, res) => {
    const cond = {};
    try {
      if (req.query.periodStart) {
        cond.direction.date = {
          $gte: new Date(req.query.periodStart),
          $te: new Date(req.query.periodEnd),
        };
      }
      const material = await Material.find(cond);

      const totalPrice = material.reduce((total, material) => {
        return total + material.price;
      }, 0);

      const document = {
        material,
        totalPrice,
      };
      res.json({ document });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
