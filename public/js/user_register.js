var uname=document.getElementById('uname');
				var upwd=document.getElementById('upwd');
				var upwd1=document.getElementById('upwd1');
				var email=document.getElementById('email');
				var phone=document.getElementById('phone');
				var btn=document.getElementById('btn');
				//2.绑定事件处理函数
				uname.onfocus=upwd.onfocus=upwd1.onfocus=email.onfocus=phone.onfocus=function(){
					var txt=this;
					var div=txt.nextElementSibling;
					txt.className="mar"
					div.className="fail";
				}
				function vali(txt,reg){
					var div=txt.nextElementSibling;
					if(reg.test(txt.value)==null){
						div.innerHTML='不能为空'
					}else if(reg.test(txt.value)==true){
						div.className="success";
					}else{
						div.className="err";
					}


				}
				//文本框
				uname.onblur=function(){
					vali(this,/^\w{6,15}$/);
				}
				//密码框
				upwd.onblur=function(){
					vali(this,/^\w{6,20}$/);
					var txt=this;

				}
				//确认密码
				upwd1.onblur=function(){
					var txt=this;
					var div=txt.nextElementSibling;
					var reg=/^\w{6,20}$/;
					if(reg.test(txt.value)==true && upwd1.value==upwd.value){
						div.className="success";
					}else{
						div.className="err";
						div.innerHTML="密码错误，请重新输入"
					}
				}
				//邮件
				email.onblur=function(){
					vali(this,/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/);
				}
				//电话
				phone.onblur=function(){
					vali(this,/^1[3-8][0-9]{9}$/)
						
				}

				
				
				function login(){
					var xhr=new XMLHttpRequest();
					xhr.onreadystatechange=function(){
						if(xhr.readyState==4 && xhr.status==200){
							var result=xhr.responseText;
							console.log(result)
							var div=btn.previousElementSibling
							if(result==1){
								div.style.color="#2ad181";
								div.innerHTML="注册成功，即将跳转到登录页";
								setTimeout(function () {
								window.location.href ='user_login.html';},2000)
								
							}
							
						}
					}
					var url='/user/register';
					xhr.open('post',url,true);
					xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				var formdata='uname='+uname.value+'&upwd='+upwd.value+'&upwd1='+upwd1.value+'&email='+email.value+'&phone='+phone.value;
					xhr.send(formdata);
}