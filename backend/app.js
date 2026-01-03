const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const db = require('./db/connect');
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth.routes');
const clientRoutes = require('./routes/client.routes');
const fileRoutes = require('./routes/file.routes');
const storageInfoRoutes = require('./routes/storage.routes');

const uploadProgress = require('./middlewares/uploadProgress');

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors())

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ status: 'ok' }))

app.post('/connection', (req, res) => {
    // console.log("Get Connection")
    const init_path = "http://192.168.1.240:8080/init"
    res.json({ url: init_path });
});

app.use('/auth', authRoutes);
app.use('/device', clientRoutes);
app.use('/file', fileRoutes);
app.use('/storage', storageInfoRoutes);
app.use(uploadProgress);

app.listen(port, () => {
    console.log(`listent on port ${port}`)
})