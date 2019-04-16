//首页
//首页轮播
function add(){
    var xhr=new XMLHttpRequest();
   xhr.onreadystatechange=function(){
	   if(xhr.readyState==4 && xhr.status==200){
           var result=JSON.parse(xhr.responseText);
        //    第一个
            var html="";
	    	for(var i=0;i<result.length-4;i++){
	        	var p=result[i];
	        	html+=`
                    <a href="${p.href}" target="_blank">
                        <img src="${p.img}">
                    </a>
                    `;
       	}
            var div=document.getElementById("swi");
            div.children[0].innerHTML=html;
			var html="";
	    	for(var i=1;i<result.length-3;i++){
	        	var p=result[i];
	        	html+=`
                    <a href="${p.href}" target="_blank">
                        <img src="${p.img}">
                    </a>
                    `;
       	}
            var div=document.getElementById("swi");
            div.children[1].innerHTML=html;
            var html="";
	    	for(var i=2;i<result.length-2;i++){
	        	var p=result[i];
	        	html+=`
                    <a href="${p.href}" target="_blank">
                        <img src="${p.img}">
                    </a>
                    `;
       	}
            var div=document.getElementById("swi");
            div.children[2].innerHTML=html;
            var html="";
	    	for(var i=3;i<result.length-1;i++){
	        	var p=result[i];
	        	html+=`
                    <a href="${p.href}" target="_blank">
                        <img src="${p.img}">
                    </a>
                    `;
       	}
            var div=document.getElementById("swi");
            div.children[3].innerHTML=html;
            var html="";
	    	for(var i=4;i<result.length-0;i++){
	        	var p=result[i];
	        	html+=`
                    <a href="${p.href}" target="_blank">
                        <img src="${p.img}">
                    </a>
                    `;
       	}
            var div=document.getElementById("swi");
            div.children[4].innerHTML=html;
            
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
