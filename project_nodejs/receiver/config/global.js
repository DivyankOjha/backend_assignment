let db = null;
let redis = null;

const setGlobals = ({
    db: dbInstance, redis: redisClient 
}) => {
    db = dbInstance;
    redis = redisClient;
};

const getDb = () => db;
const getRedisClient = () => redis;

module.exports = {
    getDb,
    getRedisClient,
    setGlobals 
};
