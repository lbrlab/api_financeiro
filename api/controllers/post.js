'use strict'

const Mysql = require('./mysqlbkp');


async function getResult(name, query, params = null){

    const request = params != null?Object.values(params):'';

    console.log(params)
    try {
        const db = new Mysql(name)
        const [result] = await db.Post(request);  
        await db.Kill() 
        
        return result;
        
    } catch (error) {
        console.log(error)
        console.error;
    }

}


module.exports = {getResult};
    




  