const { Router } = require("express");

const router = Router();

router.use('/services', require('./services.route'))

module.exports = router;