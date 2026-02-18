const db = require("./db");

exports.getTest = async () => {
  const [rows] = await db.execute('SELECT * FROM files');
  console.log('Fetched files:', rows);
//   return rows;
};

exports.insertFiles = (fileOrgName, fileNewName, fileSize, fileType, uploadByID, uploadToID) => {
    uploadToID = uploadToID === "" ? uploadByID : uploadToID;
    const query = 'INSERT INTO files (file_org_name, file_new_name, file_size, file_type, uploader_device_id, owner_device_id) VALUES (?, ?, ?, ?, ?, ?)';
    const [results] = db.execute(query, [fileOrgName, fileNewName, fileSize, fileType, uploadByID, uploadToID]);
    return results.insertId;
}