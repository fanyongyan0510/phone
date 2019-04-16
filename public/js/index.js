//首页
//首页轮播
function add(){
    var xhr=new XMLHttpRequest();
   xhr.onreadystatechange=function(){
	   if(xhr.readyState==4 && xhr.status==200){
           var result=JSON.parse(xhr.responseText);
            var html="";
	    	for(var i=0;i<result.length;i++){
	        	var p=result[i];
	        	html+=`
	        	<div class="swiper-slide slide1" data-swiper-slide-index="0">
                    <a href="${p.href}" target="_blank">
                        <img src="${p.img}">
                    </a>
                  
                </div>
                    `;
       	}
			var div=document.getElementById("swi").innerHTML=html;
			
           
            
	    }
       
	} 
    xhr.open('get','/product/carousel',true);
    xhr.send(null);
}     
add(); 
// 轮播  

//首页商品
function index(){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=JSON.parse(xhr.responseText);
           var fhtml=""
	    	for(var i=14;i<result.length;i++){
	        	var f=result[i];
           		fhtml+=` <li>
                    <a href="${f.index_href}" target="_blank">
                        <img src="${f.index_img}" alt=""/>
                    </a>
                </li>
                `
           }
           var div2=document.getElementById("index");
           div2.innerHTML=fhtml;
        }
    }
    xhr.open('get','/product/index',true);
    xhr.send(null);
}
index();
