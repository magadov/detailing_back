const Service = require("../models/Service.model");
const jwt = require("jsonwebtoken");

module.exports.servicesController = {
  addServices: async (req, res) => {
    const { name, car, client, cost } = req.body;
    try {
      const service = await Service.create({
        name,
        car,
        client,
        cost,
      });
      return res.json({ service });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  getServices: async (req, res) => {
    try {
      const service = await Service.find();
      return res.json({ service });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  removeServices: async (req, res) => {
    const { id } = req.params;
    try {
      await Service.findByIdAndDelete(id);
      return res.json({ message: "Услуга успешно удалена" });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  updateServices: async (req, res) => {
    const { name, car, client, cost } = req.body;
    const { id } = req.params.id;
    try {
      await Service.findByIdAndUpdate(
        id,
        {
          name,
          car,
          client,
          cost,
        },
        { new: true }
      );
      return res.json({ message: "Услуга редактирована успешно." });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
};
