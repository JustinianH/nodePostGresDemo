var router = require('express').Router();
import kafkaSendMessagge from '../../kafka/kafkaSendMessage';

router.post("/kafka-message", function (req, res, next) {
  console.log(req.body);

  const result = kafkaSendMessagge(req.body.key, req.body.message);

  return res.json(result);
});

module.exports = router;