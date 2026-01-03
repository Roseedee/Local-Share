const db = require('../db/connect');

exports.storageInfo = async (req, res) => {

    const { userId } = req.body;

    console.log("Request Storage Info for User ID: ", userId);

    if(!userId){
        return res.status(400).json({ error: "Missing userId parameter" });
    }

    try {
        const storageInfo = await db.getStorageInfo(userId);
        // console.log("Storage Info: ", storageInfo);
        return res.json(storageInfo[0]);

    } catch (error) {
        console.error('Error fetching storage info:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}