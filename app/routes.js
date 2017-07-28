const express = require('express');
const router  = express.Router();


const api = require('./routes.api');
const bot = require('./routes.bot');

router.use(api);
router.use(bot);

module.exports = router;