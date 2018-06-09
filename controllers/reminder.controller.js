// Accessing the Service that we just created

var ReminderService = require('../services/reminder.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getReminders = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100;

    console.log("Getting reminders")

    try{

        var reminders = await ReminderService.getReminders({}, page, limit)
        console.log("Controller - Returned reminders")

        // Return the todos list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: reminders, message: "Succesfully Recieved Reminders"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createReminder = async function(req, res, next){

    // Req.Body contains the form submit values.

    console.log("Creating a reminder\n %s", req.body.title);

    var reminder = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    try{

        // Calling the Service function with the new object from the Request Body
        console.warn("Trying to create a reminder from the controller.")
        var createdReminder = await ReminderService.createReminder(reminder)
        return res.status(201).json({status: 201, data: createdReminder, message: "Succesfully Created Reminder"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.
        console.warn("Trying to create a reminder from the controller.")
        return res.status(400).json({status: 400, message: "Reminder Creation was Unsuccesfull"})
    }
}

exports.updateReminder = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        console.log(req.body)
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var reminder = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        console.log("Controller - Trying to update the Reminder")
        var updatedReminder = await ReminderService.updateReminder(reminder)
        console.log("Controller - Updated Reminder")
        return res.status(200).json({status: 200, data: updatedReminder, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.deleteReminder = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await ReminderService.deleteReminder(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Reminder"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
