const mysql = require('mysql2');
const env = require("./env");
 
// create the connection to database
const connection = mysql.createConnection({
  host: env.host,
  user: env.user,
  database: env.db,
  password : env.password
});


// simple query
connection.query(
  'SELECT count(*) as count from `auth` where email = "ssiva@sparkouttech.com"',
  function(err, results, fields) {
    console.dir(err);
    console.log(results[0].count); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
    results.forEach(element => {
        console.dir(element.username);
    });
    }
);

module.exports = { connection }