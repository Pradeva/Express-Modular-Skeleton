const { getAllCars, getCarById, createCar, updateCar, deleteCar, getCarByUserId } = require('../services/carsService');

exports.getCars = async (req, res) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCarUserId = async (req, res) => {
    try {
        const car = await getCarByUserId(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}

exports.createCar = async (req, res) => {
  try {
    const car = await createCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await updateCar(req.params.id, req.body);
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await deleteCar(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
