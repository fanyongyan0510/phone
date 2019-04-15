var uname=document.getElementById("uname");
			var upwd=document.getElementById("upwd");
			var btn=document.getElementById("button");
			var div=btn.previousElementSibling;
			uname.onfocus=upwd.onfocus=function(){
				div.innerHTML="";
            }
            var log=document.getElementById("login")
        log.onclick=function(){
				
					//1.创建异步对象
					var xhr=new XMLHttpRequest();
					//2.绑定监听
					xhr.onreadystatechange=function(){
						if(xhr.readyState==4 && xhr.status==200){
							var result=xhr.responseText;
							
							if(result==1){
								div.style.color="#2ad181";
								div.innerHTML="欢迎登陆";
								setTimeout(function () {
									window.location.href ='index.html';
								},2000);
								//获取用户输入的用户名
								var u=uname.value;
								//保存sessionStorage
								sessionStorage.setItem("uname",u);
							}else{
								div.style.color="red";
								div.innerHTML='账号或密码错误'
							}
						}
					}
					//3.打开连接，创建请求
					xhr.open('post','/user/login',true);
					xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
					var formhtml='uname='+uname.value+'&upwd='+upwd.value;
					//4.发送请求
					xhr.send(formhtml);
        }
