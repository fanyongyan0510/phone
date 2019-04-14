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
    

	

    //搜索 Ajax
var kuang=document.getElementById("sousuo");
var input=kuang.children[0];
var suo=document.querySelector("[data-suo=suo]");
//搜索 Ajax
var name=decodeURI(location.search.split("=")[1]);
function ss(){
	var xhr=new XMLHttpRequest();
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
	            var div=document.getElementById("sell").children[0].innerHTML=html;
	            
		}
	}
	
	xhr.open('get','/product/suo?name='+name,true);
	xhr.send(null);
}
suo.onclick=function(){ss();}