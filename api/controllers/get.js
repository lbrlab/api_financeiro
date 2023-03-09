'use strict'

const Mysql = require('./mysqlbkp');


async function getResult(name, query){

    
    try {
        const db = new Mysql(name);
        const conn = db.getConn();
        
        const [result] = await conn.query(query);   
        await db.dead();  
        return result;
        
    } catch (error) {
        return error.message;
    }

}


module.exports = {getResult};
    




  