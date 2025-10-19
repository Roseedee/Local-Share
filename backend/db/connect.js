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
    const query = 'SELECT * FROM clients WHERE device_uuid=?';
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

const insertClient = (uuid, name) => {
    connectToDatabase();
    const query = 'INSERT INTO clients (device_uuid, device_name) VALUES (?, ?)';
    db.execute(query, [uuid, name], (err, results) => {
        if (err) {
            console.error('Error inserting client:', err);
            return false;
        }
        // console.log('Client inserted with ID:', results.insertId);
    });
}

const loadClients = async () => {
    connectToDatabase();
    const query = 'SELECT * FROM clients';
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

module.exports = {
    db,
    auth, insertClient, loadClients
};

