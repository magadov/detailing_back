const Car = require("../models/Car.model");
const axios = require("axios").default;

module.exports.carsController = {
  addCar: async (req, res) => {
    const { vin, vinData, client, upgradeDate } = req.body;
    try {
      const car = await Car.create({
        vin,
        vinData,
        client,
        upgradeDate,
      });
      return res.json({ car });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },

  getCar: async (req, res) => {
    try {
      const car = await Car.find();

      return res.json({ car });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  deleteCar: async (req, res) => {
    const { id } = req.params;
    try {
      await Car.findByIdAndDelete(id);
      return res.json("Машина успешно удалена");
    } catch (e) {
      return res.json({ error: e.message });
    }
  },

  updateCar: async (req, res) => {
    const { vin, vinData, client, upgradeDate } = req.body;
    const { id } = req.params;
    try {
      await Car.findByIdAndUpdate(
          id,
          {
            vin,
            vinData,
            client,
            upgradeDate,
          },
          { new: true }
      );
      return res.json({ message: "Редактировано" });
    } catch (e) {
      return res.json({ error: e.message });
    }
  },
  addVinData: async (req, res) => {
    const { vin } = req.body;
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);

      const carVin = await Car.findByIdAndUpdate(
          req.user.id,
          {
            $push: { vinData: req.body}
          },
          { new: true }
      );
      return res.json({ carVin });
    } catch (e) {
      return res.json({ error: e.toString() });
    }
  },
  getVin: async (req, res) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

      const vinData = response.data.map((ser) => {
        return ser.body;
      });
      return res.json(response.data[0].body);
      // return res.json(vinData);
    } catch (e) {
      return res.json({ error: e.toString() });
    }
  },
};
