const path = require('path');
const db = require('../db/connect');
const AdmZip = require('adm-zip');
const fs = require('fs')

exports.uploadFiles = async (req, res) => {
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
        db.insertFiles(
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
}

exports.files = async (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    res.sendFile(filePath);
}

exports.allFiles = async (req, res) => {
    const { userId } = req.body;

    console.log("Load Files for : " + userId)

    try {
        const result = await db.loadFiles(userId);
        const files = result.map(file => ({
            id: file.file_id,
            new_name: file.file_new_name,
            name: file.file_org_name,
            size: file.file_size,
            type: file.file_type,
            client_id_source: file.client_uuid_source,
            client_id_target: file.client_uuid_target,
            create_at: file.create_at
        }));
        // console.log("Files Loaded: ", files.length)
        res.json({ results: files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load Files" });
    }
}

exports.downloadFiles = async (req, res) => {
    const files = req.body.files;

    if (!files || files.length === 0) {
        return res.status(400).send("No files specified");
    }

    const zip = new AdmZip();

    try {
        const result = await db.getFileByIds(files);

        if (files.length === 1) {
            const fileRecord = result[0];
            const filePath = path.join(__dirname, "../uploads", fileRecord.file_new_name);

            if (!fs.existsSync(filePath)) {
                return res.status(404).send("File not found");
            }

            const originalName = fileRecord.file_org_name;

            res.setHeader("Content-Disposition", `attachment; filename="${originalName}"`);
            res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

            return res.download(filePath, originalName);
        }

        for (const fileRecord of result) {
            const filePath = path.join(__dirname, "../uploads", fileRecord.file_new_name);
            if (fs.existsSync(filePath)) zip.addLocalFile(filePath, "", fileRecord.file_org_name);
        }

        const now = new Date();
        const formatted = now.toISOString().replace(/[-:]/g, "").replace("T", "_").split(".")[0];
        const zipFileName = `download_${formatted}.zip`;

        const buffer = zip.toBuffer();

        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", `attachment; filename="${zipFileName}"`);
        res.setHeader("Content-Length", buffer.length);
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

        console.log(`✅ ZIP ready: ${zipFileName}`);
        res.end(buffer); // ส่ง blob ให้ React รับตรง ๆ
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to create zip");
    }
}

exports.deleteFiles = async (req, res) => {
    const fileId = req.body.fileId || "";
    console.log("Delete File with ID: ", fileId);

    if (fileId === "") {
        return res.status(400).json({ message: "File ID is required." });
    }

    try {
        const fileNamesResult = await db.getFilesNameByIds(fileId);
        for (const fileRecord of fileNamesResult) {
            const filePath = path.join(__dirname, "../uploads", fileRecord.file_new_name);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Deleted file from filesystem: ${fileRecord.file_new_name}`);
            }
        }
        const resultDel = await db.deleteFilesById(fileId);
        res.json({ result: resultDel });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to delete file");
    }
}

exports.renameFile = async (req, res) => {
    const fileId = req.body.fileId || "";
    const newName = req.body.newName || "";
    const fileExt = req.body.fileExt || "";
    console.log(`Rename File ID: ${fileId} to New Name: ${newName}.${fileExt}`);

    if (fileId === "" || newName === "" || fileExt === "") {
        return res.status(400).json({ message: "File ID, New Name, and File Extension are required." });
    }

    try {
        const result = await db.renameFileById(fileId, newName, fileExt);
        res.json({ result });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to rename file");
    }
}