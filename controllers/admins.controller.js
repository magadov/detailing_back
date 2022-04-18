const Admin = require("../models/Admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.adminsController = {
  // addAdmin: async (req, res) => {
  //   const { login, password } = req.body;
  //   try {
  //     const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
  //     const admin = await Admin.create({login, password: hash})
  //
  //     return res.status(200).json({admin})
  //   }catch (e) {
  //     return res.status(400).json({error: 'Ошибка при регистрации: ' + e.toString()})
  //   }
  // },
  login: async (req, res) => {
    const { login, password } = req.body;
    try {
      const candidate = await Admin.findOne({ login });

      if (!candidate) {
        return res.status(401).json("Неверный логин");
      }

      const valid = await bcrypt.compare(password, candidate.password);
      if (!valid) {
        return res.status(401).json("Неверный пароль");
      }
      const payload = {
        id: candidate._id,
        login: candidate.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24d",
      });
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(401).json({ error: e.toString() });
    }
  },
};
