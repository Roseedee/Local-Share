const express = require('express')
const cors = require('cors')

const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;



let clients = [
    { id: "de4929ed-d33b-419a-9628-b3bd014b5cdd", name: "My Computer"},
]

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
    clients.push({ id: uuid, name: name });
    res.json({ status: "ok" });
})

app.post('/get-client', (req, res) => {
    res.json({ clients: clients });
})

app.listen(port, () => {
    console.log(`listent on port ${port}`)
})