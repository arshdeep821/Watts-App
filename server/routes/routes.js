const express = require('express');
const router = express.Router();

const { getAllObjects, createObject } = require('../controllers/controller');

router.route('/').get(getAllObjects).post(createObject);

module.exports = router;