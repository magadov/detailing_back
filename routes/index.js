const { Router } = require("express");

const router = Router();

router.use('/services', require('./services.route'));
router.use('/materials', require('./materials.route'))
router.use('/admins', require('./admins.route'))
router.use('/clients', require('./clients.route'))
router.use('/cars', require('./car.route'))


module.exports = router;