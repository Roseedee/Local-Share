const path = require('path');
const db = require('../db/connect');
const AdmZip = require('adm-zip');
const fs = require('fs')
const token = require('../utils/token');

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

exports.fileServe = async (req, res) => {
    const fileToken = req.query.token || "";
    const payload = token.verifyToken(fileToken);
    if (!payload) {
        return res.status(401).send("Invalid or expired token");
    }
    const filePath = path.join(__dirname, '../uploads', payload.file_path);
    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }

    res.download(filePath);
}

exports.allFiles = async (req, res) => {
    const { viewer_device_id, owner_device_id } = req.query;

    console.log("Viewer : " + viewer_device_id + ", Onwer : " + owner_device_id);

    try {
        const result = await db.loadFiles(viewer_device_id, owner_device_id);
        // console.log("DB Result: ", result[0].file_id);
        const files = result[0].map(file => {
            const file_token = token.signToken({
                file_id: file.file_id,
                file_path: file.file_new_name,
                exp: Date.now() + 5 * 60 * 1000 // 5 minutes expiration
            });

            return {
                id: file.file_id,
                name: file.file_org_name,
                size: file.file_size,
                type: file.file_type,
                access_scope: file.access_scope,
                permission_code: file.permission_code,
                client_id_source: file.uploader_device_id,
                client_id_target: file.owner_device_id,
                create_at: file.create_at,
                download_url: file_token
            }
        });
        // console.log("Files Loaded: ", files)
        res.json({ results: files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load Files" });
    }
}

exports.downloadFiles = async (req, res) => {
    const filesTemp = req.query.files;
    const files = Array.isArray(filesTemp) ? filesTemp : [filesTemp];
    if (!files || files.length === 0) {
        return res.status(400).send("No files specified");
    }

    const zip = new AdmZip();

    try {
        const result = await db.getFileByIds(files);

        if (result.length === 1) {
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
    console.log(`Rename File ID: ${fileId} to New Name: ${newName}`);

    if (fileId === "" || newName === "") {
        return res.status(400).json({ message: "File ID and New Name are required." });
    }

    try {
        const result = await db.renameFileById(fileId, newName);
        res.json({ result });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to rename file");
    }
}

exports.editFileAccessScope = async (req, res) => {
    const fileId = req.params.id;
    const { owner_device_id, access_scope } = req.body;
    if (fileId === "" || owner_device_id === "" || access_scope === "") {
        return res.status(400).json({ message: "File ID, Owner Device ID, and Access Scope are required." });
    }

    try {
        const result = await db.editFileAccessScopeById(fileId, owner_device_id, access_scope);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "File not found or no changes made." });
        }
        res.json({ message: "File access scope updated successfully", result });
    }
    catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to edit file access scope");
    }
}

exports.getFilePermissionList = async (req, res) => {
    const fileId = req.params.id;
    try {
        const result = await db.getFilePermissionList(fileId);
        // console.log("File Permission List: ", result[0]);
        res.json({ result: result[0] });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to get file permission list");
    }   
}

exports.updateFile = async (req, res) => {
    const id = req.params.id;
    const patch = req.body;

    const allowedFields = ['name', 'access_scope'];

    const updates = {};
    for (const field in patch) {
        if (!allowedFields.includes(field)) {
            return res.status(400).json({ message: `Field '${field}' is not allowed to be updated.` });
        }
        updates[field] = patch[field];
    }
    console.log(`Updating file ID: ${id} with data:`, updates);
}

exports.addFilePermission = async (req, res) => {
    const file_id = req.params.id;
    const { device_id, permission_code } = req.body;
    if (!file_id || !device_id || !permission_code) {
        return res.status(400).json({ message: "File ID, Target Device ID, and Permission Code are required." });
    }
    try {        
        const result = await db.addFilePermission(file_id, device_id, permission_code);
        res.json({ message: "Permission added successfully", result });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to add file permission");
    }   
}

exports.deleteFilePermission = async (req, res) => {
    const file_id = req.params.id;
    const { device_id } = req.body;
    if (!file_id || !device_id) {
        return res.status(400).json({ message: "File ID and Target Device ID are required." });
    }
    try {        
        const result = await db.deleteFilePermission(file_id, device_id);
        res.json({ message: "Permission deleted successfully", result });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Failed to delete file permission");
    }   
}
