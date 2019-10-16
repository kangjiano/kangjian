;
(function () {
    let sid = location.search.substring(1).split('=')[1];
    const smallpic = document.querySelector('#smallpic');
    const spic = document.querySelector('#spic');

    const bpic = document.querySelector('#bpic');
    const h1 = document.querySelector('.name h1');
    const strong = document.querySelector('.name strong');

    const price = document.querySelector('.price_red');
    const listul = document.querySelector('#list ul');
    const sf = document.querySelector('#sf');
    const bf = document.querySelector('#bf');
    const wrap = document.querySelector('.wrap');
    const increase = document.querySelector('.increase');
    const decrease = document.querySelector('.decrease');
    const cartbtn = document.querySelector('.addcart');
    const goodsnum = document.querySelector('#quantity');

    const phpurl = 'http://10.31.155.57/SectionTwo/mayzone/php/';
    let picli = null;
    //1.将sid传给后端，后端返回对应的数据。
    $.ajax({
        url: phpurl + 'details.php',
        data: {
            id: sid
        },
        dataType: 'json'
    }).done(function (objdata) {

        h1.innerHTML = objdata.listtitle;
        strong.innerHTML = objdata.description;
        price.innerHTML = objdata.price;
        //渲染小图下面的产品列表
        let piclist = objdata.urls.split(','); //数组
        spic.querySelector('#spic img').src = piclist[0];
        bpic.src = piclist[0];
        let pichtml = '';
        for (let value of piclist) {
            pichtml += `
                <li><img src="${value}"/></li>
            `;
        }
        listul.innerHTML = pichtml;
        //获取li的length

    });

    //放大镜效果

    spic.onmouseover = function () {
        sf.style.visibility = 'visible';
        bf.style.visibility = 'visible';
        //计算小放的尺寸
        sf.style.width = spic.offsetWidth * bf.offsetWidth / bpic.offsetWidth + 'px';
        sf.style.height = spic.offsetHeight * bf.offsetHeight / bpic.offsetHeight + 'px';
        //求比例
        let bili = bpic.offsetWidth / spic.offsetWidth;
        this.onmousemove = function (ev) {
            var ev = ev || window.event;
            let l = ev.clientX - wrap.offsetLeft - sf.offsetWidth / 2;
            let t = ev.pageY - wrap.offsetTop - sf.offsetHeight / 2;

            if (l <= 0) {
                l = 0;
            } else if (l >= spic.offsetWidth - sf.offsetWidth) {
                l = spic.offsetWidth - sf.offsetWidth - 2;
            }

            if (t <= 0) {
                t = 0;
            } else if (t >= spic.offsetHeight - sf.offsetHeight) {
                t = spic.offsetHeight - sf.offsetHeight - 2;
            }
            sf.style.left = l + 'px';
            sf.style.top = t + 'px';

            bpic.style.left = -bili * l + 'px';
            bpic.style.top = -bili * t + 'px';
        }
    };

    spic.onmouseout = function () {
        sf.style.visibility = 'hidden';
        bf.style.visibility = 'hidden';
    };

    //点击缩略图实现图片的切换


    listul.onclick = function (ev) {
        var ev = ev || window.event;
        let element = ev.target || ev.srcElement;
        if (element.parentNode.tagName === 'LI') {
            spic.querySelector('#spic img').src = element.src; //小图下面的图片
            bpic.src = element.src; //大图
        }

    };
    //数量修改
    let num=0;
    increase.onclick=function(){
        num=Number(goodsnum.value);
        num+=1;
        goodsnum.value=num;
    }
    decrease.onclick=function(){
        num=Number(goodsnum.value);
        num-=1;
        goodsnum.value=num;
    }




    //添加购物车
    
    let sidarr = []; //存放sid 
    let numarr = []; //存放数量


    //提前取值
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        sidarr = getcookie('cookiesid').split(',');
        numarr = getcookie('cookienum').split(',');
    }

    //点击添加按钮
    cartbtn.onclick = function () {
        alert('商品添加成功');
        //当取出的cookie里面存放sid的数组
        if (sidarr.indexOf(sid) !== -1) { //第二次只需要数量累加
            
            let index = sidarr.indexOf(sid)
            numarr[index] = parseInt(numarr[index]) + parseInt(goodsnum.value);
            addcookie('cookienum', numarr.toString(), 10);
        } else { //第一次加入购物车，创建商品列表
            sidarr.push(sid);
            addcookie('cookiesid', sidarr.toString(), 10);
            numarr.push(goodsnum.value);
            addcookie('cookienum', numarr.toString(), 10);
        }
    }
    function addcookie(key, value, day) {
        var d = new Date();
        d.setDate(d.getDate() + day);
        document.cookie = key + '=' + value + ';expires=' + d;
    }
    function getcookie(key) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var newarr = arr[i].split('=');
            if (newarr[0] === key) {
                return newarr[1];
            }
        }
    }



})();