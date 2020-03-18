
const { connection } = require("./db");

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const emailCheck = (req,res,next) => {
    
    let sql = `SELECT count(*) as count from auth where email = "${req.body.email}"`;
    connection.query(
        sql,
        function(err, results, fields) {
            if(results[0].count === 0){
                next();
            }else{
                res.status(400).json({"status":false,"message":"Email already exists"});
            }
        }
      );
};

module.exports = { emailCheck }