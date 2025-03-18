const Car = require('../models/carModel');
// const User = require('../models/userModel');
const logger = require('../utils/logger');

exports.getAllCars = async () => {
    try {
        const cars = await Car.findAll({
            where: { deleted: 0},
            attributes: { exclude: ['createdAt', 'updatedAt', 'deleted'] }
        });
        logger.info(`Fetched ${cars.length} cars`);
        return cars
    } catch (error) {
        logger.error('Error fetching cars', error);
        throw new Error('Error fetching cars');
    }
};

exports.getCarById = async (id) => {
    try {
        const car = await Car.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        logger.info(`Fetched car ${id} `);
        return car;
    } catch (error) {
        logger.error('Error fetching car by id', error);
        throw new Error('Error fetching car by id');
    }
};

exports.createCar = async (carData) => {
    try {
        const newCar = await Car.create(carData);
        logger.info(`User ${newCar.model} created successfully`);
        return newCar;
    } catch (error) {
        logger.error('Error creating car', error);
        throw new Error('Error creating car');
    }
};

exports.updateCar = async (id, carData) => {
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            
            throw new Error('Car not found');
        }
        await car.update(carData);
        logger.info(`User ${car.id} created successfully`);
        return car;
    } catch (error) {
        logger.error('Error updating car', error);
        throw new Error('Error updating car');
    }
};

exports.deleteCar = async (id) => {
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            throw new Error('Car not found');
        }
        car.deleted = 1;
        await car.save();
        logger.info(`Car ${id} deleted successfully`);
        return { message: 'Car deleted successfully' };
    } catch (error) {
        logger.error('Error deleting car', error);
        throw new Error('Error deleting car');
    }

    
    // return await car.destroy();
};
