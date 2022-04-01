const Car = require("../models/Car.model");

module.exports.carsController = {
  addCar: async(req, res) => {
    const { vin, vinData, client, upgradeDate } = req.body;
    try{
      const car = await Car.create({
        vin,
        vinData,
        client,
        upgradeDate
      });
      res.json(car)
    }catch (e) {
      res.json({error: e.message})
    }
  },

  getCar: async (req, res) => {
    try{
      const car = await Car.find();
      res.json(car)
    }catch (e) {
      res.json({error: e.message})
    }
  },

  deleteCar: async(req, res) => {
    try{
      await Car.findByIdAndDelete(req.params.id)
      res.json('Машина успешно удалена')
    }catch (e) {
      res.json({error: e.message})
    }
},

  updateCar: async (req, res) => {
      const { vin, vinData, client, upgradeDate } = req.body;
      try{
        await Car.findByIdAndUpdate(
          req.params.id,
          {
            vin,
            vinData,
            client,
            upgradeDate
          },
          { new: true }
        );
        res.json("Редактировано")
      }catch (e) {
        res.json({error: e.message})
      }
  }
}