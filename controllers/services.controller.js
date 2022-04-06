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
    const { name, car, client, cost, createdAt } = req.body;
    const { id } = req.params;
    try {
      const service = await Service.findByIdAndUpdate(
        id,
        {
          name,
          car,
          client,
          cost,
          createdAt
        },
        { new: true }
      );
      return res.json({ service });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  getServicesByDate: async (req, res) => {
    try {
      const service = await Service.find({
        createdAt: {
          $gte: new Date ('2022-04-04'),
          $lte: new Date ('2022-04-06')
        },
        });
      return res.json({ service });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  getSelectionByDate: async (req, res) => {
    try {
        const service = await Service.aggregate([
            {
              $match: {
                createdDate: {
                  $gte: ISODate("2022-04"),
                  $lt: ISODate('2022-04')
                }
              }
            }
          ]
        );
      return res.json({ service });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
};
