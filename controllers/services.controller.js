const Service = require("../models/Service.model");
const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");

module.exports.servicesController = {
  addServices: async (req, res) => {
    const { name, car, client, cost } = req.body;
    try {
      const service = await Service.create({
        name,
        car,
        client,
        cost,
        date: new Date(),
      });
      res.json(service);
    } catch (e) {
      res.json({ error: e.message });
    }
  },
  getServices: async (req, res) => {
    try {
      const service = await Service.find();
      res.json(service);
    } catch (e) {
      res.json({ error: e.message });
    }
  },
  removeServices: async (req, res) => {
    const { id } = req.params;
    try {
      await Service.findByIdAndDelete(id);
      return res.json("Услуга успешно удалена");
    } catch (e) {
      res.json({ error: e.message });
    }
  },
  updateServices: async (req, res) => {
    const { name, car, client, cost, date } = req.body;
    try {
      await Service.findByIdAndUpdate(
        req.params.id,
        {
          name,
          car,
          client,
          cost,
          date,
        },
        { new: true }
      );
      res.json("Услуга редактирована успешно.");
    } catch (e) {
      res.json({ error: e.message });
    }
  },
};
