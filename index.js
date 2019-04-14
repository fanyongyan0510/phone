const express=require('express');
//引入第三方中间件
const bodyParser=require('body-parser');
//引入用户路由器
const userRouter=require('./routes/user.js');
//引入商品路由器
const produceRouter=require("./routes/product.js");
//创建web服务器
var server=express();
server.listen(5050);
//托管静态资源到public下，
server.use(express.static('./public'));
//配置中间件
server.use(bodyParser.urlencoded({
	extended:false
}));
//3.11 引用session
const session=require("express-session")
//3.11 配置session信息
server.use(session({
    secret:"128为随机字符串",      //128为随机字符串  安全字符串
    resave:false,       //每次请求更新session值
    saveUninitialized:true,     //初始化保存数据
    cookie:{
        maxAge:1000*60*60          //cookie辅助session工作
    }
}))
//使用路由器管理路由
//把用户路由器挂载到user下
server.use('/user',userRouter);
//把商品路由器挂载到produce下
server.use('/product',produceRouter);
