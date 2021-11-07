const Vehicle = require('../models/vehicles');

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Vehicle.findAll();
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const VEHICLE_MODEL = {
      value: req.body.value,
      brand: req.body.brand,
      type: req.body.type,
      version: req.body.version,
      year: req.body.year,
    };

    try {
      const vehicle = await Vehicle.create(VEHICLE_MODEL);
      console.log('Vehicle created');
      return res.status(201).json(vehicle);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const VEHICLE_MODEL = {
      value: req.body.value,
      brand: req.body.brand,
      type: req.body.type,
      version: req.body.version,
      year: req.body.year,
    };

    try {
      const vehicle = await Vehicle.update(VEHICLE_MODEL, { where: { id: req.params.id } });
      return res.status(200).json(vehicle);
    } catch (error) {}
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.destroy({ where: { id: req.params.id } });
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json(error);
  }
};