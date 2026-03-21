create database if not exists WebDataDatabase;
use WebDataDatabase;

CREATE TABLE IF NOT EXISTS Story(
	storyId INT AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    isPublic BOOL NOT NULL,
    PRIMARY KEY(storyId)
 );
 
CREATE TABLE IF NOT EXISTS User (
	userId INT AUTO_INCREMENT, 
	username varchar(25) NOT NULL, 
	email varchar(254) NOT NULL, 
	passkey varchar(50) NOT NULL,
	PRIMARY KEY (userId)
	);
 
 CREATE TABLE IF NOT EXISTS StoryUser(
	storyId INT NOT NULL,
    userId INT NOT NULL,
    StoryRole ENUM ('author', 'coauthor', 'player') NOT NULL,
    PRIMARY KEY (storyId, userId),
    FOREIGN KEY(userId) REFERENCES User(userId),
    FOREIGN KEY(storyId) REFERENCES Story(storyId)
 );
 
 
 
 
	