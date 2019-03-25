//HTTP Server to Listen for API Requests
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

//Shell
const shell = require('shelljs');

//Serial Port
const serialPort = require('serialport');
const serial = new serialPort('/dev/serial0', {
	baudRate: 19200
})

app.put('/print', (req, res) => {
    const text = req.body.text;
    if (text == null) {
        res.status(404).send("Error: The Key Text is invalid or null");
    } else if (text.length < 5){
        res.status(400).send("Error: The Key Text does not meet minimum character requirements (5)");
    } else {
        serial.write(text);
        res.send(`Text: ${text}`);
    }
});

app.listen(port, () => console.log(`App Is Listening on Port ${port}`));