const con = require("./db_connect")


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

async function getAllStories(){
    let sql = `select * from Story`;
    return await con.query(sql)
}
