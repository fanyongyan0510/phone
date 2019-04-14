//收货地址

var input=document.querySelector("[data-input=input]");
var rec=document.getElementById("name");
var cell=document.getElementById("phone");
var addRess=document.getElementById("address2");
var pro=document.getElementById("select");
var city=document.getElementById("select2");
var coun=document.getElementById("select3");
function tips(){


	//收件人
	rec.onblur=function(){
		var txt=this;
		var div=txt.nextElementSibling;
		var reg=/^[\u4e00-\u9fa5]{2,6}$/;
		if(reg.test(txt.value)!=true){
			if(rec.value==""){
				div.innerHTML="不能为空"
			}else{
				div.innerHTML="格式不正确"
			}
		}
							
	}
	//电话
	cell.onblur=function(){
		var txt=this;
		var div=txt.nextElementSibling;
		var reg=/^1[3-8][0-9]{9}$/;
		if(reg.test(txt.value)!=true){
			if(cell.value==""){
				div.innerHTML="不能为空"
			}else{
				div.innerHTML="格式不正确"
			}
		}
							
	}
	//省
	pro.onblur=function(){
		var txt=this;
		var div=txt.nextElementSibling;
			if(pro.value==""){
				div.innerHTML="不能为空"
			}
		
							
	}
	//市
	city.onblur=function(){
		var txt=this;
		var div=txt.nextElementSibling;
			if(city.value==""){
				div.innerHTML="不能为空"
			}					
	}
	//县
	coun.onblur=function(){
		var txt=this;
		var div=txt.nextElementSibling;
			if(coun.value==""){
				div.innerHTML="不能为空"
			}
							
	}
	//详细地址
	addRess.onblur=function(){
		var txt=this;
		var div=txt.nextElementSibling;
		var reg=/^[a-zA-Z0-9\u4e00-\u9fa5]$/;
		if(reg.test(txt.value)!=true){
			if(addRess.value==""){
				div.innerHTML="不能为空"
			}else{
				 div.innerHTML="格式不正确"
			}
		}
							
	}
}
//添加收货地址
function address(){
	//1.创建异步对象
	var xhr=new XMLHttpRequest();
	//2.绑定监听
	var div=addRess.nextElementSibling;
	console.log(div)
	console.log(3333333)
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var result=xhr.responseText;
			var pwdsucce=document.getElementById("every").lastElementChild;
			var pwddi=pwdsucce.children[0];
			var pwdLogi=pwddi.children[1].children[0];
			if(result.length>0){
				pwdsucce.className="opacitys";
				pwddi.style.display="block";
				pwdLogi.onclick=function(){
					pwdsucce.className="";
					pwddi.style.display="none";
					location.reload();
				}
			}else{		
				var div=addRess.nextElementSibling;
				div.innerHTML="不能为空";
			}
			
		}
	}
	//3.打开连接，创建请求
	xhr.open('post','/user/address',true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var formhtml='rec='+rec.value+'&pro='+pro.value+'&city='+city.value+'&coun='+coun.value+'&add='+addRess.value+'&cell='+cell.value;
	//4.发送请求
	xhr.send(formhtml);
}
//获取收货地址到页面上
function ress(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=JSON.parse(xhr.responseText);
            var html="";
          for(var i=0;i<result.length;i++){
          	var p=result[i];
          		  	html+=`	<table>
						<tbody>
							<tr data-id='${p.aid}' id='su' >
								<td>${p.receiver}</td>
								<td>${p.province}${p.city}${p.county}</td>
								<td>${p.cellphone}</td>
								<td data-X="X" data-id="${p.aid}" data-idx="i" onclick='fun()'>X</td>
							</tr>
						</tbody>
					</table>`
        
          }
          document.getElementById("data-content").innerHTML=html; 
          	
        }
    }   
    xhr.open('get','/user/getAddress',true);
    xhr.send();
}
ress();
	input.onclick=function(){
		tips();
		address();
		
		
	}
	//删除收货地址
function fun(){
	var a=document.getElementById('su')
    var c=a.lastElementChild
	var id=a.getAttribute('data-id');
	function removeAdd(){
		location.reload();
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				var result=JSON.parse(xhr.responseText);  
			}
		} 
		xhr.open('get','/user/removeAddress?id='+id,true);
		xhr.send();
	}
	removeAdd();	
}
//获取收货地址到页面上
var tdd=document.querySelector("#data-content td>:last-child")

