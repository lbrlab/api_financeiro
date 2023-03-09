const mysql = require('mysql2');


(async () => {
  let pool = mysql
    .createPool({
      host: '194.195.86.239',
      user: 'root',
      password: 'rosacruz89D',
      database:'sigaapi',
      connectionLimit: 10,
    })
    .promise();
 
    let rows = await pool.query('SELECT * from agendamento');
    console.log(rows[0])
  
  pool.end();
})();