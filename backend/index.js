const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
var mysql = require('mysql');
const { connect } = require('http2');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "customsite"
});

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.all("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
    next();
});

app.post('/api/createproject', (req, res) => {
    console.log(req.body);
    let name = req.body.projectname;
    let des = req.body.description;

    connection.query(`INSERT into project(name,description) VALUES('${name}','${des}')`, function(error, results) {
        if (error) {
            // res.send(400);
            // throw error;
        }
        console.log('The solution is: ', results);
        res.send({ result: results.affectedRows });
    });
});

app.post('/api/createsite', (req, res) => {
    console.log(req.body);
    let proj1 = req.body.selectproject;
    let name1 = req.body.sitename;
    let latit1 = req.body.lati;
    let longit1 = req.body.long
    connection.query(`INSERT into position (name,latitude,longitude,sitename) VALUES ('${name1}','${latit1}','${longit1}',${proj1}')`, function(error, results) {
        if (error) {
            res.send(400);
            // throw error;
        }
        console.log('The solution is: ', results);
        res.send({ result: results.affectedRows });
    });
});

app.get('/api/getproject', (req, res) => {


    connection.query(`
    Select distinct name from project `, function(error, results) {
        if (error) {
            // res.send(400);
            // throw error;
        }
        console.log('The solution is: ', results);
        res.send({ result: results });

    });

})

app.listen(port, () => {
    console.log(`
    NODE server listening at http: //localhost:${port}`)
})