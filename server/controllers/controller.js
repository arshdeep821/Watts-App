const Object = require('../models/Object');


const { StatusCodes } = require('http-status-codes');

const getAllObjects = async (req, res) => {
    const jobs = await Object.find({});
    res.status(StatusCodes.OK).json(jobs);
}

const createObject = async (req, res) => {

    const object = await Object.create(req.body);
    res.status(StatusCodes.CREATED).json(object);
}

module.exports = {getAllObjects, createObject};