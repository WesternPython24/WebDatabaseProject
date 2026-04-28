const con = require("./db_connect");




async function createUserTable() {
    
    let sql = `CREATE TABLE IF NOT EXISTS user (
        
	    userId INT AUTO_INCREMENT, 
	    username varchar(25) NOT NULL, 
	    email varchar(254) NOT NULL, 
	    passkey varchar(50) NOT NULL,
	    PRIMARY KEY (userId)

    );`

    await con.query(sql);
}

createUserTable();


async function getAllUsers() {
    let sql = `SELECT * FROM user;`
    return await con.query(sql);
}

module.exports = {
    getAllUsers
}

