const {v4: uuidv4} = require('uuid');
const db = require('../db/connect');

exports.login = async (req, res) => {
    const { uuid } = req.body;
    console.log("Authentication with : ", uuid)
    try {
        const result = await db.auth(uuid);
        // console.log(result)
        if (result) {
            res.json({
                client_id: result[0].client_id,
                id: result[0].client_uuid,
                name: result[0].client_name
            });
        } else {
            res.status(404).json({ error: "Device Not Found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to authentication" });
    }
};

exports.generateUUID = (req, res) => {
    const new_uuid = uuidv4();
    res.json({ uuid: new_uuid });
};

exports.verifyUUID = async (req, res) => {
    const { uuid, name } = req.body;
    if (uuid === "" || name === "") {
        res.json({ status: 'bad' })
        return;
    }

    try {
        const id = await db.insertClient(uuid, name);
        console.log('Returned ID:', id);
        res.json({ status: "ok", client_id: id });
    } catch (err) {
        console.error('Insert failed:', err);
    }
};