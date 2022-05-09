const Car = require("../models/Car.model");
const { default: axios } = require("axios");

module.exports.carsController = {
  getCars: async (req, res) => {
    try {
      const cars = await Car.find();

      return res.json({ cars });
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
        client: id,
      });

      return res.json({ carVin });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  },
};
