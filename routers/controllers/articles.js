const db = require("./../../db/db");

const getAllArticles = (req, res) => {
  const query = `SELECT * FROM articles;`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
};

const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;
  const query = `SELECT * FROM articles WHERE author=${author};`;
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
  const { title, description, author } = req.body;

  const article = new articlesModel({
    title,
    description,
    author,
  });

  article
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateAnArticleById = (req, res) => {
  const id = req.params.id;

  articlesModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
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
