import {con} from "./db_connect.js";
import * as User from "./user.js";

async function createStoryUserTable(){
    let sql = `CREATE TABLE IF NOT EXISTS StoryUser(
	storyId INT NOT NULL,
    userId INT NOT NULL,
    StoryRole ENUM ('author', 'coauthor', 'player') NOT NULL,
    PRIMARY KEY (storyId, userId),
    FOREIGN KEY(userId) REFERENCES user(userId),
    FOREIGN KEY(storyId) REFERENCES Story(storyId)
    );`

    await con.query(sql)

}

createStoryUserTable()


async function addUserToStoryByUserId(storyId, userId, role){
    let sql = `INSERT INTO StoryUser (storyId, userId, StoryRole) VALUES (?, ?, ?);`
    return await con.query(sql, [storyId, userId, role]);
}

async function addUserToStoryByUserName(storyId, username, role){
    const userId = await User.getUserIdByUsername(username);
    let sql = `INSERT INTO StoryUser (storyId, userId, StoryRole) VALUES (?, ?, ?);`
    return await con.query(sql, [storyId, userId, role]);
}

async function getUsersByStoryId(storyId){
    let sql = `SELECT userId, StoryRole FROM StoryUser WHERE storyId = ?;`
    return await con.query(sql, [storyId]);
}

async function getStoriesByUserId(userId){
    let sql = `SELECT storyId, StoryRole FROM StoryUser WHERE userId = ?;`
    return await con.query(sql, [userId]);
}

async function getUserRoleInStory(storyId, userId){
    let sql = `SELECT StoryRole FROM StoryUser WHERE storyId = ? AND userId = ?;`
    const result = await con.query(sql, [storyId, userId]);
    return result.length > 0 ? result[0].StoryRole : null;
}

async function changeUserRole(storyId, userId, newRole){
    let sql = `UPDATE StoryUser SET StoryRole = ? WHERE storyId = ? AND userId = ?;`
    return await con.query(sql, [newRole, storyId, userId]);
}

async function removeUserFromStory(storyId, userId){
    let sql = `DELETE FROM StoryUser WHERE storyId = ? AND userId = ?;`
    return await con.query(sql, [storyId, userId]);
}

async function removeAllUsersFromStory(storyId){
    let sql = `DELETE FROM StoryUser WHERE storyId = ?;`
    return await con.query(sql, [storyId]);
}





export {
    addUserToStoryByUserId,
    addUserToStoryByUserName,
    getUsersByStoryId,
    getStoriesByUserId,
    getUserRoleInStory,
    changeUserRole,
    removeUserFromStory,
    removeAllUsersFromStory
}

    
