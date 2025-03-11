const Car = require('../models/carModel');
const User = require('../models/userModel');

exports.getAllCars = async () => {
    return await Car.findAll({ 
        include: {
            model: User,
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        } 
    });
};

exports.getCarById = async (id) => {
    return await Car.findByPk(id, { 
        include: {
            model: User,
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }
    });
};

exports.getCarByUserId = async (userId) => {
    return await Car.findAll({
        where: {
            userId: userId
        }
    })
}

exports.createCar = async (carData) => {
    return await Car.create(carData);
};

exports.updateCar = async (id, carData) => {
    const car = await Car.findByPk(id);
    if (!car) {
        throw new Error('Car not found');
    }
    return await car.update(carData);
};

exports.deleteCar = async (id) => {
    const car = await Car.findByPk(id);
    if (!car) {
        throw new Error('Car not found');
    }
    return await car.destroy();
};
