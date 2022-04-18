const Service = require("../models/Service.model");

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
    const cond = {};

    try {
      if (req.query.periodStart) {
        cond.createdAt = {
          $gte: new Date(req.query.periodStart),
          $te: new Date(req.query.periodEnd),
        };
      }

      const services = await Service.find(cond);

      const sumCost = services.reduce((total, service) => total + service.cost, 0);

      return res.json({
        services,
        sumCost,
      });
    } catch (e) {
      res.status(500).json({error: e.toString()});
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
          createdAt,
        },
        { new: true }
      );
      return res.json({ service });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  // getServicesByDate: async (req, res) => {
  //   try {
  //     const services = await Service.find({
  //       createdAt: {
  //         $gte: new Date("2022-02-02"),
  //         $lte: new Date("2022-05-02"),
  //       },
  //     });
  //     const sumCost = services.reduce((total, service) => {
  //       return total + service.cost;
  //     }, 0);
  //
  //     const result = {
  //       services,
  //       sumCost,
  //     };
  //     return res.json({ result });
  //   } catch (e) {
  //     return res.json({ error: e.message });
  //   }
  // },
};
