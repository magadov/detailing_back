const Client = require("../models/Client.model");
const { default: axios } = require("axios");
const Car = require("../models/Car.model");

module.exports.clientsController = {
  getClient: async (req, res) => {
    try {
      const clients = await Client.find();

      return res.json({ clients });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  },
  deleteClient: async (req, res) => {
    const { id } = req.params;
    try {
      const deleting = await Client.findByIdAndRemove(id);

      return res.json({ deleting });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  },
  addClient: async (req, res) => {
    const { vin } = req.body;
    const { firstName, lastName, phone } = req.body;
    try {
      const clients = await Client.create({ firstName, lastName, phone });

      const response = await axios({
        method: "GET",
        url: `https://api-cloud.ru/api/vindecoder.php?type=vin&vin=${vin}&token=6bbec902a9d9fc6d2c3c2e2cc2cc525d`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const carData = {
        mark: response.data.Make.value,
        model: response.data.Model.value,
      };

      const carVin = await Car.create({
        vin: vin,
        vinData: carData,
        client: clients._id,
      });

      return res.json({ clients, carVin });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  },
};
