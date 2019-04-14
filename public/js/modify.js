//个人中心
//点击左侧列表，右边显示相对应的内容
var tabs=document.querySelectorAll("[data-toggle=tab]");
	for(var tab of tabs){
		tab.onclick=function(){
			var tab=this;
			var id=tab.getAttribute("data-target");
			var disp=document.getElementById(id);
			var divop=document.querySelector('div#right>div.op');
			// 如果找到就将其他开着的span关闭
			if(divop!=null){
				divop.className='no';
			}
				disp.className='op';
		}
	}

			//左侧列表
			//1.查找触发事件的元素
	// 查找class为tree的ul下的li下单所有h3
	var hs=document.querySelector("[data-open=open]");
		hs.onclick=function(){
			var hs=this;
			if(hs.className=="open"){
				hs.className="";
			}else{
				hs.className='open';
			}
			
	  }
			
			
			
	var cities=[
		[{"name":'南阳市',"value":303},
		{"name":'郑州市',"value":301},
		{"name":'洛阳市',"value":302},
		{"name":'平顶山市',"value":304}],		       
		[{"name":'东城区',"value":101},
		{"name":'西城区',"value":102},
		{"name":'海淀区',"value":103},
		{"name":'朝阳区',"value":104}],
		       
		[{"name":'河东区',"value":201},
		{"name":'河西区',"value":202},
		{"name":'南开区',"value":203}],
		       
		[{"name":'石家庄市',"value":301},
		{"name":'廊坊市',"value":302},
		{"name":'保定市',"value":303},
		{"name":'唐山市',"value":304},
		{"name":'秦皇岛市',"value":305}]
	];
	var citie=[
		[{"name":'唐河',"value":301},
		{"name":'方城',"value":302},
		{"name":'社旗',"value":303},
		{"name":'平顶山市',"value":304}],
	]
			
	//省
	// 1.查找触发事件的元素
var pro=document.getElementsByName('provs')[0];
	// 2.绑定事件处理函数
	pro.onchange=function(){
		// 3.查找要修改的元素:第二个select
		var cits=document.getElementsByName('cities')[0];
		// 4.修改元素
		var pro=this;
		var i=pro.selectedIndex;//自动获取当前元素的下标
		if(i>0){
		//如果不-1，当页面点开时在点击‘请选择’无效
			var city=cities[i-1];
			// 创建一个文档片段对象
			var fa=document.createDocumentFragment();
			// 先创建一个<option>  -请选择- 在二级列表中
			fa.appendChild(new Option("-市-"));
			// 遍历
			for(var cit of city){
				// 每遍历一个城市，就创建一个option，并加入frag中
				fa.appendChild(new Option(cit.name));
			}
			// 每次添加新的option之前，先清除旧的内容
			cits.innerHTML='';
			// 当点击‘省份’时，就自动在二级下拉列表--select中添加文档片段对象frag
			cits.appendChild(fa);
			//  当点击‘省份’时下拉列表出来
			cits.className='';
			     
		}else{
			// 当点击‘请选择’时，二级下拉列表应该隐藏
			cits.className='hide';
			     
		}  
			    
			    
			    
		//县
		// 2.绑定事件处理函数
		cits.onchange=function(){
			// 3.查找要修改的元素:第二个select
			var cits=document.getElementsByName('cities')[1];
			// 4.修改元素
			var pro=this;
			var i=pro.selectedIndex;//自动获取当前元素的下标
			if(i>0){
			    //如果不-1，当页面点开时在点击‘请选择’无效
			    var ci=citie[i-1];
			    // 创建一个文档片段对象
			    var fa=document.createDocumentFragment();
			    // 先创建一个<option>  -请选择- 在二级列表中
			    fa.appendChild(new Option("-县-"));
			    // 遍历
			    for(var cit of ci){
			       // 每遍历一个城市，就创建一个option，并加入frag中
			       fa.appendChild(new Option(cit.name));
			    }
			    // 每次添加新的option之前，先清除旧的内容
			    cits.innerHTML='';
			    // 当点击‘省份’时，就自动在二级下拉列表--select中添加文档片段对象frag
			    cits.appendChild(fa);
			      	//  当点击‘省份’时下拉列表出来
			   		cits.className='';
			     
			}else{
			    // 当点击‘请选择’时，二级下拉列表应该隐藏
			    cits.className='hide';
			     
			}   
	  	} 
	} 
			

