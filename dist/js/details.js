"use strict";define(["jquery","lazyload"],function(){return{init:function(){var t=location.search.substring(1).split("=")[1],l=document.querySelector("#spic"),u=document.querySelector("#bpic"),f=document.querySelector(".name h1"),a=document.querySelector(".name strong"),d=document.querySelector(".price_red"),y=document.querySelector("#list ul"),n=document.querySelector("#sf"),e=document.querySelector("#bf"),r=document.querySelector(".wrap"),i=document.querySelector(".increase"),o=document.querySelector(".decrease"),c=document.querySelector(".addcart"),s=document.querySelector("#quantity");$.ajax({url:"http://10.31.155.57/SectionTwo/mayzone/php/details.php",data:{id:t},dataType:"json"}).done(function(e){f.innerHTML=e.listtitle,a.innerHTML=e.description,d.innerHTML=e.price;var t=e.urls.split(",");l.querySelector("#spic img").src=t[0],u.src=t[0];var i="",o=!0,n=!1,r=void 0;try{for(var c,s=t[Symbol.iterator]();!(o=(c=s.next()).done);o=!0){i+='\n                <li><img class="lazy" data-original="'+c.value+'" width="60" height="60"/></li>\n            '}}catch(e){n=!0,r=e}finally{try{!o&&s.return&&s.return()}finally{if(n)throw r}}y.innerHTML=i,$(function(){$("img.lazy").lazyload({effect:"fadeIn"})})}),l.onmouseover=function(){n.style.visibility="visible",e.style.visibility="visible",n.style.width=l.offsetWidth*e.offsetWidth/u.offsetWidth+"px",n.style.height=l.offsetHeight*e.offsetHeight/u.offsetHeight+"px";var o=u.offsetWidth/l.offsetWidth;this.onmousemove=function(e){var t=(e=e||window.event).clientX-r.offsetLeft-n.offsetWidth/2,i=e.pageY-r.offsetTop-n.offsetHeight/2;t<=0?t=0:t>=l.offsetWidth-n.offsetWidth&&(t=l.offsetWidth-n.offsetWidth-2),i<=0?i=0:i>=l.offsetHeight-n.offsetHeight&&(i=l.offsetHeight-n.offsetHeight-2),n.style.left=t+"px",n.style.top=i+"px",u.style.left=-o*t+"px",u.style.top=-o*i+"px"}},l.onmouseout=function(){n.style.visibility="hidden",e.style.visibility="hidden"},y.onclick=function(e){var t=(e=e||window.event).target||e.srcElement;"LI"===t.parentNode.tagName&&(l.querySelector("#spic img").src=t.src,u.src=t.src)};var h=0;i.onclick=function(){h=Number(s.value),h+=1,s.value=h},o.onclick=function(){h=Number(s.value),h-=1,s.value=h};var p=[],m=[];function v(e,t,i){var o=new Date;o.setDate(o.getDate()+i),document.cookie=e+"="+t+";expires="+o}function g(e){for(var t=document.cookie.split("; "),i=0;i<t.length;i++){var o=t[i].split("=");if(o[0]===e)return o[1]}}g("cookiesid")&&g("cookienum")&&(p=g("cookiesid").split(","),m=g("cookienum").split(",")),c.onclick=function(){if(alert("商品添加成功"),-1!==p.indexOf(t)){var e=p.indexOf(t);m[e]=parseInt(m[e])+parseInt(s.value),v("cookienum",m.toString(),10)}else p.push(t),v("cookiesid",p.toString(),10),m.push(s.value),v("cookienum",m.toString(),10)}}}});