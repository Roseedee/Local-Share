import axios from 'axios'

export default class Rest {
    static apiHost = "http://localhost:5000/";
    static logTag = "API: "
    static devMode = true

    static log(str: string) {
        if (this.devMode) console.log(this.logTag, str)
    }

    static async ping() {
        this.log("Ping")
        return await fetch(this.apiHost, {
            method: "GET"
        }).then((res) => res.json())
    }

    static async getConnection() {
        this.log("Get Public Connection")
        return await fetch(this.apiHost + "connection", {
            method: "POST"
        }).then((res) => res.json())
    }

    static async auth(uuid: string) {
        this.log("Authentication");
        try {
            const response = await fetch(this.apiHost + "auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uuid })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw {
                    status: response.status,
                    message: errorData.error || 'authentication failed'
                };
            }

            return await response.json();

        } catch (err: any) {
            if (err.status && typeof err.status === "number") {
                return Promise.reject(err);
            }

            return Promise.reject({
                status: "NETWORK_ERROR",
                message: err.message || "Network error or server did not respond"
            });
        }
    }

    static async generateNewUUID() {
        this.log("Generate New UUID")
        return await fetch(this.apiHost + "auth/generate-uuid", {
            method: "POST"
        }).then((res) => res.json())
    }

    static async verifyUUID(uuid: string, name: string) {
        this.log("Verify UUID")
        return await fetch(this.apiHost + "auth/verify-uuid", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid, name })
        }).then((res) => res.json())
    }

    static async getAllClient(client_id: string) {
        this.log("Get All Client")
        return await fetch(this.apiHost + "device/get-devices", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ client_id })
        }).then((res) => res.json())
    }

    static async uploadFiles(form: FormData, onProgress?: (percent: number) => void) {
        this.log("Upload Files");

        try {
            const response = await axios.post(
                this.apiHost + "files",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (e) => {
                        if (!onProgress) return;

                        const loaded = e.loaded ?? 0;
                        const total = e.total ?? loaded;
                        const percent = Math.round((loaded * 100) / total);

                        onProgress(percent);
                    },
                }
            );

            return response.data;

        } catch (error: any) {
            let message = "Request failed";

            if (error.response && error.response.data) {
                message = error.response.data.error || message;
            }

            throw {
                status: error.response?.status || 500,
                message,
            };
        }
    }

    static async getFiles(viewer_device_id: string, owner_device_id: string) {
        this.log("Get File")
        const param = new URLSearchParams({ viewer_device_id, owner_device_id });
        try {
            const response = await fetch(this.apiHost + "files?" + param.toString(), {
                method: "GET",
            })
            if (!response.ok) throw new Error("Failed to fetch files");

            return response.json();
        }catch (err) {
            console.error(err);
            throw err;
        }
    }

    static fileUrl(token: string): string {
        return this.apiHost + "files/" + token + "/preview";
    }

    static async downloadFiles(fileIds: string[]) {
        this.log("Download Files")

        if (fileIds.length === 0) throw new Error("ไม่สามารถดาวน์ไฟล์นี้ได้ กรุณาลองใหม่อีกครั้ง")

        const params = new URLSearchParams();
        fileIds.forEach(id => params.append('files', id));

        try {
            const response = await fetch(this.apiHost + "files/download?" + params.toString(), {
                method: "GET",
            });

            if (!response.ok) throw new Error("Download failed");

            return response;

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async renameComputer(userId: string, newName: string) {
        this.log("Rename Computer")

        if (newName.length > 30) throw new Error("Name is too long");

        try {
            const response = await fetch(this.apiHost + "device/edit-device-name", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, newName })
            });

            if (!response.ok) throw new Error("Can't rename you computer");

            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async deleteFiles(fileId: string[]) {
        this.log("Delete File")
        try {
            const response = await fetch(this.apiHost + "files", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileId })
            });
            if (!response.ok) throw new Error("Can't delete the file");
            return response;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async renameFile(fileId: string, newName: string) {
        this.log("Rename File")
        try {
            const response = await fetch(this.apiHost + "files/rename", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileId, newName })
            });
            if (!response.ok) throw new Error("Can't rename the file");
            return response;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async getStorageInfo(userId: string) {
        this.log("Get Storage Info")
        try {
            const response = await fetch(this.apiHost + "storage/info", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId})
            });
            if (!response.ok) throw new Error("Can't get storage info");
            return response.json();
        }catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async editFileAccessScope(file_id: string, owner_device_id: string, access_scope: string) {
        this.log("Edit File Access Scope")
        try {
            const response = await fetch(this.apiHost + `files/${file_id}/access-scope`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ owner_device_id, access_scope })
            });
            if (!response.ok) throw new Error("Can't edit file access scope");
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async getFilePermissionList(file_id: string) {
        this.log("Get File Permission List")
        // console.log("Fetching permission list for file ID:", file_id);
        try {
            const response = await fetch(this.apiHost + `files/${file_id}/permission`, {
                method: "GET",
            });
            if (!response.ok) throw new Error("Can't get file permission list");
            // console.log(response);
            return response.json();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async addFilePermission(file_id: string, device_id: string, permission_code: string) {
        this.log("Add File Permission")
        try {
            const response = await fetch(this.apiHost + `files/${file_id}/permission`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ device_id, permission_code })
            });
            if (!response.ok) throw new Error("Can't add file permission");
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async removeFilePermission(file_id: string, device_id: string) {
        this.log("Remove File Permission")
        try {
            const response = await fetch(this.apiHost + `files/${file_id}/permission`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ device_id })
            });
            if (!response.ok) throw new Error("Can't remove file permission");
            return response;
        } catch (err) {
            console.error(err);
            throw err;
        }   
    }
}