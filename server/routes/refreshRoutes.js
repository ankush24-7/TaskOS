const express = require('express');
const router = express.Router();
const handleRefresh = require('../controllers/refreshController');

router.post('/', handleRefresh);

module.exports = router;