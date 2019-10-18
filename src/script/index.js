define(['jquery','jqcookie','move','lazyload'],function(){
    return {
        init:function(){
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
            console.log(btnlist)
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
        clearInterval(timer1);
    };

    banner.onmouseleave = function () {//重新开启定时器轮播

        timer1 = setInterval(function () {
            timer3.style.width = i + '%';
            i = i + 2;

            if (i > 100)
                i = 0
        }, 45)

        timer = setInterval(() => {
            currentindex++;
            if (currentindex > btnlist.length - 1) {
                currentindex = 0;
            }
            tabswich()
        }, 2000);
    }
    //进度条
    const timer3 = document.querySelector('.timer3');
    let i = 0;
    var timer1 = setInterval(function () {

        timer3.style.width = i + '%';
        i = i + 2;

        if (i > 100)
            i = 0
    }, 45)

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
                                <img class="lazy" data-original="${value.url}" width="238" height="292" alt="">
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
                $(function () { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //效果方式
                    });
                });

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
                            <a href="details.html?sid=${value.sid}" target="_blank"><img class="lazy" pic_url="http://www.mayzone360.com/shop/item-4071.html" title="${value.title}"
                            data-original="${value.url}" width="238" height="258"></a>
                        </li>
                    `
                }
                content3_right.innerHTML = strhtml;
                $(function () { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //效果方式
                    });
                });

            })
        
        
        
            //tab切换二级菜单
            $('.home_nav_left li').mouseover(function () {
                $(this).addClass('active').siblings('.home_nav_left li').removeClass('active');
                $('.home_nav_right').css({"display":"block"});
                $('#banner ol').css({"z-index":"0"});
            });
            $('.home_nav_left li').mouseout(function () {
                $(this).removeClass('active');
                $('.home_nav_right').css({"display":"none"});
                $('#banner ol').css({"z-index":"0"});
                $('#banner ol').css({"z-index":"999"});
            });
        
        
            $('.home_nav_right').mouseover(function () {
                $('.home_nav_right').css({"display":"block"});
                $('#banner ol').css({"z-index":"0"});
            });
            $('.home_nav_right').mouseout(function () {
                $('.home_nav_right').css({"display":"none"});
                $('#banner ol').css({"z-index":"999"});
            });
            this.louti();
        },
        louti:function(){
                    this.loutinav = $('#loutinav');
                    this.loutili = $('#loutinav li').not('.last');
                    this.louceng = $('.louceng');
                    this.last = $('.last');
      
            
           
                    let _this = this;
            
                    let $top = $(window).scrollTop();//获取当前的scrollTop值
                    if ($top >= 150) {
                        _this.loutinav.show();
                    } else {
                        _this.loutinav.hide();
                    }
                    //1.拖动滚动显示隐藏楼梯
                    $(window).on('scroll', function () {
                        let $top = $(this).scrollTop();
                        if ($top >= 150) {
                            _this.loutinav.show();
                        } else {
                            _this.loutinav.hide();
                        }
            
                        //4.拖动滚轮，楼梯和楼层对应
                        _this.louceng.each(function (index, element) {
                            //每一个楼层的top值，固定的值。
                            let $loucengtop = _this.louceng.eq(index).offset().top + $(element).height() / 2;
                            if ($loucengtop > $top) {
                                _this.loutili.removeClass('loutiactive');
                                _this.loutili.eq(index).addClass('loutiactive');
                                return false;
                            }
                        });
            
                    });
            
                    //2.点击左侧的楼梯，显示右侧对应的图层
                    this.loutili.on('click', function () {
                        console.log(1)
                        $(this).addClass('loutiactive').siblings('li').removeClass('loutiactive');
                        //获取每一个楼层的top值
                        let $loucengtop = _this.louceng.eq($(this).index()).offset().top;
                        //document.documentElement.scrollTop=100
                        $('html,body').animate({
                            scrollTop: $loucengtop
                        });
                    });
            
                    //回到顶部
                    this.last.on('click', function () {
                        console.log(1);
                        $('html,body').animate({
                            scrollTop: 0
                        });
                    });
            
        }

    }

  });
