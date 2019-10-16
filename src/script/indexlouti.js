class louti {
    constructor() {
        this.loutinav = $('#loutinav');
        this.loutili = $('#loutinav li').not('.last');
        this.louceng = $('.louceng');
        this.last = $('.last');
    }

    init() {
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
new louti().init();