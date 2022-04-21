const Car = require("../models/Car.model");
const { default: axios } = require("axios");

module.exports.carsController = {
  getCar: async (req, res) => {
    try {
      const car = await Car.find();

      return res.json({ car });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  },
  deleteCar: async (req, res) => {
    const { id } = req.params;
    try {
      await Car.findByIdAndDelete(id);

      return res.json("Машина успешно удалена");
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
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
      return res.status(500).json({ error: e.toString() });
    }
  },
  addCar: async (req, res) => {
    const { vin } = req.body;
    const { id } = req.params;
    try {
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
        model: response.data[0].body,
      };

      const carVin = await Car.create({
        vin: vin,
        vinData: carData,
        client: id,
      });

      return res.json({ carVin });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  },
};
