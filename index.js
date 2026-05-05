// import packages
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import ejs from "ejs";

//create express app
const app = express();
//port number
const port = 3000;

//create app middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//create database connection
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',  
    database: 'school',
    password: 'Benson6969$',
    port: 5432, // default PostgreSQL port
});

//Open Database bd connection 
pool.connect();

app.get("/", (req, res) => {
  res.send("Welcome to the School Management System API");
}); 

//create listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
