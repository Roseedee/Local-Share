const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const { insertClient, loadClients } = require('./db/connect');

const app = express();
const port = 5000;

app.use(cors({
    origin: "http://localhost:8080"
}))
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/verify', (req, res) => {
    const { uuid, name } = req.body;
    console.log("verify id: ", uuid, "name: ", name)
    insertClient(uuid, name);
    res.json({ status: "ok" });
})

app.post('/get-client', async (req, res) => {
    try {
        const result = await loadClients();
        const clients = result.map(client => ({
            id: client.device_uuid,
            name: client.device_name
        }));
        res.json({ clients: clients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load clients" });
    }
})

app.listen(port, () => {
    console.log(`listent on port ${port}`)
})