(function () {
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
    const banner = document.querySelector('#banner'); //获取最大的盒子banner
    const piclist = document.querySelectorAll('#banner ul li'); //获取5张图片
    const btnlist = document.querySelectorAll('#banner ol li'); //获取5个按钮

    let currentindex = 0; //当前的索引 全局
    let timer = null; //定时器的返回值

    //2.点击小圆圈，实现图片的切换
    for (let i = 0; i < btnlist.length; i++) {
        btnlist[i].onclick = function () {
            currentindex = i; //循环的索引给当前的按钮的索引。
            tabswich();
        }
    }

    //3.显示隐藏左右箭头
    banner.onmouseenter = function () {
        clearInterval(timer);
    };

    banner.onmouseleave = function () {
        
        //重新开启定时器轮播
        timer = setInterval(() => {
            currentindex++;
            if (currentindex > btnlist.length - 1) {
                currentindex = 0;
            }
            tabswich()
        }, 2000);
    }

    

    //5.图片自动轮播
    timer = setInterval(() => {
        currentindex++;
        if (currentindex > btnlist.length - 1) {
            currentindex = 0;
        }
        tabswich()
    }, 2000);


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
})();