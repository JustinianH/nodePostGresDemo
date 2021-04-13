var router = require('express').Router();

router.use('/', require('./api/user'));
router.use('/', require('./api/kafkaApi'));
router.use('/', require('./api/movies'));
router.use("/", require("./api/userMeasurements"));

export default router;