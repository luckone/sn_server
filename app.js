const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/connection')
const CONFIG = require('./config')

const app = express();
const mysql = db.mySqlConnection

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    if (req.headers.origin) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    next();
})

app.get('/', (req, res) => {
    res.send('Server is up')
})

mysql.authenticate()
    .then(() => {console.log(`Connection to ${CONFIG.MYSQL.DATABASE} (MYSQL) - established`)})
    .catch((ex) => {console.log(`Connection to ${CONFIG.MYSQL.DATABASE} (MYSQL) - failed: ${ex}`)})

const server = app.listen(CONFIG.PORT, () => {
    console.log(`Server is up on ====> ${CONFIG.PORT}`)
})
