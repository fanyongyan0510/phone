const mysql=require('mysql');
//创建连接池,哪一个模块需要连接，只需引用此模块即可
var pool=mysql.createPool({
	host:'127.0.0.1',
	port:3306,
	user:'root',
	password:'',
	database:'sj',
	connectionLimit:20
});
//导出连接池
module.exports=pool;