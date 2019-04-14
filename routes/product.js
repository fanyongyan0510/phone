
const express=require("express");
const pool=require("../pool.js");
var router=express.Router();
//1.搜索
router.get("/sousuo",(req,res)=>{
	var cname=req.query.cname;
	var sql="select * from sj_cellphone  where cname like ?";
	pool.query(sql,["%"+cname+"%"],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

router.get("/suo",(req,res)=>{
	var name=req.query.name;
	var sql="select l.lid,l.href,l.price,l.cname,p.md from sj_cellphone l,sj_cellphone_pic p where l.lid=p.cellphone_id and cname like ?";
	pool.query(sql,["%"+name+"%"],(err,result)=>{
		if(err) throw err;	
		res.send(result);
	})
})
//3.首页轮播广告
router.get("/carousel",(req,res)=>{
	var sql="select img,href from sj_index_carousel";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
});

//4.首页内容
router.get("/index",(req,res)=>{
	var sql="select * from sj_index_product";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})


//1.商品详情表
router.get("/details",(req,res)=>{
    var lid=req.query.lid;
    var output={
        product:{},
        specs:[],
        pics:[]
    }
	var sql="select * from sj_cellphone where lid=?";
    pool.query(sql,[lid],(err,result)=>{
    	output.product=result[0];
		var sql="select lid,spec,color from sj_cellphone where family_id=?";
		pool.query(sql,[result[0]["family_id"]],(err,result)=>{
    		if(err) console.log(err);
    		output.specs=result;
    		
			var sql="select * from sj_cellphone_pic where cellphone_id=?";
			pool.query(sql,[lid],(err,result)=>{
    			if(err) console.log(err);
				output.pics=result;
				res.writeHead(200,{
    				"Access-Control-Allow-Origin":"*"
				});
				res.write(JSON.stringify(output));
				res.end();
			})

		})
	})
})





//商品列表
// 用户get 请求路径/getProducts
router.get("/products",(req,res)=>{
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    // 2.为参数设置默认值
    if(!pno){
        pno=1;
    }
    if(!pageSize){
        pageSize=12;
    }
    // 3.创建sql语句
    var sql="select l.lid,l.href,l.price,l.cname,p.md from sj_cellphone l,sj_cellphone_pic p where l.lid=p.cellphone_id group by l.lid limit ?,?";
    // 3.1计算开始记录数，几条记录
    var offset=(pno-1)*pageSize;
    pageSize =parseInt(pageSize);
    // 4.执行sql语句
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
// 功能十二：用户点击添加购物车按钮
router.get("/addcart",(req,res)=>{
    // 0.向数据库xz_cart添加一列count INT
    //拦截没有登录用户
	if(!req.session.uid){
		res.send("-1");
		return;
	}
    var uid=req.session.uid;
    var pid=req.query.pid;
    var price=req.query.price; 
    var pname=req.query.pname;
    var count=req.query.count;
    // 1.获取参数uid pid pname price
    // 2.创建sql语句查询当前用户是否添加过此商品
    var sql="select iid from sj_shoppingcart_item where user_id=? and product_id=?";
    pool.query(sql,[uid,pid],(err,result)=>{
        if(err) throw err
        if(result.length==0){
            // 3.创建sql语句如果没有查询结果添加此商品
            var sql=`insert into sj_shoppingcart_item values(null,${uid},${pid},'${pname}',${price},${count},null)`;
        }else{
            // 4.创建sql语句如果有结果更新数量
            var sql=`update sj_shoppingcart_item set count=count+1 where user_id=${uid} and product_id=${pid}`;
        }
        pool.query(sql,(err,result)=>{  
          	if(err) throw err;
         		res.send("1");
        })
    })   
})

//功能九：查询购物车列表
router.get("/getShopCart",(req,res)=>{
	//拦截没有登录用户
	if(!req.session.uid){
		res.send({code:-1,data:[],msg:"请登录"});
		return;
	}
    // 1.参数 uid 用于登录成功保存服务器
    // node.js 程序不是保存到脚手架
    // 服务器对象 session
    var uid=req.session.uid;//后面替换
    // 2.sql
    var sql="select iid,product_id,price,user_id,pname,count from sj_shoppingcart_item where user_id=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//功能十：删除购物车中某个商品
router.get("/removeItem",(req,res)=>{
    var id=req.query.id;
   	var sql="delete from sj_shoppingcart_item where iid=?";
    id=parseInt(id);
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1")
        }
       
    })
}) 

// 功能十一：删除用户选中的多个商品
router.get("/removeMItem",(req,res)=>{
    var ids=req.query.ids;
    var sql ="delete from xz_cart where id in("+ids+")";
    pool.query(sql,(err,result)=>{
        if(err) throw err
        if(result.affectedRows>0){
            res.send("1")
        }else{
            res.send("0")
        }
    })
})

module.exports=router;