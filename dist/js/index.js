"use strict";define(["jquery","jqcookie","move","lazyload"],function(){return{init:function(){var n="http://10.31.155.57/SectionTwo/mayzone/php/";$.cookie("xingming")&&($(".admin").css({display:"block"}),$(".loginuser").css({display:"none"}),$(".admin span").html($.cookie("xingming"))),$(".exit").on("click",function(){$(".admin").css({display:"none"}),$(".loginuser").css({display:"block"}),localStorage.removeItem("xingming"),$.cookie("xingming",$.cookie("xingming"),{expires:-1})});var e=document.querySelector("#banner"),o=document.querySelectorAll("#banner ul li"),i=document.querySelectorAll("#banner ol li");console.log(i);for(var t=0,l=null,a=function(n){i[n].onclick=function(){t=n,h()}},s=0;s<i.length;s++)a(s);e.onmouseenter=function(){clearInterval(l),clearInterval(u)},e.onmouseleave=function(){u=setInterval(function(){c.style.width=r+"%",100<(r+=2)&&(r=0)},45),l=setInterval(function(){++t>i.length-1&&(t=0),h()},2e3)};var c=document.querySelector(".timer3"),r=0,u=setInterval(function(){c.style.width=r+"%",100<(r+=2)&&(r=0)},45);function h(){for(var n=0;n<i.length;n++)i[n].className="",bufferMove(o[n],{opacity:0});i[t].className="active",bufferMove(o[t],{opacity:100})}l=setInterval(function(){++t>i.length-1&&(t=0),h()},2e3);var d=document.querySelector(".home_content_ul");$.ajax({url:n+"index.php",dataType:"json"}).done(function(n){var e="",o=!0,i=!1,t=void 0;try{for(var l,a=n[Symbol.iterator]();!(o=(l=a.next()).done);o=!0){e+='\n                    <li>\n                            <a href="#">\n                                <img class="lazy" data-original="'+l.value.url+'" width="238" height="292" alt="">\n                            </a>\n                            <div class="grouppro-Cost">\n                                <span><i>已售：</i><em>546</em></span>\n                                <div class="grouppro-Cos-icons">\n                                    <a href="#" class="iconfont">\n                                        <img src="http://www.mayzone360.com/shop/templates/default/images/tuangou/buy.png"\n                                            alt="">\n                                    </a>\n                                </div>\n                            </div>\n                        </li>\n                    '}}catch(n){i=!0,t=n}finally{try{!o&&a.return&&a.return()}finally{if(i)throw t}}d.innerHTML=e,$(function(){$("img.lazy").lazyload({effect:"fadeIn"})})});var v=document.querySelector(".content3_right");$.ajax({url:n+"index1.php",dataType:"json"}).done(function(n){var e="",o=!0,i=!1,t=void 0;try{for(var l,a=n[Symbol.iterator]();!(o=(l=a.next()).done);o=!0){var s=l.value;e+='\n                        <li>\n                            <a href="details.html?sid='+s.sid+'" target="_blank"><img class="lazy" pic_url="http://www.mayzone360.com/shop/item-4071.html" title="'+s.title+'"\n                            data-original="'+s.url+'" width="238" height="258"></a>\n                        </li>\n                    '}}catch(n){i=!0,t=n}finally{try{!o&&a.return&&a.return()}finally{if(i)throw t}}v.innerHTML=e,$(function(){$("img.lazy").lazyload({effect:"fadeIn"})})}),$(".home_nav_left li").mouseover(function(){$(this).addClass("active").siblings(".home_nav_left li").removeClass("active"),$(".home_nav_right").css({display:"block"}),$("#banner ol").css({"z-index":"0"})}),$(".home_nav_left li").mouseout(function(){$(this).removeClass("active"),$(".home_nav_right").css({display:"none"}),$("#banner ol").css({"z-index":"0"}),$("#banner ol").css({"z-index":"999"})}),$(".home_nav_right").mouseover(function(){$(".home_nav_right").css({display:"block"}),$("#banner ol").css({"z-index":"0"})}),$(".home_nav_right").mouseout(function(){$(".home_nav_right").css({display:"none"}),$("#banner ol").css({"z-index":"999"})}),this.louti()},louti:function(){this.loutinav=$("#loutinav"),this.loutili=$("#loutinav li").not(".last"),this.louceng=$(".louceng"),this.last=$(".last");var t=this;150<=$(window).scrollTop()?t.loutinav.show():t.loutinav.hide(),$(window).on("scroll",function(){var i=$(this).scrollTop();150<=i?t.loutinav.show():t.loutinav.hide(),t.louceng.each(function(n,e){var o=t.louceng.eq(n).offset().top+$(e).height()/2;if(i<o)return t.loutili.removeClass("loutiactive"),t.loutili.eq(n).addClass("loutiactive"),!1})}),this.loutili.on("click",function(){console.log(1),$(this).addClass("loutiactive").siblings("li").removeClass("loutiactive");var n=t.louceng.eq($(this).index()).offset().top;$("html,body").animate({scrollTop:n})}),this.last.on("click",function(){console.log(1),$("html,body").animate({scrollTop:0})})}}});