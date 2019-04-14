//概览
$(function(){
    if(location.search!==""){
        var lid=location.search.split("=")[1];
        $.ajax({
            url:"/product/details",
            type:"get",
            data:{lid},
            dataType:"json",
           success:function(result){
				//将基本信息放在页面右上角部分
				var {product,specs,pics}=result;
                $("#navv").html(`<div class="nav-d">
                <span>${product.cname}</span>
                <b data-tt="b"></b>
                	<div class="aa">
                <ul class="nav-ul">
                    <li>
                        <a href="overview.html?lid=${product.lid}">概览</a>
                        <div class="cl"></div>
                    </li>
                    <li>
                        <a href="parameter.html?lid=${product.lid}">技术规格</a>
                        <div class="line"></div>
                    </li>
                </ul>
                </div>
                <div class="nav-div">
                    <a href="product_details.html?lid=${product.lid}">立即购买</a>
                </div>
            </div>`) ;
            
          //图片
         $("#overimg").html(product.browses);
                 //导航栏
            
            var b=document.querySelector("[data-tt=b]");
            var aa=document.getElementsByClassName("aa")[0];
            var ul=document.getElementsByClassName("nav-ul")[0];
             function get(){
		        var isT=true;
		        b.onclick=function () {
		            if(isT){
		                aa.className='nav-in';
		                ul.style.display="block";
		                isT=false;
		            }else{
		                aa.className='nav-li';
		                ul.style.display="none";
		                isT=true;
		            }
		        }
		    }
		    get();
            }
        })
    }
})