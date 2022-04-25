const Admin = require("../models/Admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.adminsController = {
  login: async (req, res) => {
    const { login, password } = req.body;
    try {
      const candidate = await Admin.findOne({ login });

      if (!candidate) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }

      const valid = await bcrypt.compare(password, candidate.password);
      if (!valid) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }
      const payload = {
        id: candidate._id,
        login: candidate.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24d",
      });
      return res.json({ token });
    } catch (e) {
      return res
        .status(401)
        .json({ error: "ошибка при авторизации" + e.toString() });
    }
  },
};
