const {
    getDb 
} = require('../config/global');

const db = getDb();
const newRecords = async (message) => {
    try {
        const record = JSON.parse(message);
        const modifiedRecord = {
            ...record,
            modified_at: new Date().getTime()
        };

        await db.collection('records').insertOne(modifiedRecord);
        console.log('Record copied to listener DB:', modifiedRecord);
    }
    catch (e) {
        console.error(e);
    }
};

module.exports = newRecords;
