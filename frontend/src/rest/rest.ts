export default class Rest {
    static async getConnection() {
        return await fetch("http://localhost:5000/connection", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
    }
    
    static async initRest(uuid: string) {
        // console.log("Init REST with uuid:", uuid);
        return await fetch("http://localhost:5000/init", {
            method: "POST",
            body: JSON.stringify({ uuid }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
    }
    
    static async generateNewUUID() {
        return await fetch("http://localhost:5000/generate-uuid", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
    }
    
}



