var lid=location.search.split("=")[1];

$(function(){
    if(location.search!==""){ 
        $.ajax({
            url:"/product/details",
            type:"get",
            data:{lid},
            dataType:"json",
           success:function(result){
				//将基本信息放在页面右上角部分
				var {product,specs,pics}=result;
				$("#pro>div:first").html(`<h2>${product.title}</h2>
                    <h4>
                        <p>${product.subtitle}</p>
                    </h4>
                    <h2>¥${product.price.toFixed(2)}</h2>`)
				//服务承诺
				$("#pro>div>div:eq(1)").html(`  <p>
                           	 服务
                        </p> <div href="" class="right_service_a">
                            <div>
                            	<a class='${product.promise_one.lid==lid? 'active':''}'><span>${product.promise_one}</span></a>
                                
                            </div>
                            <div>
                            	<a><span>${product.promise_two}</span></a>
                            </div>
                        </div>`)
				//购买数量
				$("#pro>div>div:eq(2)").html(`<a class="right_count_a">
                        	<button type="button" data-btn='but' id="but">
                        		<i>-</i>
                        		<span>1</span>
                        		<i>+</i>
                        	</button>
                        </a>`)
				//加入购物车，购买数量
				$("#pro>div:eq(2)").html(`	<div>
	                	<div class="alert">
	                		<div class="cancel">X</div>
	                		<p>未登录,登陆后方能加入购物车</p>
	                		<div class="cart-login">
	                			<p>取消</p>
	                			<a href="user_login.html">去登陆</a>
	                		</div>
	                	</div>
                	</div>
					<a href="javascript:;" data-cart="cart" id="cart" >加入购物车</a>
                    <a href="javascript:;">立即购买</a>`)
				
				
					var html=""
					
					for(var color of specs){
						html+=`
                          <div><a class='${color.lid==lid? 'active':''}' href="product_details.html?lid=${color.lid}">
                            <span>${color.color}-${color.spec}</span>
                        </a></div>`
					}
					$("#pro>div:eq(1)").find(".right_color_a").html(html)
				var html=""
				for(var p of pics){
					html+=`<li class="ul_li" >
                                <img src="${p.sm}" data-md="${p.md}" data-lg="${p.lg}" alt=""/>
                        </li>`
				}
				var $ul=$("#smImg>ul").html(html);
				//第一张图片的中图片应该放在上方的img中
				var $mImg=$("#mdImg").attr({src:pics[0].md});
				//第一张图片的大图片应该放在隐藏的大div中
				var $divLg=$("#div-lg").css({backgroundImage:`url(${pics[0].lg})`});			
				// 3.鼠标移入小图片img，切换中图片和大图片
                // 利用冒泡：事件绑定在$ul上，只允许img元素触发事件
				$ul.on("click","li>img",function(){
					var $img=$(this);//获得当前img
                    // 获取当前img上的data-md属性
                    var src=$img.attr("data-md");
                    // 修改中图片的src
                    $mImg.attr({src});
                    // 获取当前img上的data-lg属性
                    var backgroundImage=`url(${$img.attr("data-lg")})`;
                    // 修改大图片的backgroundImage
                    $divLg.css({backgroundImage })
				})
				// 4.鼠标进入supermask,显示遮罩层和大图片
                // 鼠标移出supermask，隐藏遮罩层和大图片
                var $mask=$("#mask");
                var $smask=$("#super-mask");
                $smask.mouseenter(function(){
                    $mask.removeClass("d-none");
                    $divLg.removeClass("d-none");
                }).mouseleave(function(){
                    $mask.addClass("d-none");
                    $divLg.addClass("d-none");
                })
                 // 5.mask跟随鼠标移动，并同步移动大div的背景图片位置
                var max=238;//放大镜的大小
                $smask.mousemove(function(e){
                    var left=e.offsetX-119;//鼠标在放大镜的中心
                    var top=e.offsetY-119;//鼠标在放大镜的中心
                    if(left<0){
                        left=0;
                    }else if(left>max){
                        left=max;
                    }
                    if(top<0){
                        top=0;
                    }else if(top>max){
                        top=max;
                    }
                    $mask.css({left,top});
                    
                    var backgroundPosition=`${-13/11*left}px ${-13/11*top}px`;//点击元素div的宽高各一半
                    $divLg.css({backgroundPosition});
                })
                
                //页面中最下方图片
                $("#section").next().html(product.details)
                
                
                
                
                
                //
                
                $("#navv").html(`
                <div class="nav-d">
                	<span>${product.cname}</span>
                	<b data-tt="b"></b>
                	<div class="aa">
                		<ul class="nav-ul">
	                    <li>
	                        <a href="overview.html?lid=${product.lid}">概览</a>
	                        <div class="line"></div>
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
            	</div>`)
               
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
               
        var but=document.querySelector("but");
    	var but=document.getElementById("but");
    	var is=but.getElementsByTagName("i");
    	for(var i of is){
    		i.onclick=function(){
    		// this.innerHTML='❀';
				var i=this;
				// 1.修改数量
				//查找btn旁边的span
				var span=i.parentNode.children[1];
				//              td         span
				// 获得span中的数字
				var n=parseInt(span.innerHTML);
				// 如果btn的内容是+
				if(i.innerHTML=='+'){
					//就将数字+1
					n+=1;
				}else if(n>1){//否则，如果数字>1
						//才能数字-1
						n-=1;
				}
				//将数字保存回span的内容中
				span.innerHTML=n;
    	}
    	} 
 		
   
		acart()
    }
})
}
})
	//加入购物车
	function acart(){
		$("#cart").click(function(){
				//加入购物车
				var pro=document.getElementById("pro").firstElementChild;
				var pname=pro.firstElementChild;
				var price=pro.lastElementChild;
				var pid=lid;	
				var price=price.innerHTML.slice(1);
				var pname=pname.textContent;
				var count=document.getElementById("but").children[1];
				var count=count.innerHTML;
				//1.创建异步对象
				var xhr=new XMLHttpRequest();
				//获取pro下的弹出框
				var div=document.getElementById("pro").children[2].firstElementChild;
				var alert=div.children[0];
				//获取弹出框里的元素
				//X
				var cancel=alert.firstElementChild;
				//取消
				var can=alert.children[2].firstElementChild;
				//2.绑定监听
				xhr.onreadystatechange=function(){
			        if(xhr.readyState==4 && xhr.status==200){
			          var result=JSON.parse(xhr.responseText); 
						if(result==1){
							setTimeout(function () {
								window.location.href ='cart.html';
							},500);
						}else{
							div.className="opacity";
							alert.style.display="block";
							can.onclick=cancel.onclick=function(){
								div.className="";
								alert.style.display="none";
							}
						}
					}
									
					
				}
				
				//3.打开连接，创建请求
				xhr.open('get','/product/addcart?pid='+pid+"&price="+price+"&pname="+pname+"&count="+count,true);
				xhr.send(null)
			  
		
	})
 }	