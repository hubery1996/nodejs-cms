var express = require('express');
var router = express.Router();
// 数据库
var pool = require('../config/mysql').pool;
// 添加文章
router.post('/add', function (req, res) {
    var sql = "INSERT into article (title,description,category_id,images,content,create_date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)";
    pool.query(sql, [req.body.title, req.body.description, req.body.category_id, req.body.images, req.body.content], function (error, results) {
        console.log(results, error);

        if (results.length == 0) {
            res.json({
                status: false,
                msg: "添加失败"
            });
        } else {
            res.json({
                status: true,
                msg: "添加成功"
            });
        }

    })
});
// 获取指定分类下的文章列表
router.get('/list_by_id', function (req, res) {
    var sql = "SELECT * FROM `article` where article_id =?";
    pool.query(sql, [req.query.article_id], function (error, results) {
        console.log(error, results);
        if (results.length == 0) {
            res.json({
                status: false,
                msg: "查询失败"
            });
        } else {
            res.json({
                status: true,
                msg: "查询成功",
                data: results
            });
        }
    })
})
// 获取所有的文章列表
router.get('/list', function (req, res) {
    var sql = "SELECT * FROM `article`";
    pool.query(sql, function (error, results) {
        console.log(error, results);
        if (results.length == 0) {
            res.json({
                status: false,
                msg: "查询失败"
            });
        } else {
            res.json({
                status: true,
                msg: "查询成功",
                data: results
            });
        }
    });
});
// 获取的所有文章列表按时间排序,并分页
router.get('/list_by_time', function (req, res) {
    var pagesize = 20;
    var pageindex = 0;
    var offset = pagesize * (pagesize - 1);
    var sql = 'SELECT a.category_id AS category_id,b.name ,article_id,title,description,images,content,author,DATE_FORMAT(create_date,"%Y-%m-%d %T") AS create_time , DATE_FORMAT(update_date,"%Y-%m-%d %T") AS update_time   FROM article a INNER JOIN category b ON a.category_id = b.category_id ORDER BY create_date DESC, update_date DESC LIMIT ? OFFSET ?';
    pool.query(sql, [pagesize, pageindex], function (error, results) {
        console.log(error, results);
        res.json({
            status: true,
            msg: "查询成功",
            data: results
        });

    })
})


// 修改文章
router.post('/edit', function (req, res) {
    var sql = "UPDATE article SET title = ?,description = ?,category_id =?,images = ?, content = ? WHERE article_id = ?";
    pool.query(sql, [req.body.title, req.body.description, req.body.category_id, req.body.images, req.body.content, req.body.article_id], function (error, results) {
        console.log(error, results);
        if (results.length == 0) {
            res.json({
                status: false,
                msg: "修改失败"
            });
        } else {
            res.json({
                status: true,
                msg: "修改成功"
            });
        }
    });
});

//删除文章
router.post('/delete', function (req, res) {
    var sql = "DELETE FROM article WHERE article_id = ?";
    pool.query(sql, [req.body.article_id], function (error, results) {
        console.log(error, results);
        if (results.affectedRows == 0) {
            res.json({
                status: false,
                msg: "删除失败"
            });
        } else {
            res.json({
                status: true,
                msg: "删除成功！请核对后再输入"
            });
        }
    });

});
module.exports = router;