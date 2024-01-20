const express = require('express');
const router = express.Router();

const getAllObjects = require('../controllers/controller');

router.route('/').get(getAllObjects);

module.exports = router;