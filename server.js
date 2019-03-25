//HTTP Server to Listen for API Requests
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const shell = require('shelljs');

app.put('/print', (req, res) => {
    const text = req.body.text;
    if (text == null) {
        res.status(404).send("Error: The Key Text is invalid or null");
    } else if (text.length < 5){
        res.status(400).send("Error: The Key Text does not meet minimum character requirements (5)");
    } else {
        shell.exec(`echo -e ${text}`);
        res.send(`Text: ${text}`);
    }
});

app.listen(port, () => console.log(`App Is Listening on Port ${port}`));