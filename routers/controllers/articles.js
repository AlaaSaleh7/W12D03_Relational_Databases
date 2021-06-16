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

  
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;

  articlesModel
    .findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Success Delete atricle with id => ${id}`,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;

  articlesModel
    .deleteMany({ author })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Success Delete atricle with id => ${author}`,
      });
    })
    .catch((err) => {
      res.send(err);
    });
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
