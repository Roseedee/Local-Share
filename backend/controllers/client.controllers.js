const db = require('../db/connect');

exports.getDevices = async (req, res) => {
    const { client_id } = req.body
    // console.log("Get All Client by : " + client_id)
    try {
        const result = await db.loadClients(client_id);
        const clients = result.map(client => ({
            client_id: client.client_id,
            id: client.client_uuid,
            name: client.client_name
        }));
        res.json({ result: clients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load clients" });
    }
};

exports.editDeviceName = async (req, res) => {
    const userId = req.body.userId || "";
    const newName = req.body.newName || "";
    // console.log(userId, " ", newName)
    if (userId === "" || newName === "") {
        return res.status(400).json({ message: "Data is not define" });
    }
    try {
        const result = db.renameComputer(userId, newName)
        res.json({ result: result });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to rename computer");
    }
}