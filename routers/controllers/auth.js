// const db = require("./../../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require('mysql2/promise');

const authenticateBasic = async function (email, password) {
	const db = await mysql.createConnection({host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,});
  try {
    const query = `SELECT * FROM users WHERE email=?;`;
	const arr =[email]
    console.log("QUERY:", query);
	const [rows, fields]=await db.query(query, arr)
      console.log("rows:", rows);
      console.log("PASSWORD:", rows[0].password);
    
    const valid = await bcrypt.compare(password.toString(), rows[0].password);
    if (!valid) return ["The email doesn't exist", 404];
    if (valid) {
      const payload = {
		id:rows[0].id,
        firstName: rows[0].firstName,
        lastName: rows[0].lastName,
        age: rows[0].age,
		country:rows[0].country,
        role_id: rows[0].role_id,
        
      };
console.log("PAYLOAD:",payload);
      const options = {
        expiresIn: "100h",
      };
	  const tokenSign = [jwt.sign(payload, process.env.SECRET, options), 200];
	  console.log("TOKENSIGN:",tokenSign);
      return tokenSign
    }
    return ["The password you’ve entered is incorrect", 403];

  } catch (error) {
    throw new Error(error.message);
  }
 
};

const login = async(req, res) => {
	const { email, password } = req.body;
		const x =  await authenticateBasic(email,password)
		res.json(x)
		console.log("X:",x);
		
	};

module.exports = {
  login,
};
