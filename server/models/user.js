import {con} from "./db_connect.js";
import bcrypt from 'bcrypt'



console.log("User model loaded")

async function createUserTable() {
    
    let sql = `CREATE TABLE IF NOT EXISTS user (
        
	    userId INT AUTO_INCREMENT, 
	    username varchar(25) NOT NULL, 
	    email varchar(254) NOT NULL, 
	    passkey varchar(255) NOT NULL,
	    PRIMARY KEY (userId)

    );`

    await con.query(sql);
}

createUserTable();



async function deleteUser(userId){
    let sql = `DELETE FROM user WHERE userId = ?;`
    return await con.query(sql, [userId]);
}




async function usernameExists(username) {
    let sql = `SELECT COUNT(*) as count FROM user WHERE username = ?;`
    const result = await con.query(sql, [username]);
    return result[0][0]?.count > 0;
}

async function getUsernameById(userId) {
    let sql = `SELECT username FROM user WHERE userId = ?;`
    const result = await con.query(sql, [userId]);
    return result[0][0]?.username;
}
    

async function getEmailById(userId){
    let sql = `SELECT email FROM user WHERE userId = ?;`
    const result = await con.query(sql, [userId]);
    return result[0][0]?.email;
}
    

async function getUserIdByEmail(email) {
    let sql = `SELECT userId FROM user WHERE email = ?;`
    const result = await con.query(sql, [email]);
    return result[0][0]?.userId;
}
   

async function getUserIdByUsername(username) {
    let sql = `SELECT userId FROM user WHERE username = ?;`
    const result = await con.query(sql, [username]);
    return result[0][0]?.userId;
}
    

async function getPasskeyByUsername(username) {
    let sql = `SELECT passkey FROM user WHERE username = ?;`
    const result = await con.query(sql, [username]);
    return result[0][0]?.passkey;
}




async function changePassword(userId, newPasskey) {
    let hashedPasskey = await bcrypt.hash(newPasskey, 10);
    let sql = `UPDATE user SET passkey = ? WHERE userId = ?;`
    return await con.query(sql, [hashedPasskey, userId]);
}


async function changeUsername(userId, newUsername) {
    if (await usernameExists(newUsername)) {
        throw new Error('Username Exists');
    }
    let sql = `UPDATE user SET username = ? WHERE userId = ?;`
    return await con.query(sql, [newUsername, userId]);
}

async function changeEmail(userId, newEmail) {
    let sql = `UPDATE user SET email = ? WHERE userId = ?;`
    return await con.query(sql, [newEmail, userId]);
}
    

async function registerUser(userData) {
    if (await usernameExists(userData.username)) {
        throw new Error('Username Exists');
    }
    const hashedPasskey = await bcrypt.hash(userData.passkey, 10);
    let sql = `INSERT INTO user (username, email, passkey) VALUES (?, ?, ?);`
    return await con.query(sql, [userData.username, userData.email, hashedPasskey]);
}


async function loginUser(username, passkey) {
    
    const storedPasskey = await getPasskeyByUsername(username);
    console.log('Stored passkey for', username, ':', storedPasskey);
    if (storedPasskey && storedPasskey.length > 0) {
        const isMatch = await bcrypt.compare(passkey, storedPasskey);
        console.log('Password match:', isMatch);
        if (isMatch) {
            return true;
        } else {
            return false;
        }
    }
    else {
        throw new Error('User Not Found');
    }
}

async function logOutUser(sessionId) {
    deleteSession(sessionId)
}


export  {
    getUsernameById,
    getEmailById,
    getUserIdByEmail,
    getUserIdByUsername,
    getPasskeyByUsername,
    registerUser,
    changePassword,
    loginUser,
    changeUsername,
    changeEmail,
    deleteUser,
    logOutUser,
}

