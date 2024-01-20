const { StatusCodes } = require('http-status-codes');

const getAllObjects = async (req, res) => {
    res.send('Get All Objects');
}

module.exports = getAllObjects;