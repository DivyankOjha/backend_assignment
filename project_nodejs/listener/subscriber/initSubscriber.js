const {
    getRedisClient, getDb 
} = require('../config/global');

const initSubscriber = async (event) => {
    console.log('\n\n============== SUBSCRIBER ========== \n\n');

    const redisClient = getRedisClient();
    const db = getDb();

    if (!redisClient || !db) {
        console.error('Redis or DB not initialized');

        return;
    }

    const subscriber = redisClient.duplicate();

    await subscriber.connect();

    await subscriber.subscribe(event, async (message) => {
        try {
            const data = JSON.parse(message);

            switch (event) {
                case 'new_records':
                    await db.collection('records').insertOne({
                        ...data,
                        modified_at: new Date().toISOString()
                    });
                    console.log('✅ New record inserted by listener:', data);
                    break;

                default:
                    console.warn('⚠️ Unhandled event type:', event);
            }
        }
        catch (err) {
            console.error('❌ Error processing message:', err);
        }
    });
};

module.exports = initSubscriber;
