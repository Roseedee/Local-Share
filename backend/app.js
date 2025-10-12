const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const { insertClient, loadClients, loadClient } = require('./db/connect');
const path = require('path')
const fs = require('fs')
const multer = require('multer')

const app = express();
const port = 5000;

app.use(cors())

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });


app.use((req, res, next) => {
    const totalBytes = parseInt(req.headers["content-length"] || "0", 10);
    let uploadedBytes = 0;

    req.on("data", chunk => {
        uploadedBytes += chunk.length;
        if (totalBytes > 0) {
            const percent = ((uploadedBytes / totalBytes) * 100).toFixed(2);
            process.stdout.write(`\r📦 Uploading... ${percent}%`);
        }
    });

    req.on("end", () => {
        console.log("\n✅ Upload complete (stream finished)");
    });

    next();
});

app.get('/', (req, res) => {
    res.send({ status: 'ok' })
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
            res.json({ deviceInfo: client });
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
    if (uuid === "" || name === "") {
        res.json({ status: 'bad' })
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
});

app.post('/upload', upload.single("file"), (req, res) => {

    const clientId = req.body.clientId || "unknown";

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    console.log(`📥 File received from client: ${clientId}`);
    console.log(`📄 Original name: ${req.file.originalname}`);
    console.log(`💾 Saved as: ${req.file.filename}`);

    res.json({
        status: "ok",
        message: "Upload successful",
        clientId,
        file: {
            originalName: req.file.originalname,
            savedName: req.file.filename,
            size: req.file.size,
            type: req.file.mimetype
        }
    });
});

app.listen(port, () => {
    console.log(`listent on port ${port}`)
})