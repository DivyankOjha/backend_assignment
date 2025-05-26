// routes/index.js
const express = require('express');
const router = express.Router();

const initSubscriber = require('../subscriber/initSubscriber');

const setupRoutes = async () => {
    await initSubscriber('new_records');
};

module.exports = {
    router,
    setupRoutes
};
