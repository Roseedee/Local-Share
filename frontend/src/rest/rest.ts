export default class Rest {
    static apiHost = "http://localhost:5000/";
    static logTag = "API: "
    static devMode = true

    static log(str: string) {
        if(this.devMode) console.log(this.logTag, str)
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
        this.log("Authentication")
        const response = await fetch(this.apiHost + "auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: errorData.error || 'Request failed'
            };
        }

        return await response.json();
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

    static async getAllClient(uuid: string) {
        this.log("Get All Client")
        return await fetch(this.apiHost + "get-client", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid })
        }).then((res) => res.json())
    }

    static async uploadFiles(form: FormData) {
        this.log("Upload Files")
        const response = await fetch(this.apiHost + "upload", {
            method: "POST",
            body: form
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: errorData.error || 'Request failed'
            };
        }

        return await response.json()
    }
}



