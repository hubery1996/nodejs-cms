var express = require('express');
var router = express.Router();
// 数据库
var pool = require('../config/mysql').pool;
// 注册
router.post('/register', function (req, res) {
	var sql = "INSERT into users (username,`password`,fullname,tel) VALUES (?,?,?,?)";
	// 获取前台的数据
	pool.query(sql, [req.body.username, req.body.password, req.body.fullname, req.body.tel], function (error, results, fields) {
		if(error){
			console.log(error);
			return;
		}
		console.log(results);
		res.json({
			status: true,
			msg: "注册成功了！"
		});
	});

});
// 登陆
router.post('/login', function (req, res) {
	// 定义sql查询语句
	var sql = "SELECT * FROM users WHERE username = ? AND `password` = ?"
	// 获取前台数据
	pool.query(sql, [req.body.username, req.body.password], function (error, results) {
		console.log(results);

		if (results.length > 0) {
			res.json({
				status: true,
				msg: "登陆成功！",
				//登陆成功返回信息，results是一个数组使用所以data
				uid: results.user_id
			});
		} else {
			res.json({
				status: false,
				msg: "登陆失败！"
			});
		}


	})


});
/* GET users listing. */
// 获取用户资料 判断id=?
var users = [{
	id: 1,
	username: "黄小米",
	age: 28
}, {
	id: 2,
	username: "黄渤",
	age: 45
}]
router.get('/info', function (req, res, next) {
	var sql = 'SELECT username,fullname,tel FROM users WHERE user_id = 1';
	pool.query(sql, [req.query.user_id], function (error, results) {
		console.log(error, results);
		if (results.length == 0) {
			res.json({
				status: false,
				msg: "查无此人"
			})
			return;
		}

		res.json({
			status: true,
			// results数数组格式
			date: results[0]
		})

	})

});
// 修改资料
// 不允许编辑id,只能修改username 和 name，再把修改后的个人资料发送到客户端
router.post('/edit', function (req, res, next) {
	var sql = "UPDATE users set username= ?,fullname = ?,tel = ? where user_id = ?"
	pool.query(sql, [req.body.username, req.body.fullname, req.body.tel, req.body.user_id], function (error, results) {
		console.log(results);
		if (results.affectedRows == 0) {
			res.json({
				status: false,
				msg: "修改失败，请填写完整",
				data: results[0]
			})
			return;
		} else {
			res.json({
				status: true,
				msg: "修改成功"
			})
		}

	})

});
// 删除账户
router.post('/delete', function (req, res, next) {
	var sql = "DELETE FROM users WHERE user_id = ?";
	pool.query(sql, [req.body.user_id], function (error, results) {
		console.log(results,error);
		if (results.affectedRows == 0) {
			res.json({
				status: flase,
				msg: "删除账户失败"
			})
			return;
		} else {
			res.json({
				status: true,
				msg: "删除账户成功"
			})
		}
	})



})
// 获取所有用户列表
router.get('/all_user', function (req, res, next) {
	var sql = 'SELECT user_id,username,fullname,tel FROM users';
	pool.query(sql, function (error, results) {
		if (results.length == 0) {
			res.json({
				status: flase,
				msg: "查询失败，请重试"
			})
			return;
		} else {
			res.json({
				status: true,
				msg: "查询成功",
				data:results
			})
		}
	})
})




module.exports = router;