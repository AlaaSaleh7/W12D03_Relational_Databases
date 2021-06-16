const db = require("./../../db/db");

const getAllArticles = (req, res) => {
  const query = `SELECT * FROM articles;`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log("RESULT:",result);
    res.json(result);
  });
};

const getArticlesByAuthor = (req, res) => {
  const id = req.query.author_id;
  const query = `SELECT * FROM articles WHERE author_id=${id};`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const getAnArticleById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM articles WHERE id=${id};`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const createNewArticle = (req, res) => {
  const { title, description,author_id} = req.body;
  const query = `INSERT INTO articles (title,description, author_id) 
  VALUES (?, ?, ?)`
  const arr =[title, description,author_id]
db.query(query,arr,(err,result)=>{
if(err)throw err;
res.json(result)
})
};


const updateAnArticleById = (req, res) => {
  const id = req.params.id;
  const { title,  author_id, description} = req.body;
  const query = `UPDATE articles SET title=?, author_id=?, description=?
  WHERE id=${id}`
  const arr =[title,  author_id, description]
db.query(query,arr,(err,result)=>{
  if(err)throw err;
  res.json(result)
})
  
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;
const query = `UPDATE articles SET is_deleted =1
WHERE id=${id}`
  db.query(query,(err,result)=>{
    if(err)throw err;
    res.json(result);
  })
};

const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author_id;
const query = `UPDATE articles SET is_deleted =1
WHERE author_id=${author}`
   db.query(query,(err,result)=>{
     if(err)throw err;
res.json(result);
   })
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
