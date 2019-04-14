const express=require('express');
//引入mysql数据库
const pool=require('../pool.js');
//创建空的路由器对象
var router=express.Router();
//添加路由
//1.检索用户 
router.get('/search',(req,res)=>{
	//获取数据
	var obj=req.query;
	//验证是否为空
	var $uid=obj.uid;
	if($uid==''){
		res.send({code:401,msg:'uid requied'});
		return;
	}
	//执行SQL语句
	pool.query('select * from sj_user where uid=?'
		,[$uid],(err,result)=>{
		if(err) throw err;
		//将查询结果发送到浏览器
		res.send(result);
	});
});
//2.用户注册
router.post('/register',(req,res)=>{
	//验证数据是否为空
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.phone;
	if($uname.length<6 || $uname.length>15){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if($upwd.length<6 || $upwd.length>20){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if($email.length<6 || $email>20){
		res.send({code:403,msg:'email required'});
		return;
	}
	if($phone.length!==11){
		res.send({code:404,msg:'phone required'});
		return;
	}
	//执行SQL语句，把数据(obj)插入到数据库中
	//注册成功：{code:200,msg:'reg suc'}
	var sql='insert into sj_user values(null,?,?,?,?)';
	pool.query(sql,[$uname,$upwd,$email,$phone],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}
	});
});
//3.用户登录
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if($uname.length<6 || $uname.length>15){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if($upwd.length<6 || $upwd.length>20){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	//执行SQL语句
	pool.query('select uid from sj_user where uname=? and upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			//用户登录成功
			//获取用户id
			var uid=result[0].uid;
//			console.log(uid)
			//保存session对象中
			req.session.uid=uid;
			res.send('1');
		}else{
			res.send('0');
		}
	})
});
//修改密码
router.post('/pwd',(req,res)=>{
	var uid=req.session.uid;
	var upwd=req.body.upwd;//原密码
	var upwd1=req.body.upwd1;//修改的密码
	var upwd2=req.body.upwd2;
		//拦截没有登录用户
	if(!req.session.uid){
		res.send("-1");
		return;
	}
	if(upwd1.length<6 || upwd1.length>20){
		res.send({code:402,msg:'密码错误'});
		return;
	}
	if(upwd1!=upwd2){
		res.send("-3");
		return;
	}
	//执行SQL语句
	var sql='select upwd from sj_user where uid=?';
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err;
//		console.log(result,result.upwd,result[upwd],upwd);
		//根据用户id查出来原密码与你输入的原密码比较，如果相同就修改原来的密码，如果不相同，返回一个数据，表示与原密码不同
		if(result[0].upwd == upwd){
			var sql=`update sj_user set upwd=${upwd1} where uid=${uid}`;
			pool.query(sql,(err,result)=>{
				if(result.affectedRows>0){
				  res.send('1');	
				}
			})
		}else{
			res.send("-2");
		}
	})
});
// 退出登录
router.get("/Logout",(req,res)=>{
    var uid=req.session.uid="";
	var sql="select * from sj_user where uid=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:"退出成功"});
    })
})

//添加地址
router.post('/address',(req,res)=>{
		//拦截没有登录用户
	if(!req.session.uid){
		res.send("-1");
		return;
	}
	var uid=req.session.uid;
	var rec=req.body.rec;
	var pro=req.body.pro;
	var city=req.body.city;
	var coun=req.body.coun;
	var add=req.body.add;
	var cell=req.body.cell;
	
	if(rec.length<2 || rec.length>6){
		res.send({code:401,msg:'收货人格式不正确'});
		return;
	}
	if(!pro){
		res.send({code:402,msg:'uid requied'});
		return;
	}
	if(!city){
		res.send({code:403,msg:'uid requied'});
		return;
	}
	if(!coun){
		res.send({code:404,msg:'uid requied'});
		return;
	}
	if(!add){
		res.send({code:405,msg:'uid requied'});
		return;
	}
	if(cell.length!=11){
		res.send({code:406,msg:'电话格式不正确'});
		return;
	}
	//执行SQL语句
	var sql='insert into sj_receiver_address values(null,?,?,?,?,?,?,?,null)';
	pool.query(sql,[uid,rec,pro,city,coun,add,cell],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}
		
	})
});

//查询收货地址列表
router.get("/getAddress",(req,res)=>{
	//拦截没有登录用户
	if(!req.session.uid){
		res.send("-1");
		return;
	}
    // 1.参数 uid 用于登录成功保存服务器
    // node.js 程序不是保存到脚手架
    // 服务器对象 session
    var uid=req.session.uid;
    // 2.sql
    var sql="select aid,user_id,receiver,province,city,county,address,cellphone from sj_receiver_address where user_id=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send(result);
      
    })
})

//功能十：删除收货地址列表
router.get("/removeAddress",(req,res)=>{
    var id=req.query.id;
    var sql="delete from sj_receiver_address where aid=?";
    id=parseInt(id);
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1")
        }
    })
}) 

module.exports=router;
