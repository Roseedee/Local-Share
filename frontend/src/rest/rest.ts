export default class Rest {
    static apiHost = "http://localhost:5000/"

    static async ping() {
        return await fetch(this.apiHost, {
            method: "GET"
        }).then((res) => res.json())
    }

    static async getConnection() {
        return await fetch(this.apiHost + "connection", {
            method: "POST"
        }).then((res) => res.json())
    }

    static async initRest(uuid: string) {
        // console.log("Init REST with uuid:", uuid);
        return await fetch(this.apiHost + "init", {
            method: "POST",
            body: JSON.stringify({ uuid })
        }).then((res) => res.json());
    }

    static async generateNewUUID() {
        return await fetch(this.apiHost + "generate-uuid", {
            method: "POST"
        }).then((res) => res.json())
    }

    static async verifyUUID(uuid: string, name: string) {
        return await fetch(this.apiHost + "verify-uuid", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid, name })
        }).then((res) => res.json())
    }

    static async getAllClient(uuid: string) {
        return await fetch(this.apiHost + "get-client", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uuid})
        }).then((res) => res.json())
    }
}



