const {
    v4: uuidv4 
} = require('uuid');

const {
    getDb, getRedisClient 
} = require('../config/global');

const insertRecord = async (req, res) => {
    try {
        const {
            user, class: className, age, email 
        } = req.body;

        if (!user || !className || typeof age !== 'number' || !/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({
                error: 'Invalid input' 
            });
        }

        const record = {
            age,
            class: className,
            email,
            id: uuidv4(),
            inserted_at: new Date().getTime(),
            user
        };

        const db = getDb();
        const redisClient = getRedisClient();

        if (!db || !redisClient) {
            return res.status(500).json({
                error: 'Database or Redis not initialized' 
            });
        }

        await db.collection('records').insertOne(record);
        await redisClient.publish('new_records', JSON.stringify(record));

        res.status(201).json({
            message: 'Record stored and published',
            record 
        });
    }
    catch (e) {
        res.status(400).json({
            message: 'Something went wrong' 
        });
    }
};

module.exports = insertRecord;
