//购物车
var aa=document.getElementById('aa');
function cart(){
	var btn=document.getElementById("button");
	//1.创建异步对象
	var xhr=new XMLHttpRequest();
	//2.绑定监听
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var result=JSON.parse(xhr.responseText);
				var p=result[0];				
				var html=`
				<div>
					<input type="checkbox" />
					<span class="all">全选</span>
				</div>
				<ul>
					<li>商品</li>
					<li>单价</li>
					<li>数量</li>
					<li>小计</li>
					<li>操作</li>
				</ul>`
				var div1=document.getElementById("cart").firstElementChild.innerHTML=html;
				var html=""
				for(var i=0;i<result.length;i++){
					var p=result[i]
					html+=`
                		<ul data-id="${p.iid}" id="remove-li" class="us">
                			<li><input type="checkbox" /></li>
	                		<li>${p.pname}</li>
	                		<li>¥${p.price.toFixed(2)}</li>
	                		<li>
	                			<button>-</button>
            					<span>${p.count}</span>
            					<button>+</button>
            				</li>
            				<li>¥${p.price.toFixed(2)}</li>
	                		<li  onclick="removeli()" :data-idx="i" :data-idx="lid.id">
	                		删除
	                		</li>	                		
                		</ul>`
				}
                	 
                	var div2=document.getElementById("cart").children[1].innerHTML=html;
            var html=`
                
                <div class="total">
					<span>总计:¥0.00</span>
					<div>
						<a href="">立即结算</a>
					</div>		
                </div>`
			
			var div3=document.getElementById("cart").children[2].innerHTML=html;	
			//修改购买数量
				var cart=document.getElementById("cart");
			
			var buttons=cart.getElementsByTagName("button");
			
			//数据库里同一商品数量的总价钱
			function count(){
				for(var button of buttons){
				var spans=button.parentElement.children[1];
				var count=parseFloat(button.parentElement.previousElementSibling.innerHTML.slice(1));
					
					//获得span中的数字
				var nn=parseInt(spans.innerHTML);
				
				var subs=button.parentElement.nextElementSibling.innerHTML="¥"+count*nn.toFixed(2);	
					
				}	
			}
			count();
			//点击button按钮修改购买数量，并把小计和总价更改
			var tds=[];
			for(var button of buttons){
				button.onclick=function(){
					
					var btn=this;
					//找到span
					var span=btn.parentElement.children[1];
					var count=parseFloat(btn.parentElement.previousElementSibling.innerHTML.slice(1));
					
					//获得span中的数字
					var n=parseInt(span.innerHTML);
					
					//如果btn的内容是+
					if(btn.innerHTML=="+"){
						n+=1;
					}else if(n>1){//否则数字>1，才能数字-1
						n-=1;
					}
					//将数字保存回span的内容中
					span.innerHTML=n;
					
					//2.修改小计
					var price=parseFloat(btn.parentElement.previousElementSibling.innerHTML.slice(1));
					//计算小计=单价*数量
					var subTotal=price*n;
					//将小计放到后一个li的内容中
					var sub=btn.parentElement.nextElementSibling.innerHTML="¥"+subTotal.toFixed(2);
					//3.修改总计
					
				//ul
				var cart=document.getElementById("cart");			
				//ul
				var us= cart.children[1].getElementsByTagName('ul');
						 tds=[];
						for(var i=0;i<us.length;i++){
							if(us[i].children[0].children[0].checked==true){
								
								tds.push(us[i].children[4].innerHTML);

							}
							//注释代码：合计总价;	
							var totle=0;
							for(var td of tds){
								totle+=parseFloat(td.slice(1))
							}
							var a=document.getElementById("item3");
							var dan=a.querySelector("div>span").innerHTML="¥"+totle.toFixed(2);
						
						}
//注释代码********************************
				
				}
			}	
			
			//注释：点击单个复选按钮     (改变总价等)   
				var cart=document.getElementById("cart");			
				//ul
				var us= cart.children[1].getElementsByTagName('ul');
				for(var i=0;i<us.length;i++){
					us[i].children[0].children[0].onclick=function(){
						tds=[];
						for(var i=0;i<us.length;i++){
							if(us[i].children[0].children[0].checked==true){								
								tds.push(us[i].children[4].innerHTML);
							}
							//注释代码：合计总价;	
							var totle=0;
							for(var td of tds){
								totle+=parseFloat(td.slice(1))
							}
							var a=document.getElementById("item3");
							var dan=a.querySelector("div>span").innerHTML="¥"+totle.toFixed(2);
						}
					}
				}
				
			//全选				
			var input=document.querySelector('.cart-item1>div>input');
			input.onclick=function(){
				var chbs=document.querySelectorAll('.cart-item2>ul>li:first-child input');	
				for(var chb of chbs){
					chb.checked=input.checked
					if(chb.checked=input.checked){
						var items=cart.querySelectorAll(".cart-item2>ul>li:nth-child(5)")
						//接收总价
						var totle=0;
						//计算ul 下的第三个li
						for(var item of items){
							totle+=parseFloat(item.innerHTML.slice(1))
						}
						//在修改总价	
						var item=document.getElementById("item3");
						var all=item.children[0].firstElementChild;
							all.innerHTML="¥"+totle.toFixed(2);
					}else{
						//在修改总价	
						var item=document.getElementById("item3");
						var all=item.children[0].firstElementChild;
						all.innerHTML="¥0.00";
					}
				}
			}
			
			//只要有一个没选就取消全选
			//查找每一行第一个li下的input
			var chb=document.querySelectorAll('.cart-item2>ul>li:first-child input');
			//注释：所有的单选框按钮
			for(var chbs of chb){
				chbs.onclick=function(){
					var input=document.querySelector('.cart-item1>div>input');
					var chbs=this;
					 //注释：点击单个复选按钮     (改变总价、等)
					var cart=document.getElementById("cart");			
					//ul
					var us= cart.children[1].getElementsByTagName('ul');
					tds=[];
					for(var i=0;i<us.length;i++){
						if(us[i].children[0].children[0].checked==true){	
							tds.push(us[i].children[4].innerHTML);
						}
						//注释代码：合计总价;	
						var totle=0;
						for(var td of tds){
							totle+=parseFloat(td.slice(1))
						}
						var a=document.getElementById("item3");
						var dan=a.querySelector("div>span").innerHTML="¥"+totle.toFixed(2);
						
					}	
					//如果有一个复选框未选中就取消全选
					if(chbs.checked==false){
						//如果有一个复选框未选中就取消全选
						input.checked=false;
						//当全选取消时修改总价
						var cart=document.getElementById("cart");			
						//ul
						var us= cart.children[1].getElementsByTagName('ul');
						tds=[];//取消当前选项框总价就减去当前复选框小计钱(或者是清空总价)
						for(var i=0;i<us.length;i++){
							if(us[i].children[0].children[0].checked==true){
								tds.push(us[i].children[4].innerHTML);
							}
							//注释代码：合计总价;	
							var totle=0;
							for(var td of tds){
								totle+=parseFloat(td.slice(1))
							}
							var a=document.getElementById("item3");
							var dan=a.querySelector("div>span").innerHTML="¥"+totle.toFixed(2);
						}
					}else{//否则全选框选中
						var unchecked=document.querySelector('.cart-item2>ul>li:first-child>input:not(:checked)');
						if(unchecked==null){
							//全选框选中
							input.checked=true;
							//全选是修改总价
							var cart=document.getElementById("cart");			
							//ul
							var us= cart.children[1].getElementsByTagName('ul');
						 	tds=[];
							for(var i=0;i<us.length;i++){
								if(us[i].children[0].children[0].checked==true){
									tds.push(us[i].children[4].innerHTML);
								}
								//注释代码：合计总价;	
								var totle=0;
								for(var td of tds){
									totle+=parseFloat(td.slice(1))
								}
								var a=document.getElementById("item3");
								var dan=a.querySelector("div>span").innerHTML="¥"+totle.toFixed(2);
							
							}
						}
					}
				}
			}			
		//	一下两个括号是   ---ajax括号
	}
}
	//3.打开连接，创建请求
	xhr.open('get','/product/getShopCart',true);
	
	//4.发送请求
	xhr.send(null);
}


//删除购物车		
function removeli(){
	var aa=document.getElementById('remove-li');
    var c=aa.lastElementChild;
	var id=aa.getAttribute('data-id');
	location.reload();
	function removecart(){
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
			var result=JSON.parse(xhr.responseText);
				if(result.length==1){
					alert("删除成功");
				}         
			}
		} 
		
		xhr.open('get','/product/removeItem?id='+id,true);
		xhr.send();
	}
	removecart();	
}
