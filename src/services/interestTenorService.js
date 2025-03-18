const InterestTenor = require('../models/interestTenorModel');
const logger = require('../utils/logger')

exports.getAllInterestTenor = async () => {
    try {
        const Itenor = await InterestTenor.findAll();
        logger.info(`Fetched ${Itenor.length} Tenors`);
        return Itenor;
    } catch (error) {
        logger.error(`Error fetching Tenor, ${error}`);
        throw new Error('Error fetching Tenor');
    }
};

exports.getInterestTenorById = async (id) => {
    try {
        const Itenor = await InterestTenor.findByPk(id, {})
        logger.info(`Fetched  ${id} `);
        return Itenor;
    } catch (error) {
        logger.error('Error fetching Tenor by id', error);
        throw new Error('Error fetching Tenor by id');
    }
};
