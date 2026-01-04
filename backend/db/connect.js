const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME
});

const connectToDatabase = () => {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return false;
        }
        console.log('Connected to database');
    });
}

exports.auth = (uuid) => {
    connectToDatabase();
    const query = 'SELECT * FROM clients WHERE client_uuid=?';
    return new Promise((resolve, reject) => {
        db.execute(query, [uuid], (err, results) => {
            if (err) {
                console.error('Error auth : ', err);
            }
            if (!results || results.length === 0) {
                console.log("No Client Found")
                return resolve(null); // or resolve([]) if you prefer empty array
            }
            resolve(results)
        })
    })
}

exports.insertClient = async (uuid, name) => {
    connectToDatabase();
    const query = 'INSERT INTO clients (client_uuid, client_name) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        db.execute(query, [uuid, name], (err, results) => {
            if (err) {
                console.error('Error inserting client:', err);
                return false;
            }
            // console.log('Client inserted with ID:', results.insertId);
            resolve(results.insertId);
        });
    })
}

exports.loadClients = async (client_id) => {
    connectToDatabase();
    const query = 'SELECT * FROM clients Where client_id != ' + db.escape(client_id);
    return new Promise((resolve, reject) => {
        db.execute(query, (err, results) => {
            if (err) {
                console.error('Error loading clients:', err);
                return reject(err);
            }
            // console.log('Clients loaded:', results);
            resolve(results);
        });
    });
}

exports.insertFiles = (fileOrgName, fileNewName, fileSize, fileType, uploadByID, uploadToID) => {
    uploadToID = uploadToID === "" ? uploadByID : uploadToID;
    connectToDatabase();
    const query = 'INSERT INTO files (file_org_name, file_new_name, file_size, file_type, uploader_device_id, owner_device_id) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.execute(query, [fileOrgName, fileNewName, fileSize, fileType, uploadByID, uploadToID], (err, results) => {
            if (err) {
                console.error('Error inserting file:', err);
                return reject(err);
            }
            console.log('File inserted with ID:', results.insertId);
            resolve(results);
        });
    });
}

exports.loadFiles = async (viewer_device_id, owner_device_id) => {
    connectToDatabase();
    const query = 'CALL get_visible_files(' + db.escape(viewer_device_id) + ', ' + db.escape(owner_device_id) + ')';
    return new Promise((resolve, reject) => {
        db.execute(query, (err, results) => {
            if (err) {
                console.error('Error loading files:', err);
                return reject(err);
            }
            // console.log('Files loaded:', results);
            resolve(results);
        });
    });
}

exports.getFileByIds = async (files) => {
    connectToDatabase();
    const query = `SELECT file_org_name, file_new_name FROM files WHERE file_id IN (${files.map(() => '?').join(',')})`;
    return new Promise((resolve, reject) => {
        db.execute(query, files, (err, results) => {
            if (err) {
                console.error('Error fetching files by IDs:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

exports.renameComputer = async (userId, newName) => {
    connectToDatabase();

    const query = `UPDATE clients SET client_name = ? WHERE client_id = ?`;

    return new Promise((resolve, reject) => {
        db.execute(query, [newName, userId], (err, result) => {
            if (err) {
                console.error('Error renaming user:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

exports.deleteFilesById = async (fileId) => {
    connectToDatabase();
    const placeholders = fileId.map(() => '?').join(', ');
    const query = `DELETE FROM files WHERE file_id IN (${placeholders})`;
    return new Promise((resolve, reject) => {
        db.execute(query, fileId, (err, results) => {
            if (err) {
                console.error('Error deleting file:', err);
                return reject(err);
            }
            // console.log('File deleted with ID:', fileId);
            resolve(results);
        });
    });
}

exports.getFilesNameByIds = async (files) => {
    connectToDatabase();
    const query = `SELECT file_new_name FROM files WHERE file_id IN (${files.map(() => '?').join(',')})`;
    return new Promise((resolve, reject) => {
        db.execute(query, files, (err, results) => {
            if (err) {
                console.error('Error fetching files by IDs:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

exports.renameFileById = async (fileId, newName, fileExt) => {
    connectToDatabase();
    const query = `UPDATE files SET file_org_name = ? WHERE file_id = ?`;
    return new Promise((resolve, reject) => {
        db.execute(query, [newName + "." + fileExt, fileId], (err, results) => {
            if (err) {
                console.error('Error renaming file by ID:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

exports.getStorageInfo = async (userId) => {
    connectToDatabase();
    const query = 
        `SELECT
            clients.client_id,
            SUM(files.file_size) AS total_storage_used,
            clients.storage_limit
        FROM clients 
        LEFT JOIN files
        ON files.owner_device_id = clients.client_id
        WHERE clients.client_id = ${db.escape(userId)}
        GROUP BY
            clients.client_id,
            clients.storage_limit;`;
    return new Promise((resolve, reject) => {
        db.execute(query, (err, results) => {
            if (err) {
                console.error('Error fetching storage info:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

exports.editFileAccessScopeById = async (fileId, owner_device_id, accessScope) => {
    connectToDatabase();
    const query = `UPDATE files SET access_scope = ? WHERE file_id = ? AND owner_device_id = ?`;
    return new Promise((resolve, reject) => {
        db.execute(query, [accessScope, fileId, owner_device_id], (err, results) => {
            if (err) {
                console.error('Error editing file access scope by ID:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}