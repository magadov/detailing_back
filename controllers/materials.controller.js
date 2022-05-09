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
      res.json({ material });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  },
  removeMaterial: async (req, res) => {
    const { id } = req.params;
    try {
      const remove = await Material.findByIdAndDelete(id);
      res.json(remove);
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  },
  admissionMaterial: async (req, res) => {
    const { id } = req.params;
    const { volume } = req.body;
    try {
      await Material.findByIdAndUpdate(
        id,
        {
          $push: { direction: { volume, date: new Date() } },
          $inc: { left: +volume },
        }
      );
      const materials = await Material.find()
      res.json({materials});
    } catch (e) {
      res.status(500).json({ error: e.toString() });
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
      res.status(500).json({ error: e.toString() });
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
      const materials = await Material.find(cond);

      const totalPrice = materials.reduce((total, material) => {
        return total + materials.price;
      }, 0);

      res.json({ materials, totalPrice });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  },
  editMaterials: async (req, res) => {
    const { name, price } = req.body;
    const { id } = req.params;
    try {
      const materials = await Material.findByIdAndUpdate(
        id,
        {
          name,
          price,
        },
        { new: true }
      );
      res.status(200).json({ materials });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  },
};