//收货地址
var input=document.querySelector("[data-input=input]");
var rec=document.getElementById("name");
var cell=document.getElementById("phone");
var addRess=document.getElementById("address2");
var pro=document.getElementById("select");
var city=document.getElementById("select2");
var coun=document.getElementById("select3");
function tips(){
	rec.onfocus=cell.onfocus=addRess.onfocus=pro.onfocus=city.onfocus=coun.onfocus=function(){
		var txt=this;
		var div=txt.nextElementSibling;
		div.innerHTML=""
	}
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
		var reg=/^[a-zA-Z0-9]|[\u4e00-\u9fa5]|[0-9]$/;
		if(reg.test(txt.value)!=true){
			if(addRess.value==""){
				div.innerHTML="不能为空"
			}else{
				div.innerHTML="格式不正确"
			}
		}
							
	}
}
tips();
//添加收货地址，点击清空按钮
var kong=document.querySelector("[data-kong=kong]");
kong.onclick=function(){
	var qings=document.getElementById("every").getElementsByTagName("input");
	var ss=document.getElementById("every").getElementsByTagName("option:not(#option)");
	for(var qing of qings){
		qing.value="";
	}
	for(var s of ss){
		s.innerHTML="";
	}
}
//添加收货地址
function address(){
	console.log(1111)
	//1.创建异步对象
	var xhr=new XMLHttpRequest();
	//2.绑定监听
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var result=xhr.responseText;
			var pwdsucce=document.getElementById("every").lastElementChild;
			var pwddi=pwdsucce.children[0];
			var pwdLogi=pwddi.children[1].children[0];
			var p=pwddi.children[0];
			if(result==1){
				if(rec.value=="" || cell.value=="" || addRess.value==""){		
					var div=addRess.nextElementSibling;
					div.innerHTML="不能为空";
				}else if(false){
					var div=addRess.nextElementSibling;
					div.innerHTML="格式错误";	
				}else{
					pwdsucce.className="opacitys";
					pwddi.style.display="block";
					pwdLogi.onclick=function(){
						pwdsucce.className="";
						pwddi.style.display="none";
						location.reload();
					}
				}	
			}else if(result==-1){
				pwdsucce.className="opacitys";
				pwddi.style.display="block";
				p.innerHTML="未登录，登录后方能添加收货地址"
				pwdLogi.onclick=function(){
					pwdsucce.className="";
					pwddi.style.display="none";
					location.reload();
				}
				
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
            //轮播
          for(var i=0;i<result.length;i++){
          	var p=result[i];
          		  	html+=`	<table>
						<tbody>
							<tr data-id='${p.aid}' id='su' >
								<td>${p.receiver}</td>
								<td>${p.province}${p.city}${p.county}${p.address}</td>
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
				if(result.length==1){
					
					// alert("删除成功");
				}         
			}
		} 
		xhr.open('get','/user/removeAddress?id='+id,true);
		xhr.send();
	}
	removeAdd();	
}



//修改密码
var upwd=document.getElementById('upwd');
var upwd1=document.getElementById('upwd1');
var upwd2=document.getElementById('upwd2');
var alert3=upwd.nextElementSibling;
var alert1=upwd1.nextElementSibling;			
var alert2=upwd2.nextElementSibling;	
var bok=document.querySelector("[data-bok=bok]");
//修改密码，点击取消按钮
var btn=document.querySelector("[data-btn=btn]");
bok.onclick=btn.onclick=function(){
	var inputs=document.getElementById("pwd").getElementsByTagName("input");
	for(var input of inputs){
		input.value="";
	}
}	
function modify(){
	upwd.onfocus=upwd1.onfocus=upwd1.onfocus=function(){
		alert3.innerHTML="";
		alert1.innerHTML="";
		alert2.innerHTML="";
	}
				//密码框
	upwd1.onblur=function(){
		var txt=this;
		var reg=(/^\w{6,20}$/);
		if(reg.test(txt.value)==true){
			alert1.innerHTML="";
		}else{
			alert1.innerHTML="密码由6-20位数字、字母或符号组成";
		}
					
	}
	upwd2.onblur=function(){
		var txt=this;
		var reg=(/^\w{6,20}$/);
		if(reg.test(txt.value)==true && upwd1.value==upwd2.value){
			alert2.innerHTML="";
		}else{
			alert2.innerHTML="新密码两次输入不一致"
		}
	}
}
modify();						

function add(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
            var result=JSON.parse(xhr.responseText);
            modify();
			var pwdsuccess=document.getElementById("pwd").lastElementChild;
			var pwddis=pwdsuccess.children[0];
			var pwdLogin=pwddis.children[1].children[0];
			var ps=pwddis.children[0];
			if(result==1){
				pwdsuccess.className="opacity";
				pwddis.style.display="block";
				pwdLogin.onclick=function(){
					pwdsuccess.className="";
					pwddis.style.display="none";
					
				}
			}else if(result==-1){
				pwdsuccess.className="opacity";
				pwddis.style.display="block";
				ps.innerHTML="未登录，登录后方能修改密码"
				pwdLogin.onclick=function(){
					pwdsuccess.className="";
					pwddis.style.display="none";
					
				}	
			}else if(result==-2){
				if(upwd.value==""){
					alert3.innerHTML="旧密码不能为空";
				}else{
					alert3.innerHTML="旧密码输入不正确";
				}
			}else if(result==-3){
				alert2.innerHTML="两次密码输入不一致"
			}			
		}
	}
	var url='/user/pwd';
	xhr.open('post',url,true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var formdata='upwd='+upwd.value+'&upwd1='+upwd1.value+'&upwd2='+upwd2.value;
	xhr.send(formdata);
}
window.onload=function(){
	bok.onclick=function(){
		add();
	}
}
