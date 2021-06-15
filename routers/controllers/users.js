const db = require("./../../db/db");
const bcrypt = require("bcrypt");
//console.log("AAAAAAAAAAAA")
const createNewAuthor =async (req, res) => {
try{	
  const password1 = req.body.password;
  console.log(password1)
  const hashPassword = await bcrypt.hash(password1.toString(), 10);
  console.log("AAAAAAAAAAAA")
  //   const { firstName, lastName, age, country, email, role_id } = req.body;
  const firstName =req.body.firstName;
  const lastName =req.body.lastName;
  const age =req.body.age;
  const country =req.body.country;
  const email =req.body.email;
  const role_id =req.body.role_id;
   console.log(hashPassword);
  const password = hashPassword;
  const query = `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) 
  VALUES (?, ?, ?, ?,?, ?, ?)`;
  const data = [
	  firstName,
	  lastName,
	  age,
	  country,
	  email,
	  password,
	  role_id
	];
	db.query(query, data, (err, result) => {
	  console.log(hashPassword);
    if (err) throw err;
	console.log(err);
    console.log("RESULT:", result);
    res.json(result.data);
  });}
  catch(err){
	  console.log(err);
  }
};

module.exports = {
  createNewAuthor,
};
