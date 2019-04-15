const mysql=require('mysql');
//创建连接池,哪一个模块需要连接，只需引用此模块即可
var pool=mysql.createPool({
	host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME
});
//导出连接池
module.exports=pool;