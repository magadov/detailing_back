const { Router } = require("express");

const router = Router();

router.use('/services', require('./services.route'));
router.use('/admins', require('./admins.route'))

module.exports = router;