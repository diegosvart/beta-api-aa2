import "dotenv/config" //Carga variables globales
import { createPool } from "mysql2/promise";

const DB_HOST =  process.env.QA_DB_HOST;
const DB_USER =  process.env.QA_DB_USER;
const DB_PASS =  process.env.QA_DB_PASS;
const DB_NAME =  process.env.QA_DB_NAME;

export async function connect(){
    const connection = await createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        connectionLimit: 10
    })
    
    console.log('conectado a DB');

    return connection;
}

//const CNX = `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
//DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
//const dbConn = createPool(CNX);
//export default dbConn;
//const [rows, fields] = await connection.execute('SELECT * FROM tabla');
//console.log(rows); // muestra los resultados de la consulta
//export default mySqlConn
