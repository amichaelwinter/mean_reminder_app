var express = require('express')

var router = express.Router()
var reminders = require('./api/reminder.route')


router.use('/reminders', reminders);


module.exports = router;
