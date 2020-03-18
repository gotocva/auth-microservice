

const express   = require("express");
const md5       = require('md5');
const app       = express();
const { connection } = require("./db");
const { registerValidate,loginValidate } = require("./validator");
const { emailCheck } = require("./middleware");
const env = require("./env");

app.use(express.json());

const resp = (req,res,next) => {
    res.success = (body,msg,code = 200) => {
        res.status(code).json({"HTTP_STATUS_CODE" : code,"status":true,"message":msg,"body":body});
    }
    res.error = (body,msg,code = 500) => {
        res.status(code).json({"HTTP_STATUS_CODE" : code,"status":false,"message":msg,"body":body});
    }
    next();
};
app.use(resp);

/**
 *  api to check username is available
 */
app.post('/api/v1/check-username', (req,res) => {
    let sql = `SELECT count(*) as count from auth where username = "${req.body.username}"`;
    connection.query(
        sql,
        function(err, results, fields) {
            if(results[0].count === 0){
                res.success({},"username available");
            }else{
                res.error({},"username not available");
            }
        }
    );
});

/**
 *  register api
 */
app.post('/api/v1/user', [registerValidate,emailCheck], (req,res) => {

    const token = md5(new Date());
    const password = md5(req.body.password);
    const insertSql = `INSERT INTO auth (username, email,token, password)
    VALUES ("${req.body.username}","${req.body.email}","${token}","${password}")`;

    connection.query(
        insertSql,
        function(err, results, fields) {
            console.dir(err);
            console.dir(results);
            connection.query(
                `SELECT * from auth where id = ${results.insertId}`,
                function(err, results, fields) {
                    res.success(results[0],"New user registered successfully");
            });
            
        }
    );
});

/**
 *  login api
 */
app.post('/api/v1/user/auth', [ loginValidate ], (req,res) => {
    const password = md5(req.body.password);
    const selectSql = `SELECT * from auth WHERE email = "${req.body.email}" AND password = "${password}"`
    connection.query(
        selectSql,
        function(err, results, fields) {
            if (err != null) {
                res.error(err,"Invalid login credentials")
            } else {
                res.success(results[0],"Login successfully");
            }            
        }
    );
});




app.listen(8009, () => { console.log("app running on port 8009"); });