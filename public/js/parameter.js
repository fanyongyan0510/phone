//参数

$(function(){
    if(location.search!==""){
        var lid=location.search.split("=")[1];
        $.ajax({
            url:"http://127.0.0.1:5100/product/details",
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
                    <li data-nav="nav">
                        <a href="overview.html?lid=${product.lid}">概&nbsp;&nbsp;&nbsp;览</a>
                        <div class="line"></div>
                    </li>
                    <li >
                        <a href="parameter.html?lid=${product.lid}">技术规格</a>
                        <div class="cl"></div>
                    </li>
                </ul>
                </div>
                <div class="nav-div">
                    <a href="product_details.html?lid=${product.lid}">立即购买</a>
                </div>
            </div>`)
                //技术规格
                $("#parameter").first().html(`<div class="section">
	            <div class="section1">
	                <div class="section1-wg">
	                    <p class="sz">外观</p>
	                    <b data-tt="f">+</b>
	                </div>
	                <div class="section1-p">
	                    <div class="section1-nr">
	                        <p class="section1-name">${product.cname}</p>
	                        <img src="${pics[0].md}" class="section1-img">
	                        <p class="section1-color">${product.color}</p>
	                    </div>
	                </div>
	
	            </div>
	        </div>	 
            <!-- 硬件参数-->
	        <div class="section1">
	            <div class="section1-wg">
	                <p class="sz">硬件参数</p>
	                <b data-tt="f">+</b>
	            </div>
	            <div class="section1-nr">
	                <p class="txt">传播名:${product.cname}</p>
	                <p class="txt">CPU 型号:${product.cpu}</p>
	                <p class="txt">CPU 频率:${product.cpu_frequency}</p>
	                <p class="txt">核心数:${product.cpu_number}</p>
	                <p class="txt">GPU 型号:${product.gpu}</p>
	                <p class="txt">操作系统:${product.os}</p>
	                <p class="txt">RAM 容量(运行内存):${product.ram}</p>
	                <p class="txt">ROM 容量(机身内存):${product.rom}</p>
	                <p class="txt">电池容量:${product.battery}</p>
	            </div>
	        </div>
	        <!--#显示屏-->
	        <div class="section1">
	            <div class="section1-wg">
	                <p class="sz">显示屏</p>
	                <b data-tt="f">+</b>
	            </div>
	            <div class="section1-nr">
	                <p class="txt">屏幕尺寸:${product.screen_size}</p>
	                <p class="txt">分辨率:${product.resolving_power}</p>
	                <p class="txt">屏幕色彩:${product.screen_color}</p>
	                <p class="txt">屏幕像素密度PPI:${product.screen_density}</p>
	                <p class="txt">触摸屏:${product.touch_screen}</p>
	            </div>
	        </div>
	        <!--#摄像头--> 
                	<div class="section1">
	            <div class="section1-wg">
	                <span class="sz">摄像头</span>
	                <b data-tt="f">+</b>
	            </div>
	            <div class="section1-nr">
	                <p class="txt">前置摄像头:${product.front_camera}</p>
	                <p class="txt">后置摄像头:${product.rear_camera}</p>
	                <p class="txt">传感器类型:${product.sensor_type}</p>
	                <p class="txt">闪光灯:${product.flash_lamp}</p>
	                <p class="txt">照片分辨率:${product.photo_resolution}</p>
	                <p class="txt">拍摄模式:${product.shooting_mode}</p>
	            </div>
	        </div>
	        <!-- 操作系统-->
	        <div class="section1">
	            <div class="section1-wg">
	                <p class="sz">操作系统</p>
	                <b data-tt="f">+</b>
	            </div>
	            <div class="section1-nr">
	                <p class="txt">操作系统:${product.oss}</p>
	            </div>
	        </div>
	        <!--#手机网络-->
	        <div class="section1">
	            <div  class="section1-wg">
	                <p class="sz">网络</p>
	                <b data-tt="f">+</b>
	            </div>
	            <div class="section1-nr">
	                <p class="txt">网络制式:${product.network_standard}</p>
	                <p class="txt">浏览器:${product.browser}</p>
	            </div>
	        </div>
	        <!--#手机数据功能-->
	        <div class="section1">
	            <div class="section1-wg">
	                <p class="sz">数据功能</p>
	                <b data-tt="f">+</b>
	            </div>
	            <div class="section1-nr">
	                <p class="txt">WLAN:${product.wlan}</p>
	                <p class="txt">蓝牙:${product.bluetooth}</p>
	                <p class="txt">数据接口:${product.data_interface}</p>
	            </div>
	        </div>
	        <!--#手机附件-->
	        <div class="section1">
	            <div class="section1-wg">
	                <p class="sz">手机附件</p>
	                <b data-tt="f" id="dd">+</b>
	            </div>
	            <div class="section1-nr" id="aa">
	                <p class="txt">主机 x1</p>
	                <p class="txt">耳机 x1</p>
	                <p class="txt">数据线 x1</p>
	                <p class="txt">充电器 x1</p>
	                <p class="txt">SIM卡通针 x1</p>
	                <p class="txt">保护套 x1</p>
	            </div>
	        </div>
                `
  
                )
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
                
                
                
                
var nav=document.querySelector("[data-nav=nav]"); 

                
 var txts=document.querySelectorAll("[data-tt=f]");
        for(var txt of txts){
            txt.onclick=function(){
                var txt=this;
                var nr=txt.parentElement.nextElementSibling;
                if(nr.style.display=="block"){
                    nr.style.display='none';
                }else{
                    nr.style.display='block';
                }
            }
        }

                
            }
        })
    }
})

