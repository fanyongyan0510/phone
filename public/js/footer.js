/**
 * Created by tarena on 2019/2/20.
 */
window.onload=function(){
    var data1=document.querySelector('[data-toggle=a]');
    var data2=document.querySelector('[data-toggle=b]');
    var data3=document.querySelector('[data-toggle=c]');
    var data4=document.querySelector('[data-toggle=d]');
    data1.onclick=function(){
        window.location.href ='product_details.html?lid=17';
    }
    data2.onclick=function(){
        window.location.href ='product_details.html';
    }
    data3.onclick=function(){
        window.location.href ='product_details.html';
    }
    data4.onclick=function(){
        window.location.href ='product_details.html';
    }
}