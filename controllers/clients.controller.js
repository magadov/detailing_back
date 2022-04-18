const Client = require("../models/Client.model");
const { default: axios } = require("axios");
const Car = require("../models/Car.model");

module.exports.clientsController = {
  getClient: async (req, res) => {
    try {
      const client = await Client.find();

      return res.status(200).json({ client });
    } catch (e) {
      return res.status(401).json({ error: e.toString() });
    }
  },
  deleteClient: async (req, res) => {
    const { id } = req.params;
    try {
      const deleting = await Client.findByIdAndRemove(id);

      return res.status(200).json({ deleting });
    } catch (e) {
      return res.status(401).json({ error: e.toString() });
    }
  },
  addClient: async (req, res) => {
    const { vin } = req.body;
    const { firstName, lastName, phone } = req.body;
    try {
      const client = await Client.create({ firstName, lastName, phone });

      const response = await axios({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/posts`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "", // здесь будет api ключ
        },
      });

      const carData = {
        mark: response.data[0].body,
        model: response.data[0].title,
      };

      const carVin = await Car.create({
        vin: vin,
        vinData: { ...carData },
        client: client._id,
      });
      const result = {
        client,
        carVin,
      };

      return res.status(200).json({ result });
    } catch (e) {
      return res.status(401).json({ error: e.toString() });
    }
  },
};
