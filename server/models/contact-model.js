const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true
});

// Middleware to adjust timestamps to IST
contactSchema.pre('save', function (next) {
    const currentDate = new Date();
    const ISTOffset = 330; // IST offset in minutes (UTC +5:30)
    const ISTTime = new Date(currentDate.getTime() + ISTOffset * 60000);

    this.createdAt = ISTTime;
    this.updatedAt = ISTTime;
    next();
});
const Contact = model('Contact', contactSchema);
module.exports = Contact;
