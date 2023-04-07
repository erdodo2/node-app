const router = require('express').Router();

const tables = require('./tables');
router.use('/tables', tables);


module.exports = router;
