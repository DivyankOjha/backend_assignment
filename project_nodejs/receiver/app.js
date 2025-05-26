const express = require('express');
const {
    MongoClient 
} = require('mongodb');
const redis = require('redis');
const {
    setGlobals 
} = require('./config/global');
const routes = require('./routes');

const app = express();

app.use(express.json());

const mongoUrl = process.env.MONGO_URI;
const redisUrl = process.env.REDIS_URI;

(async () => {
    try {
        const mongoClient = new MongoClient(mongoUrl);

        await mongoClient.connect();
        const db = mongoClient.db('receiverDB');

        const redisClient = redis.createClient({
            url: redisUrl 
        });

        await redisClient.connect();

        // ✅ Ensure this key matches the expected names in global.js
        setGlobals({
            db,
            redis: redisClient 
        });
        
        app.use('/', routes);

        const PORT = process.env.PORT || 3001;

        app.listen(PORT, () => console.log('Receiver running on port 3000'));
    }
    catch (err) {
        console.error('Startup error:', err);
        process.exit(1);
    }
})();
