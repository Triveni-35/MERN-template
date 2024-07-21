const Contact = require('../models/contact-model');
const contactForm = async (req, res) => {
    try {
        const { username, email, message } = req.body;
        if (!username || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log("Received data:", req.body);
        await Contact.create({ username, email, message });
        return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Message not sent", error: error.message });
    }
};
module.exports = contactForm;
