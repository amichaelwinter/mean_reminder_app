var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ReminderSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    endDate:Date,
    status: String
})

ReminderSchema.plugin(mongoosePaginate)
const Reminder = mongoose.model('Reminder', ReminderSchema)

module.exports = Reminder;
