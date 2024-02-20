const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "linux",
  database: "Flyweight",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Conectar a la base de datos
pool.promise().execute('SELECT 1')
  .then(() => console.log('Conectado a la base de datos MySQL'))
  .catch((err) => {
    console.error('Error de conexión a la base de datos:', err);
    throw err;
  });

module.exports = pool.promise();

