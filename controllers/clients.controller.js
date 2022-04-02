const Client = require("../models/Client.model");

module.exports.clientsController = {
  getClient: async (req, res) => {
    try {
      const client = await Client.find();

      return res.json({ client });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  addClient: async (req, res) => {
    const { firstName, lastName, number } = req.body;
    try {
      const adding = await Client.create({ firstName, lastName, number });

      return res.json({ adding });
    } catch (e) {
      return res.json({ error: e.toString() });
    }
  },
  deleteClient: async (req, res) => {
    const { id } = req.params;
    try {
      const deleting = await Client.findByIdAndRemove({ id });

      return res.json({ deleting });
    } catch (e) {
      return res.json({ error: e.toString() });
    }
  },
};
