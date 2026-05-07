import bcrypt from 'bcrypt';
import crypto from 'crypto';
import * as User from '../models/user.js';

let sessions = []


async function createSession(userId) {
    
    const sessionId = crypto.randomBytes(32).toString('hex')
    const session = { sessionId, userId }
    sessions.push(session)
    return sessionId
}

async function deleteSession(sessionId) {
    sessions = sessions.filter(session => session.sessionId !== sessionId)
}    


async function getSession(sessionId) {
    return sessions.find(session => session.sessionId === sessionId);
}

async function getSessions() {
    return sessions;
}




export {
    getSession,
    createSession,
    deleteSession,
    getSessions
    
}

    



