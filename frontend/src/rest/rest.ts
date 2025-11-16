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
            const response = await fetch(this.apiHost + "auth", {
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
        return await fetch(this.apiHost + "generate-uuid", {
            method: "POST"
        }).then((res) => res.json())
    }

    static async verifyUUID(uuid: string, name: string) {
        this.log("Verify UUID")
        return await fetch(this.apiHost + "verify-uuid", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid, name })
        }).then((res) => res.json())
    }

    static async getAllClient(client_id: string) {
        this.log("Get All Client")
        return await fetch(this.apiHost + "get-client", {
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
                this.apiHost + "upload",
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

}



