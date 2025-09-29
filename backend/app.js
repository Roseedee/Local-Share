const express = require('express')
const cors = require('cors')

const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(cors({
    origin: "http://localhost:8080"
}))
app.set('trust proxy', true);

app.get('/', (req, res) => {
    res.send('Hello From API')
});

app.post('/', (req, res) => {
    console.log("Connected")
    const ip = "192.168.1.240"
    res.json({ ip: ip });
});

app.post('/init', (req, res) => {
    console.log("gen uuid")
    const uuid = uuidv4();
    res.json({ uuid: uuid });
});

app.listen(port, () => {
    console.log(`listent on port ${port}`)
})