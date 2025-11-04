const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const { auth, insertClient, loadClients, insertFiles, loadFiles } = require('./db/connect');
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const { error } = require('console');

const app = express();
const port = 5000;

app.use(cors())

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/files', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const uniqueName = `${uuidv4()}.${ext}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });


app.use((req, res, next) => {

    if(req.path === '/upload' && req.method === 'POST') {
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
    }

    next();
});

app.get('/', (req, res) => {
    res.send({ status: 'ok' })
});

app.post('/connection', (req, res) => {
    console.log("Get Connection")
    const init_path = "http://192.168.1.240:8080/init"
    res.json({ url: init_path });
});

app.post('/auth', async (req, res) => {
    const { uuid } = req.body;
    console.log("Authentication with : ", uuid)
    try {
        const result = await auth(uuid);
        // console.log(result)
        if(result) {
            res.json({
                client_id: result[0].client_id,
                id: result[0].client_uuid,
                name: result[0].client_name
            });
        }else {
            res.status(404).json({error: "Device Not Found"})
        }
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: "Failed to authentication" });
    }
});


let cgen_uuid = 0
app.post('/generate-uuid', (req, res) => {
    cgen_uuid++
    console.log('generate new uuid: ', cgen_uuid)
    const new_uuid = uuidv4();
    res.json({ uuid: new_uuid })
})

app.post('/verify-uuid', async (req, res) => {
    const { uuid, name } = req.body;
    if (uuid === "" || name === "") {
        res.json({ status: 'bad' })
        return;
    }

    try {
        const id = await insertClient(uuid, name);
        console.log('Returned ID:', id);
        res.json({ status: "ok", client_id: id });
    } catch (err) {
        console.error('Insert failed:', err);
    }
    // const insertId = await insertClient(uuid, name);
    // console.log("verify id: ", uuid, "name: ", name)
})


app.post('/get-client', async (req, res) => {
    const { client_id } = req.body
    console.log("Get All Client by : " + client_id)
    try {
        const result = await loadClients(client_id);
        const clients = result.map(client => ({
            client_id: client.client_id,
            id: client.client_uuid,
            name: client.client_name
        }));
        res.json({ clients: clients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load clients" });
    }
});

app.post('/upload', upload.array("files", 10), (req, res) => {

    const uploadByID = req.body.uploadByID || "";
    const uploadToID = req.body.uploadToID || "";
    
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }

    console.log(`📥 Files received from client: ${uploadByID}`);
    req.files.forEach((file, index) => {
        console.log(`📄 [${index + 1}] ${file.originalname} -> ${file.filename}`);
    });

    req.files.forEach((file) => {
        insertFiles(
            file.originalname,
            file.filename,
            file.size,
            file.mimetype,
            uploadByID,
            uploadToID
        ).catch((error) => {
            console.error('Error inserting file record:', error);
            res.status(500).json({ error: "Failed file to record" });
        }); 
    });


    res.json({
        status: "ok",
        message: "Upload successful",
        uploadByID,
        uploadToID,
        files: req.files.map(file => ({
            originalName: file.originalname,
            savedName: file.filename,
            size: file.size,
            type: file.mimetype
        }))
    });
});

app.get('/files/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.sendFile(filePath);
});

app.post('/files',async (req, res) => {
    const { token } = req.body;

    console.log("Load Files for : " + token)

    try {
        const result = await loadFiles(token);
        const files = result.map(file => ({
            file_id: file.file_id,
            file_path: file.file_new_name,
            file_org_name: file.file_org_name,
            file_size: file.file_size,
            file_type: file.file_type,
            client_uuid_source: file.client_uuid_source,
            client_uuid_target: file.client_uuid_target,
            upload_time: file.create_at
        }));
        console.log("Files Loaded: ", files.length)
        res.json({ results: files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load Files" });
    }
});

app.listen(port, () => {
    console.log(`listent on port ${port}`)
})