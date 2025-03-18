const {getAllInterestTenor, getInterestTenorById} = require('../services/interestTenorService');
const logger = require('../utils/logger');

exports.getInterestTenor = async (req, res) => {
    try {
        const Itenors = await getAllInterestTenor();
        res.json(Itenors);
    } catch (error) {
        logger.error('Error in getInterestTenor controller', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getInterestTenorById = async (req, res) => {
    try {
        const Itenor = await getInterestTenorById(req.params.id);
        if (Itenor) {
            res.json(Itenor);
        } else {
            res.status(404).send({ message: 'Interest tenor not found'});
        }
    } catch (error) {
        logger.error('Error in getInterestTenorById controller', error);
        res.status(500).send('Internal Server Error');
    }
};