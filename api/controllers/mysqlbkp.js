'use strict';
const { query } = require('express');
/**Pool de conexão Mysql
* 
* Classe desenvolvida para criar um objeto de conexão MySQL
* @version v1.0.0
* Deselvolvido por: Daniel Proença
* Email: danielproenca89@gmail.com
*/

const mysql = require('mysql2');/*Importa o conector MySQL para NodeJS. Fonte: https://www.npmjs.com/package/mysql2 */
const servers = require('../data/querys.json');/*Importa o arquivo JSON contendo a configuração dos serivores que serão usados*/

module.exports = class Mysql{

   constructor(name){
        this.server = servers.routes.find(server => server.name === name);/*Procura dentro do JSON o objeto contendo a chave 'name'*/
        this.pool = {}
        this.config = {
        host: this.server.host,
        user: this.server.user,
        database: this.server.db,
        password: this.server.password,/*O objeto 'config' é montado com os dados passados por 'server'*/
        connectionLimit: 1
    }

   }
/*Metodo asíncrono 'getConn' retorna o objeto de conexão. o erro só será tratado posteriormente, ao chamar um dos métodos desse objeto*/
    async Post(params=null){
        this.pool = mysql.createConnection(this.config).promise();
        console.log("params" + params)
        console.log(this.server.query)
        const rows = await this.pool.query(this.server.query, params); 
        return rows;
    }


    async Kill(){
    try{
    await this.pool.end()
    }catch(e){
        console.error
    }
    }
}




/*Função assincrona responsável por passar o parâmetro 'name' para construção da conexão a partir dos dados configurados */

