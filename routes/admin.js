var express = require('express');
var router = express.Router();
// 数据库
var pool = require('../config/mysql').pool;
// 添加分类
router.post("/category/add", function (req, res) {
    var sql = "INSERT into category (name,parent_id) VALUES (?,?)"
    pool.query(sql, [req.body.name, req.body.parent_id], function (error, results) {

        res.json({
            status: true,
            msg: "添加成功"
        })

    });

});
// 获取所有的分类
router.get("/category/all", function (req, res) {
    var sql = "SELECT c1.*,c2.`name` AS parent_name FROM `category` c1 left JOIN category c2 ON c1.parent_id = c2.category_id";
    pool.query(sql, function (error, results) {
        console.log(error, results);

        if (results.affectedRows == 0) {
            res.json({
                status: false,
                msg: "获取失败"
            })

        }
        res.json({
            status: true,
            msg: "获取成功",
            data: results
        })

    })


});
// 获取一级分类
router.get("/type", function (req, res) {
    var sql = "SELECT * FROM category WHERE parent_id = 0";
    pool.query(sql, function (error, results) {
        console.log(results);
        res.json({
            status: true,
            msg: "查询成功",
            data: results
        })

    })


})
// 获取指定id的分类
router.get("/category/detail", function (req, res) {
    var sql = "SELECT * FROM category WHERE category_id= ?";
    pool.query(sql, [req.query.category_id], function (error, results) {
        console.log(error, results)
        if (results.affectedRows == 0) {
            res.json({
                status: false,
                msg: "获取失败"
            })

        }
        res.json({
            status: true,
            msg: "获取成功",
            data: results
        })

    })
})

// 删除指定的分类id对应的数据
router.post("/category/delete", function (req, res, next) {
    var sql = "DELETE FROM category WHERE category_id= ?";
    pool.query(sql, [req.body.category_id], function (error, results) {
        if (results.length == 0) {
            res.json({
                status: false,
                msg: "删除分类失败"
            })
            return;
        } else {
            res.json({
                status: true,
                msg: "删除分类成功"
            })
        }
    })
})
// 编辑分类
router.post("/category/edit", function (req, res, next) {
    var sql = "UPDATE category set name = ?,parent_id = ? where category_id = ?";
    pool.query(sql, [req.body.name, req.body.parent_id, req.body.category_id], function (error, results) {
        console.log(error, results)
        if (results.affectedRows == 0) {
            res.json({
                status: false,
                msg: "修改失败，请重新尝试",
                data: results
            })
            return false;
        }

        res.json({
            status: true,
            msg: "修改成功",
            data: results
        })

    });
});




module.exports = router;