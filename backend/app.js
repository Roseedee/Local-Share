const express = require('express')
const cors = require('cors')


const app = express();
const port = 5000;

app.use(cors({
    origin: "http://localhost:8080"
}))
app.set('trust proxy', true);

app.get('/', (req, res) => {
    console.log("init")
    const ip = "192.168.1.240"
    res.json({ ip: ip });

})


app.listen(port, () => {
    console.log(`listent on port ${port}`)
})