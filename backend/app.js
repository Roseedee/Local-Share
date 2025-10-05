const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const { insertClient, loadClients, loadClient } = require('./db/connect');

const app = express();
const port = 5000;

app.use(cors({
    origin: [
        "http://localhost:8080",
        "http://192.168.1.240:8080/init"
    ]
}))

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({status: 'ok'})
});

app.post('/connection', (req, res) => {
    console.log("Get Connection")
    const init_path = "http://192.168.1.240/init"
    res.json({ url: init_path });
});

app.post('/init', (req, res) => {
    //return device info if exist
    //if not or not found in database return new uuid
    const { uuid } = req.body;
    if (uuid) {
        console.log("Already have uuid: ", uuid)
        loadClient(uuid).then(client => {
            res.json({ deviceInfo: client});
        })
        return;
    }
    console.log("gen uuid")
    const uuid_new = uuidv4();
    res.json({ uuid: uuid_new });
});


let cgen_uuid = 0
app.post('/generate-uuid', (req, res) => {
    cgen_uuid++
    console.log('generate new uuid: ', cgen_uuid)
    const new_uuid = uuidv4();
    res.json({ uuid: new_uuid })
})

app.post('/verify', (req, res) => {
    const { uuid, name } = req.body;
    console.log("verify id: ", uuid, "name: ", name)
    insertClient(uuid, name);
    res.json({ status: "ok" });
})

app.post('/verify-uuid', (req, res) => {
    const { uuid, name } = req.body;
    if( uuid === "" || name === "") {
        res.json({status: 'bad'})
        return;
    }
    console.log("verify id: ", uuid, "name: ", name)
    insertClient(uuid, name);
    res.json({ status: "ok" });
})

app.post('/get-client', async (req, res) => {
    const { uuid } = req.body
    console.log("Get All Client by : " + uuid)
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