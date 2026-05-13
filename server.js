const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());

// Simple file-based lock to prevent race conditions during write
let isWriting = false;

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Endpoint to receive contact form messages
app.post('/api/contact', async (req, res) => {
    const { user_name, user_email, user_contact, message } = req.body;

    if (!user_name || !user_email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const newMessage = {
        id: Date.now(),
        user_name: String(user_name).substring(0, 100),
        user_email: String(user_email).substring(0, 100),
        user_contact: String(user_contact || 'Not provided').substring(0, 50),
        message: String(message).substring(0, 1000),
        timestamp: new Date().toISOString()
    };

    // Very basic queue/lock mechanism
    while (isWriting) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    isWriting = true;
    try {
        let messages = [];
        try {
            const data = await fs.readFile(MESSAGES_FILE, 'utf8');
            messages = JSON.parse(data);
        } catch (e) {
            messages = [];
        }

        messages.push(newMessage);
        await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
        res.status(200).json({ message: 'Message received and saved successfully!' });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ error: 'Failed to save message.' });
    } finally {
        isWriting = false;
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
