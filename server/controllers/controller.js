const Object = require('../models/Object');


const { StatusCodes } = require('http-status-codes');

const getAllObjects = async (req, res) => {
    const object = await Object.create({room_id: '145', usage: ['1', '2', '3'], threshold: 30});
    res.status(StatusCodes.OK).json({ object });
}

const createObject = async (req, res) => {

    const object = await Object.create(req.body);
    res.status(StatusCodes.OK).json(object);
}

module.exports = {getAllObjects, createObject};