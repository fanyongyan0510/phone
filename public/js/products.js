

//商品列表

function arr(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=JSON.parse(xhr.responseText);
            var html="";
            //轮播
          for(var i=0;i<result.length;i++){
          	var p=result[i];
          	html+=`
         					<a href="${p.href}">
					<img class="bgimage" src="${p.img}" alt="" />
				</a>`
          }
          document.getElementById("carousel").innerHTML=html;    
        }
    }   
    xhr.open('get','/product/carousel',true);
    xhr.send();
}
arr();
	var imgs = document.getElementsByClassName('bgimage');
			setInterval(function () {
        for (var img=0 ; img <imgs.length ; img++) {
            imgs[img].style.opacity = '0';
            var num = Math.floor(Math.random()*5);
            imgs[num].style.opacity = '1';
        }
    },3000);
//默认显示8个
function addd(){
    var xhr=new XMLHttpRequest();
     var pageSize=8;
	     
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=JSON.parse(xhr.responseText);            
            var html="";             
            for(var i=0;i<result.length;i++){
            	var p=result[i];
            	
            	html+=`
            	
					<li>
						<a href="${p.href}">
							<img src="${p.md}" alt="">
							<h3>${p.cname}</h3>
							<p>¥${p.price}</p>
						</a>
					</li>
					`
            }
            var div=document.getElementById("sell_well").children[0].innerHTML=html;
            
           
        }
    } 


    xhr.open('get','/product/products?pageSize='+pageSize,true);
    xhr.send();
    
}
addd()


function add(){
    var xhr=new XMLHttpRequest();
    var btn=document.getElementById("btn");
     var pageSize=8;
 	btn.onclick=function(){
           pageSize+=8; 
           if(pageSize==48){
           	btn.innerHTML="我也是有底线的人"
           	btn.style.cursor="auto"
           }
	    xhr.onreadystatechange=function(){
	        if(xhr.readyState==4 && xhr.status==200){
	            var result=JSON.parse(xhr.responseText);            
	            var html=""; 
	            
	            for(var i=0;i<result.length;i++){
	            	var p=result[i];
	            	
	            	html+=`
						<li>
							<a href="${p.href}">
								<img src="${p.md}" alt="44545454">
								<h3>${p.cname}</h3>
								<p>¥${p.price}</p>
							</a>
						</li>
						`
	            }
	//          html+=`<button>加载更多</button>`
	            var div=document.getElementById("sell_well").children[0].innerHTML=html;
	            
	           
	        }
	    } 
	
	
	    xhr.open('get','/product/products?pageSize='+pageSize,true);
	    xhr.send();
	    }
	}
add();
