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
app.set("view engine", "ejs");
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

// Ensure the contact table exists before accepting submissions
const initDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contact (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`;
  await pool.query(createTableQuery);
};

initDatabase().catch((err) => {
  console.error("Failed to initialize database:", err);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
}); 

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/contact", async (req, res) => {
  const { name, email, text } = req.body;

  if (!name || !email || !text) {
    return res.render("contact.ejs", {
      error: "Please fill out all fields before submitting.",
    });
  }

  try {
    await pool.query(
      "INSERT INTO contact (name, email, message) VALUES ($1, $2, $3)",
      [name, email, text]
    );

    res.render("contact.ejs", {
      success: "Thank you! Your message has been saved.",
    });
  } catch (err) {
    console.error("Error saving contact submission:", err);
    res.render("contact.ejs", {
      error: "Something went wrong. Please try again later.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
