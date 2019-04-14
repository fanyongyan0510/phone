/**
 * Created by tarena on 2019/2/23.
 */
//登录成功显示退出登录
function out(){
	//获取数值  登录的名称
	var uname=sessionStorage.getItem("uname");
	//获取元素
	var a=document.getElementById("login_a").lastElementChild;
	if(a.innerHTML=="登录"){
		a.onclick=function(){
			window.location.href="user_login.html";
		}
	}
	if(uname){
		a.innerHTML="退出登录";
		if(a.innerHTML=="退出登录"){
			// 退出登录
			a.onclick=function(){
				function un(){
					var xhr=new XMLHttpRequest();
					xhr.onreadystatechange=function(){
						if(xhr.readyState==4 && xhr.status==200){
							var result=JSON.parse(xhr.responseText); 
							sessionStorage.removeItem("uname");
							window.location.href="index.html";
						}
					}
					
					xhr.open('get','/user/Logout',true);
					xhr.send(null);
				}
				un()
			}
		}
	}
}
out();
	


//页头各个手机
function index(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=JSON.parse(xhr.responseText);
            //HUAWEI
           var ahtml="";
           for(var i=0;i<result.length-15;i++){
           	var a=result[i];
           	ahtml+=`<li>
                        <a href="${a.index_href}" target="_blank">
                        	<img  src="${a.index_img}" alt=""/>
                            <span>${a.index_title}</span>
                        </a>
                    </li> `
           	}
           	document.getElementById("in-ul1").innerHTML=ahtml;
           
           	//VIVO
           	var bhtml=""
           	for(var i=3;i<result.length-11;i++){
           	var b=result[i];
           	bhtml+=`<li>
           			<a href="${b.index_href}" target="_blank">
	                    <img  src="${b.index_img}" alt=""/>
	                    <span>${b.index_title}</span>
	                </a>
	             </li>`
           	}
            document.getElementById("in-ul2").innerHTML=bhtml;

           //OPPO
           	var chtml=""
           	for(var i=7;i<result.length-9;i++){
           	var c=result[i];
           	chtml+=`<li>
           			<a href="${c.index_href}" target="_blank">
	                    <img  src="${c.index_img}" alt=""/>
	                    <span>${c.index_title}</span>
	                </a>
	             </li>`
           	}
            document.getElementById("in-ul3").innerHTML=chtml;


			//mi
           	var dhtml=""
           	for(var i=9;i<result.length-6;i++){
           	var d=result[i];
           	dhtml+=`<li>
           			<a href="${d.index_href}" target="_blank">
	                    <img  src="${d.index_img}" alt=""/>
	                    <span>${d.index_title}</span>
	                </a>
	             </li>`
           	}
            document.getElementById("in-ul4").innerHTML=dhtml;

           	//MZ
           	var ehtml=""
           	for(var i=12;i<result.length-4;i++){
           	var e=result[i];
           	ehtml+=`<li>
           			<a href="${e.index_href}" target="_blank">
	                    <img  src="${e.index_img}" alt=""/>
	                    <span>${e.index_title}</span>
	                </a>
	             </li>`
           	}
            document.getElementById("in-ul5").innerHTML=ehtml;
        }
    }
    xhr.open('get','/product/index',true);
    xhr.send(null);
}
index();


    
    var navbar=document.querySelector("[data-target=navbar]");
    var ul=document.getElementsByClassName('top_ul')[0];
    var div=document.getElementsByClassName("fade")[0];
    var span=navbar.getElementsByTagName("span")
    navbar.onclick=function(){
        if(ul.style.display="block" && div.className=="in fade bb"){
            div.className=' fade bb';
            ul.style.display="none";
        }else{
            div.className='in fade bb';
            ul.style.display="block";
            span.className="navbar.span"
        }
    }
    var limg=document.getElementById('limg');
    var login_a=document.getElementById('login_a');
    function get(){
        var isT=true;
        limg.onclick=function () {
            if(isT){
                login_a.style.display='block';
                isT=false;
            }else{
                login_a.style.display='none';
                isT=true;
            }
        }
    }
    get();

var dropdowns=document.querySelectorAll("[data-toggle=dropdown]");
var img=document.querySelectorAll("[data-tt=ll]");
for(var dropdown of dropdowns){
    dropdown.onmousemove=function(){
        var dropdown=this;
        dropdown.children[1].className="pp";

    }
    dropdown.onmouseout=function(){
        var dropdown=this;
        dropdown.children[1].className="drop pp";
    }
}

//搜索
var sousuo=document.querySelector("[data-sou=sousuo]");
var kuang=document.getElementById("sousuo");
var input=kuang.children[0];
var box=document.getElementById("sousuoBox");
var suo=document.querySelector("[data-suo=suo]");
var si=document.getElementsByClassName("sou-input")[0];
var sinp=document.getElementsByClassName("suo-input")[0];
sousuo.onclick=function(){
	if(box.className=="sousuoBox" && kuang.className=="sousuo"){
		kuang.className="kuang suosou";
		box.className="sousuoBox souBox";
		si.style.display="block";
		sinp.style.display="block";
	}else{
		box.className="sousuoBox"
		kuang.className="sousuo";
		si.style.display="none";
		sinp.style.display="none";
		
		
	}
	
}
//搜索 Ajax
suo.onclick=function(){
	function ss(){
		var xhr=new XMLHttpRequest();
		var cname=si.value;
		xhr.onreadystatechange=function(){		
			if(xhr.readyState==4 && xhr.status==200){
				var result=JSON.parse(xhr.responseText); 
				open("sousuo.html?cname="+cname,"_blank")
			}
		}
		xhr.open('get','/product/sousuo?cname='+cname,true);
		xhr.send(null);
	}
	ss()
}

