(function () {
    const phpurl = 'http://10.31.155.57/SectionTwo/mayzone/php/';
    // 登录姓名显示
    if ($.cookie('xingming')) {
        $('.admin').css({ "display": "block" });
        $('.loginuser').css({ "display": "none" });
        $('.admin span').html($.cookie('xingming'));
    }
    $('.exit').on("click", function () {
        $('.admin').css({ "display": "none" });
        $('.loginuser').css({ "display": "block" });
        localStorage.removeItem('xingming');
        $.cookie('xingming', $.cookie('xingming'), { expires: -1 });
    })





    // 轮播图
    const banner = document.querySelector('#banner');
    const piclist = document.querySelectorAll('#banner ul li');
    const btnlist = document.querySelectorAll('#banner ol li');

    let currentindex = 0;
    let timer = null;

    //点击小圆圈，实现图片的切换
    for (let i = 0; i < btnlist.length; i++) {
        btnlist[i].onclick = function () {
            currentindex = i; //循环的索引给当前的按钮的索引。
            tabswich();
        }
    }

    //鼠标移入停止
    banner.onmouseenter = function () {
        clearInterval(timer);
        // clearInterval(timer1);
    };

    banner.onmouseleave = function () {//重新开启定时器轮播

        // timer1 = setInterval(function () {
        //     timer3.style.width = i + '%';
        //     i = i + 2;

        //     if (i > 100)
        //         i = 0
        // }, 45)

        timer = setInterval(() => {
            currentindex++;
            if (currentindex > btnlist.length - 1) {
                currentindex = 0;
            }
            tabswich()
        }, 2000);
    }
    //进度条
    // const timer3 = document.querySelector('.timer3');
    // let i = 0;
    // var timer1 = setInterval(function () {

    //     timer3.style.width = i + '%';
    //     i = i + 2;

    //     if (i > 100)
    //         i = 0
    // }, 45)

    //5.图片自动轮播

    timer = setInterval(() => {
        currentindex++;
        if (currentindex > btnlist.length - 1) {
            currentindex = 0;
        }


        tabswich();
    }, 2000);

    //轮播函数
    function tabswich() {
        for (let j = 0; j < btnlist.length; j++) {
            btnlist[j].className = '';
            bufferMove(piclist[j], {
                opacity: 0
            });
        }
        btnlist[currentindex].className = 'active';
        bufferMove(piclist[currentindex], {
            opacity: 100
        });
    }

    // 渲染
    const home_content_ul = document.querySelector('.home_content_ul');

    $.ajax({
        url: phpurl + 'index.php',
        dataType: 'json'

    }).done(function (data) {
        let strhtml = ''
        for (let value of data) {
            strhtml += `
            <li>
                    <a href="#">
                        <img src="${value.url}" alt="">
                        <!--<img class="lazy" data-original="${value.url}" width="238" height="292" alt="">-->
                    </a>
                    <div class="grouppro-Cost">
                        <span><i>已售：</i><em>546</em></span>
                        <div class="grouppro-Cos-icons">
                            <a href="#" class="iconfont">
                                <img src="http://www.mayzone360.com/shop/templates/default/images/tuangou/buy.png"
                                    alt="">
                            </a>
                        </div>
                    </div>
                </li>
            `
        }
        home_content_ul.innerHTML = strhtml;
    })


    // 渲染2
    const content3_right = document.querySelector('.content3_right');

    $.ajax({
        url: phpurl + 'index1.php',
        dataType: 'json'

    }).done(function (data) {
        let strhtml = ''
        for (let value of data) {
            strhtml += `
                <li>
                    <a href="details.html?sid=${value.sid}" target="_blank"><img pic_url="http://www.mayzone360.com/shop/item-4071.html" title="${value.title}"
                            src="${value.url}"></a>
                </li>
            `
        }
        content3_right.innerHTML = strhtml;
    })



    //tab切换二级菜单
    $('.home_nav_left li').mouseover(function () {
        $(this).addClass('active').siblings('.home_nav_left li').removeClass('active');
        $('.home_nav_right').css({"display":"block"});
    });
    $('.home_nav_left li').mouseout(function () {
        $(this).removeClass('active');
        $('.home_nav_right').css({"display":"none"});
    });


    $('.home_nav_right').mouseover(function () {
        $('.home_nav_right').css({"display":"block"});
    });
    $('.home_nav_right').mouseout(function () {
        $('.home_nav_right').css({"display":"none"});
    });
})();