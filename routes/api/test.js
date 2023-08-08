const express = require("express");
const router = express.Router();
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../test.json');

const testController = require("../../controllers/api/test");

var options = {
  explorer: true
};
router.use("/api-docs", swaggerUi.serve)


router.get("/api-docs", swaggerUi.setup(swaggerDocument, options))

router.get("/test", testController.getTest);

module.exports = {
  router,
};
