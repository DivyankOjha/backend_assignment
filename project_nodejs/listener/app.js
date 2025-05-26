// app.js
const express = require('express');
const {
    MongoClient 
} = require('mongodb');
const redis = require('redis');
const {
    setGlobals 
} = require('./config/global');
const {
    router, setupRoutes 
} = require('./routes'); 

const mongoUrl = process.env.MONGO_URI;
const redisClient = redis.createClient({
    url: process.env.REDIS_URI 
});

(async () => {
    try {
        const app = express();

        app.use(express.json());

        const mongoClient = new MongoClient(mongoUrl);

        await mongoClient.connect();
        const db = mongoClient.db('listenerDB');

        await redisClient.connect();
        setGlobals({
            db,
            redis: redisClient 
        });

        await setupRoutes();

        app.use(router);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error('Startup error:', err);
        process.exit(1);
    }
})();
