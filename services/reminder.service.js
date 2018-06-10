
// Gettign the Newly created Mongoose Model we just created
var Reminder = require('../models/reminder.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getReminders = async function(query, page, limit){

  console.log("Getting reminders");

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    console.log("Controller Fetching Reminder")
    // Try Catch the awaited promise to handle the error

    try {
        var reminders = await Reminder.paginate(query, options)
        console.log("Reminders")
        console.log(reminders)
        // Return the todod list that was retured by the mongoose promise
        return reminders;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Reminders')
    }
}

exports.createReminder = async function(reminder){

    // Creating a new Mongoose Object by using the new keyword
    var newReminder = new Reminder({
        title: reminder.title,
        description: reminder.description,
        date: new Date(),
        status: reminder.status
    })

    try{

        // Saving the Todo
        var reminder = await newReminder.save()

        return reminder;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Todo")
    }
}

exports.updateReminder = async function(reminder){
    var id = reminder.id

    try{
        //Find the old Todo Object by the Id

        var oldReminder = await Reminder.findById(id);

    }catch(e){
        throw Error("Error occured while Finding the Reminder")
    }

    console.log("Checking if oldReminder is there");
    // If no old Reminder Object exists return false
    if(!oldReminder){
        return false;
    }

    console.log(oldReminder)

    //Edit the Todo Object
    oldReminder.title = reminder.title
    oldReminder.description = reminder.description
    oldReminder.status = reminder.status

    console.log(oldReminder)

    try{
        var savedReminder = await oldReminder.save()
        console.log("Service - Saved the reminder");
        return savedReminder;
    }catch(e){
        throw Error("And Error occured while updating the Reminder");
    }
}

exports.deleteReminder = async function(id){

    console.log("Service - deleting %s", id);

    // Delete the Todo
    try{
        var deleted = await Reminder.remove({_id: id})
        console.log(deleted);

        if(deleted.n === 0){
            throw Error("Reminder Could not be deleted")
        }
        return deleted
    }catch(e){
        console.log(e);
        throw Error("Error Occured while Deleting the Reminder")
    }
}
