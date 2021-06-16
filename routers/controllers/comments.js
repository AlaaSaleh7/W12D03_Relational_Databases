const { db } = require('./../../db/models/comments');
const commentsModel = require('./../../db/models/comments');

const createNewComment = (req, res) => {
	// const {comment,article_id,commenter_id} =req.body
	// const query=`INSERT INTO comments (comment,article_id,commenter_id) 
	// VALUES (?, ?, ?)`
	// const arr =[comment,article_id,commenter_id];
	// db.query(query,arr,(err,result)=>{
	// 	if(err)throw err;
	// 	res.json(result)
	// })

};

module.exports = {
	createNewComment,
};
