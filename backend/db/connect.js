const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'local-share'
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

const auth = (uuid) => {
    connectToDatabase();
    const query = 'SELECT * FROM clients WHERE client_uuid=?';
    return new Promise((resolve, reject) => {
        db.execute(query, [uuid], (err, results) => {
            if(err) {
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

const insertClient = async (uuid, name) => {
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

const loadClients = async (client_id) => {
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

const insertFiles = (fileOrgName, fileNewName, fileSize, fileType, uploadByID, uploadToID) => {

    uploadToID = uploadToID === "" ? uploadByID : uploadToID;

    connectToDatabase();
    const query = 'INSERT INTO files (file_org_name, file_new_name, file_size, file_type, client_uuid_source, client_uuid_target) VALUES (?, ?, ?, ?, ?, ?)';
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

module.exports = {
    db,
    auth, insertClient, loadClients, 
    insertFiles
};

