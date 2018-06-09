var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var ReminderController = require('../../controllers/reminder.controller');


// Map each API to the Controller FUnctions

router.get('/', ReminderController.getReminders)

router.post('/', ReminderController.createReminder)

router.put('/', ReminderController.updateReminder)

router.delete('/:id',ReminderController.deleteReminder)


// Export the Router

module.exports = router;
