import {con} from "./db_connect.js";
import * as StoryUser from "./storyUser.js"


async function createStoryTable(){
    let sql = `create table if not exists Story(
	storyId INT AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    isPublic BOOL NOT NULL,
    PRIMARY KEY(storyId)
 )`;

    await con.query(sql)

}

createStoryTable()



async function createStory(title, isPublic, userId){
    let sql = `INSERT INTO Story (title, isPublic) VALUES (?, ?);`
    const result = await con.query(sql, [title, isPublic]);
    const storyId = result.insertId;
    await addUserToStoryByUserId(storyId, userId, 'author');
    console.log("Created story with ID:", storyId, "for user ID:", userId);
    return result;
}

async function getStoryById(storyId){
    let sql = `SELECT * FROM Story WHERE storyId = ?;`
    const result = await con.query(sql, [storyId]);
    return result.length > 0 ? result[0] : null;
} 

async function getAllPublicStories(){
    let sql = `SELECT * FROM Story WHERE isPublic = true;`
    return await con.query(sql);
}

async function updateTitle(newTitle, storyId){
    let sql = `UPDATE Story SET title = ? WHERE storyId = ?;`
    return await con.query(sql, [newTitle, storyId]);
}

async function updateIsPublic(isPublic, storyId){
    let sql = `UPDATE Story SET isPublic = ? WHERE storyId = ?;`
    return await con.query(sql, [isPublic, storyId]);
}

async function addUserToStoryByUserId(storyId, userId, role){
    return await StoryUser.addUserToStoryByUserId(storyId, userId, role);
}

async function deleteStory(storyId){
    let sql = `DELETE FROM Story WHERE storyId = ?;`
    return await con.query(sql, [storyId]);
    await StoryUser.removeAllUsersFromStory(storyId);
}





export {
    createStory,
    getStoryById,
    getAllPublicStories,
    updateTitle,
    updateIsPublic,
    addUserToStoryByUserId,
    deleteStory
}
