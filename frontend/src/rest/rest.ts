export async function getConnection() {
    return await fetch("http://localhost:5000/connection", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}

export async function initRest(uuid: string) {
    // console.log("Init REST with uuid:", uuid);
    return await fetch("http://localhost:5000/init", {
        method: "POST",
        body: JSON.stringify({ uuid }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}

